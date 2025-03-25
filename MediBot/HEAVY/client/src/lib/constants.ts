export const APP_NAME = "MediBot";
export const APP_DESCRIPTION = "Your personal AI health assistant providing evidence-based information tailored to your unique profile.";

// BMI Categories
export const BMI_CATEGORIES = {
  UNDERWEIGHT: "Underweight",
  NORMAL: "Healthy Weight",
  OVERWEIGHT: "Overweight",
  OBESE: "Obese"
};

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" }
];

// Features list
export const FEATURES = [
  {
    icon: "ri-message-3-line",
    title: "AI Health Chatbot",
    description: "Get instant answers to your health questions with our advanced AI assistant trained on medical knowledge.",
    bgColor: "bg-primary-100",
    iconColor: "text-primary-500"
  },
  {
    icon: "ri-calculator-line",
    title: "BMI Calculator",
    description: "Track your health progress with our interactive BMI calculator and get personalized recommendations.",
    bgColor: "bg-secondary-100",
    iconColor: "text-secondary-500"
  },
  {
    icon: "ri-user-settings-line",
    title: "Personalized Profile",
    description: "Create your health profile including allergies, medical history, and preferences for tailored advice.",
    bgColor: "bg-accent-100",
    iconColor: "text-accent-500"
  },
  {
    icon: "ri-24-hours-line",
    title: "24/7 Availability",
    description: "Access health information and guidance whenever you need it, day or night, from any device.",
    bgColor: "bg-primary-100",
    iconColor: "text-primary-500"
  },
  {
    icon: "ri-lock-password-line",
    title: "Secure & Private",
    description: "Your health data is encrypted and protected. We prioritize your privacy and security.",
    bgColor: "bg-secondary-100",
    iconColor: "text-secondary-500"
  },
  {
    icon: "ri-health-book-line",
    title: "Health Insights",
    description: "Receive proactive health tips and insights based on your profile and health trends.",
    bgColor: "bg-accent-100",
    iconColor: "text-accent-500"
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Fitness Instructor",
    content: "MediBot has completely changed how I approach my health. The personalized recommendations based on my profile have been incredibly accurate and helpful."
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    content: "As someone with multiple allergies, I've always struggled to find clear information. MediBot takes my allergies into account and gives me safe, reliable advice."
  },
  {
    name: "Amanda Peterson",
    role: "Teacher",
    content: "The BMI calculator and health recommendations gave me the push I needed to make lifestyle changes. I've lost 15kg following MediBot's personalized advice!"
  }
];

// Social media links
export const SOCIAL_LINKS = [
  { icon: "ri-twitter-x-line", url: "#" },
  { icon: "ri-linkedin-fill", url: "#" },
  { icon: "ri-instagram-line", url: "#" },
  { icon: "ri-facebook-fill", url: "#" }
];

// Stats for About page
export const ABOUT_STATS = [
  { value: "2500+", label: "Beta Users" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "24/7", label: "Availability" },
  { value: "10k+", label: "Medical References" }
];
