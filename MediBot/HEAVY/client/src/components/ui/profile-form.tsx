import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { GENDER_OPTIONS } from "@/lib/constants";
import { createOrUpdateHealthProfile, type HealthProfile } from "@/lib/api";

const profileSchema = z.object({
  weight: z.number().min(20, "Weight must be at least 20kg").max(300, "Weight must be less than 300kg"),
  height: z.number().min(50, "Height must be at least 50cm").max(250, "Height must be less than 250cm"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  gender: z.string().min(1, "Please select a gender"),
  allergies: z.string().optional(),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSuccess?: (profile: HealthProfile) => void;
  initialData?: Partial<ProfileFormValues>;
}

export default function ProfileForm({ onSuccess, initialData }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      weight: initialData?.weight || undefined,
      height: initialData?.height || undefined,
      age: initialData?.age || undefined,
      gender: initialData?.gender || "",
      allergies: initialData?.allergies || "",
      privacyPolicy: initialData?.privacyPolicy || false,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      
      const profileData = {
        weight: data.weight,
        height: data.height,
        age: data.age,
        gender: data.gender,
        allergies: data.allergies,
      };
      
      const profile = await createOrUpdateHealthProfile(profileData);
      
      toast({
        title: "Profile updated",
        description: "Your health profile has been saved successfully.",
      });
      
      if (onSuccess) onSuccess(profile);
      
    } catch (error) {
      console.error("Error saving profile:", error);
      
      toast({
        title: "Error",
        description: "Failed to save your health profile. Please try again.",
        variant: "destructive",
      });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 max-w-md mx-auto"
    >
      <h3 className="font-heading font-bold text-xl mb-4 text-center">Complete Your Health Profile</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Body Weight (kg)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="70"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Height (cm)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="175"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Age
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="35"
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Gender
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDER_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Allergies
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any allergies or intolerances..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-slate-700">
                    I agree to the <a href="#" className="text-primary-500 hover:underline">privacy policy</a> and <a href="#" className="text-primary-500 hover:underline">terms of service</a>.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Profile...
              </>
            ) : "Save Profile"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
