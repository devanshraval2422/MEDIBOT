import { apiRequest } from "./queryClient";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
  name?: string;
}

interface GoogleCredentials {
  googleId: string;
  email: string;
  name: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const res = await apiRequest("POST", "/api/auth/login", credentials);
  return res.json();
}

export async function register(credentials: RegisterCredentials): Promise<User> {
  const res = await apiRequest("POST", "/api/auth/register", credentials);
  return res.json();
}

export async function logout(): Promise<void> {
  await apiRequest("POST", "/api/auth/logout");
}

export async function getSession(): Promise<User | null> {
  try {
    const res = await fetch("/api/auth/session", {
      credentials: "include",
    });
    
    if (res.ok) {
      return res.json();
    }
    
    return null;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export async function loginWithGoogle(credentials: GoogleCredentials): Promise<User> {
  const res = await apiRequest("POST", "/api/auth/google", credentials);
  return res.json();
}
