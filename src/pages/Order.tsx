import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import emailjs from '@emailjs/browser';

const SITE_TYPES = ["Portfolio Website", "SaaS Application", "E-commerce Store", "Business Website", "Blog Platform", "Custom Solution"];

const Order = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    product: SITE_TYPES[0],
    quantity: 1,
    notes: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSiteTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      product: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      // Save order to database
      const { error: dbError } = await supabase.from("orders").insert({
        ...formData,
        user_id: user.id
      });
      if (dbError) throw dbError;

      // Send email to customer
      await emailjs.send(
        'service_zf8dg1g', // Your EmailJS service ID
        'template_jame63i', // Customer template ID
        {
          to_name: formData.name,
          product: formData.product,
          notes: formData.notes,
          to_email: formData.email,
        },
        'LWBxSZHxgGGifV_Y7' // Your EmailJS public key
      );

      // Send email to owner
      await emailjs.send(
        'service_zf8dg1g', // Your EmailJS service ID
        'template_cc4vq48', // Owner template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          product: formData.product,
          notes: formData.notes,
        },
        'LWBxSZHxgGGifV_Y7' // Your EmailJS public key
      );

      toast({
        title: "Order Submitted Successfully! 🎉",
        description: "We've received your order and sent you a confirmation email. We'll contact you within 24 hours!",
        duration: 5000,
        className: "bg-green-50 border-green-200",
      });

      // Show success message and redirect after delay
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "There was an error submitting your order. Please try again.",
        duration: 7000,
      });
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Place Your Order</h1>
          <p className="text-muted-foreground">Tell us about your project requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg shadow-lg">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
            </div>

            <div>
              <Label htmlFor="product">Site Type</Label>
              <Select value={formData.product} onValueChange={handleSiteTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select site type" />
                </SelectTrigger>
                <SelectContent>
                  {SITE_TYPES.map(type => <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          

          <div>
            <Label htmlFor="notes">Project Requirements</Label>
            <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Please describe your project requirements, features needed, and any specific preferences..." className="h-32" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Place Order"}
          </Button>
        </form>
      </div>
    </div>;
};
export default Order;
