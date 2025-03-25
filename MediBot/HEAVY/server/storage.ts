import { 
  users, 
  type User, 
  type InsertUser, 
  healthProfiles, 
  type HealthProfile, 
  type InsertHealthProfile,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getHealthProfile(userId: number): Promise<HealthProfile | undefined>;
  createHealthProfile(profile: InsertHealthProfile): Promise<HealthProfile>;
  updateHealthProfile(userId: number, profile: Partial<InsertHealthProfile>): Promise<HealthProfile | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private healthProfiles: Map<number, HealthProfile>;
  private contactMessages: Map<number, ContactMessage>;
  private userIdCounter: number;
  private profileIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.healthProfiles = new Map();
    this.contactMessages = new Map();
    this.userIdCounter = 1;
    this.profileIdCounter = 1;
    this.messageIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.googleId === googleId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getHealthProfile(userId: number): Promise<HealthProfile | undefined> {
    return Array.from(this.healthProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createHealthProfile(insertProfile: InsertHealthProfile): Promise<HealthProfile> {
    const id = this.profileIdCounter++;
    const now = new Date().toISOString();
    const profile: HealthProfile = { 
      ...insertProfile, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.healthProfiles.set(id, profile);
    return profile;
  }

  async updateHealthProfile(userId: number, profileData: Partial<InsertHealthProfile>): Promise<HealthProfile | undefined> {
    const profile = Array.from(this.healthProfiles.values()).find(
      (profile) => profile.userId === userId
    );

    if (!profile) return undefined;

    const updatedProfile: HealthProfile = {
      ...profile,
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    this.healthProfiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageIdCounter++;
    const now = new Date().toISOString();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: now
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
