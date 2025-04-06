import { apiRequest } from "./queryClient";

export interface HealthProfileData {
  weight: number;
  height: number;
  age: number;
  gender: string;
  allergies?: string;
}

export interface HealthProfile extends HealthProfileData {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  response: string;
}

// Health profile API
export async function sendChatMessage(data: ChatMessage): Promise<ChatResponse> {
  const res = await fetch("/api/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer AIzaSyA-M6BvszX7fQ1TJNftEYZNDocGTsXlwPc"
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
}


export async function getHealthProfile(): Promise<HealthProfile> {
  const res = await fetch("/api/health-profile", {
    credentials: "include",
  });
  
  if (!res.ok) {
    throw new Error("Failed to get health profile");
  }
  
  return res.json();
}

// Contact form API
export async function submitContactForm(data: ContactFormData): Promise<void> {
  await apiRequest("POST", "/api/contact", data);
}

// Chatbot API
export async function sendChatMessage(data: ChatMessage): Promise<ChatResponse> {
  const res = await apiRequest("POST", "/api/chatbot", data);
  return res.json();
}

// BMI calculation (client-side)
export function calculateBMI(weight: number, height: number): number {
  // Convert height from cm to m
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): {
  category: string;
  color: string;
  description: string;
} {
  if (bmi < 18.5) {
    return { 
      category: "Underweight", 
      color: "#EAB308", // yellow/warning color
      description: "You may need to gain some weight. Consider consulting with a healthcare professional about a healthy weight gain plan."
    };
  } else if (bmi < 25) {
    return { 
      category: "Healthy Weight", 
      color: "#22C55E", // green/success color
      description: "Your BMI indicates you're at a healthy weight. Continue with your balanced diet and regular exercise routine to maintain your health."
    };
  } else if (bmi < 30) {
    return { 
      category: "Overweight", 
      color: "#EAB308", // yellow/warning color
      description: "You may benefit from losing some weight. Focus on a balanced diet and regular physical activity."
    };
  } else {
    return { 
      category: "Obese", 
      color: "#EF4444", // red/danger color
      description: "Your BMI indicates obesity, which increases risk for health conditions. Consider consulting a healthcare professional about a weight management plan."
    };
  }
}

export function getBMIMarkerPosition(bmi: number): number {
  let position = 0;
  
  if (bmi < 18.5) {
    position = (bmi / 18.5) * 25;
  } else if (bmi < 25) {
    position = 25 + ((bmi - 18.5) / 6.5) * 25;
  } else if (bmi < 30) {
    position = 50 + ((bmi - 25) / 5) * 25;
  } else {
    position = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
  }
  
  return position;
}
