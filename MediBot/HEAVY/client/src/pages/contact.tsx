import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { submitContactForm } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { SOCIAL_LINKS } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      await submitContactForm({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll respond shortly.",
      });
      
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-100 text-accent-500 rounded-full mb-3">CONTACT US</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600">
            Have questions about MediBot or want to join our beta program? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-slate-600">support@medibot.ai</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                  <i className="ri-customer-service-2-line text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Customer Support</h3>
                  <p className="text-slate-600">Available Monday-Friday, 9am-5pm EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Location</h3>
                  <p className="text-slate-600">123 Health Avenue, Tech City, TC 10101</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-primary-100 hover:text-primary-500 transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>

            <motion.div
              className="mt-12 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <i className="ri-question-answer-line text-primary-500"></i> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Is MediBot a substitute for professional medical advice?</h4>
                  <p className="text-sm text-slate-600">No, MediBot provides general health information but doesn't replace professional healthcare. Always consult with qualified medical professionals for diagnosis and treatment.</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">How is my health data protected?</h4>
                  <p className="text-sm text-slate-600">We employ state-of-the-art encryption and security measures to protect your personal information. Your data is never shared with third parties without your explicit consent.</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Can I use MediBot for free?</h4>
                  <p className="text-sm text-slate-600">MediBot offers both free and premium tiers. The basic features are available to all users at no cost, while advanced personalization requires a subscription.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                    <i className="ri-check-line text-3xl"></i>
                  </div>
                </div>
                <h2 className="font-heading font-bold text-2xl mb-3">Message Sent Successfully!</h2>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                </p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-primary-500 text-white"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
                <h3 className="font-heading font-bold text-xl mb-6">Send Us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-700">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                                placeholder="John Doe"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-700">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                                placeholder="john@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-700">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                              placeholder="How can we help?"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-700">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                              placeholder="Type your message here..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subscribe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-accent-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-slate-700">
                              I agree to receive emails about MediBot updates and promotions.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-accent-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-accent-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
