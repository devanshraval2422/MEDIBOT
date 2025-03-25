import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  googleId: text("google_id").unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
});

export const healthProfiles = pgTable("health_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weight: real("weight").notNull(),
  height: real("height").notNull(), 
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  allergies: text("allergies"),
  createdAt: text("created_at").notNull().default("NOW()"),
  updatedAt: text("updated_at").notNull().default("NOW()"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  googleId: true,
});

export const insertHealthProfileSchema = createInsertSchema(healthProfiles).pick({
  userId: true,
  weight: true,
  height: true,
  age: true,
  gender: true,
  allergies: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHealthProfile = z.infer<typeof insertHealthProfileSchema>;
export type HealthProfile = typeof healthProfiles.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
