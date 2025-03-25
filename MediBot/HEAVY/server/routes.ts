import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertHealthProfileSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  const MemoryStoreInstance = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "medibot-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: 86400000 }, // 1 day
      store: new MemoryStoreInstance({
        checkPeriod: 86400000, // 1 day
      }),
    })
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || user.password !== password) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Authentication middleware
  const isAuthenticated = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(userData);
      
      // Log the user in after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        return res.status(201).json({ 
          id: user.id, 
          username: user.username, 
          email: user.email,
          name: user.name
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", passport.authenticate("local"), (req: Request, res: Response) => {
    const user = req.user as any;
    res.json({ 
      id: user.id, 
      username: user.username, 
      email: user.email,
      name: user.name
    });
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/session", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email,
        name: user.name
      });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // Google Auth routes would go here (mock for now since this is a simplified example)
  app.post("/api/auth/google", async (req: Request, res: Response) => {
    try {
      const { googleId, email, name } = req.body;
      
      if (!googleId || !email || !name) {
        return res.status(400).json({ message: "Missing required Google auth fields" });
      }

      // Check if user exists with this Google ID
      let user = await storage.getUserByGoogleId(googleId);
      
      if (!user) {
        // Check if user exists with this email
        user = await storage.getUserByEmail(email);
        
        if (user) {
          // User exists but hasn't connected Google - update their account
          // This would be handled differently in a real implementation
          return res.status(400).json({ message: "Email already registered with password" });
        }
        
        // Create new user
        user = await storage.createUser({
          username: email, // Using email as username for Google auth
          email,
          name,
          googleId,
          password: null, // No password for Google auth
        });
      }
      
      // Log the user in
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in with Google" });
        }
        return res.json({ 
          id: user.id, 
          username: user.username, 
          email: user.email,
          name: user.name
        });
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Health profile routes
  app.post("/api/health-profile", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const profileData = insertHealthProfileSchema.parse({
        ...req.body,
        userId: user.id,
      });
      
      // Check if user already has a profile
      const existingProfile = await storage.getHealthProfile(user.id);
      if (existingProfile) {
        const updatedProfile = await storage.updateHealthProfile(user.id, profileData);
        return res.json(updatedProfile);
      }
      
      const profile = await storage.createHealthProfile(profileData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/health-profile", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const profile = await storage.getHealthProfile(user.id);
      
      if (!profile) {
        return res.status(404).json({ message: "Health profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Mock chatbot API endpoint
  app.post("/api/chatbot", isAuthenticated, (req: Request, res: Response) => {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    
    // Simple response logic for demo
    let response;
    
    if (message.toLowerCase().includes("headache")) {
      response = "I'm sorry to hear about your headaches. They could be caused by several factors:\n\n1. Eye strain from screen glare or brightness\n2. Poor posture causing neck tension\n3. Dehydration during long work sessions\n\nWould you like recommendations for each of these potential causes?";
    } else if (message.toLowerCase().includes("diet") || message.toLowerCase().includes("nutrition")) {
      response = "For a balanced diet, focus on:\n\n- Fruits and vegetables\n- Whole grains\n- Lean proteins\n- Healthy fats\n- Limited processed foods\n\nWould you like more specific nutrition advice?";
    } else if (message.toLowerCase().includes("exercise") || message.toLowerCase().includes("workout")) {
      response = "Regular exercise is crucial for health. Aim for:\n\n- 150 minutes of moderate activity weekly\n- Strength training 2-3 times per week\n- Flexibility exercises\n- Balance activities\n\nWhat type of exercise are you interested in?";
    } else {
      response = "Hello! I'm MediBot, your personal health assistant. How can I help you today? You can ask me about common symptoms, nutrition advice, exercise recommendations, or general health information.";
    }
    
    res.json({ response });
  });

  const httpServer = createServer(app);
  return httpServer;
}
