import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegistration } from "@/context/RegistrationContext";
import { useToast } from "@/hooks/use-toast";

const batches = Array.from({ length: 16 }, (_, i) => String(2010 + i));

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  batch: z.string().min(1, "Select a batch"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Enter a valid phone number (10-15 digits)"),
  email: z.string().email("Invalid email").max(255).or(z.literal("")),
  profession: z.string().max(100).optional(),
  location: z.string().trim().min(1, "Location is required").max(200),
  paymentStatus: z.enum(["paid", "pending"]),
});

type FormData = z.infer<typeof schema>;

export const RegistrationForm = () => {
  const { addRegistration } = useRegistration();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", batch: "", phone: "", email: "", profession: "", location: "", paymentStatus: "pending" },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please upload an image under 2MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: FormData) => {
    const result = addRegistration({ name: data.name, batch: data.batch, phone: data.phone, email: data.email || "", profession: data.profession || "", location: data.location, paymentStatus: data.paymentStatus, image: imagePreview });
    if (result.success) {
      toast({ title: "🎉 Success!", description: result.message });
      reset();
      setImagePreview("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } else {
      toast({ title: "Registration Failed", description: result.message, variant: "destructive" });
    }
  };

  return (
    <section id="register" className="py-20">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Register Now</h2>
          <p className="mt-3 text-muted-foreground">Fill in your details to secure your spot at the reunion.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-2xl card-gradient rounded-2xl border border-border p-6 shadow-elegant sm:p-10"
        >
          {showSuccess && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 flex items-center gap-3 rounded-lg bg-primary/10 p-4 text-primary">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Registration successful! Welcome aboard.</span>
            </motion.div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Enter your full name" {...register("name")} className="mt-1.5" />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div>
              <Label>Batch *</Label>
              <Select onValueChange={(v) => setValue("batch", v)} value={watch("batch")}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select batch" /></SelectTrigger>
                <SelectContent>
                  {batches.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.batch && <p className="mt-1 text-sm text-destructive">{errors.batch.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" placeholder="01XXXXXXXXX" {...register("phone")} className="mt-1.5" />
              {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className="mt-1.5" />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="profession">Profession (Optional)</Label>
              <Input id="profession" placeholder="e.g. Engineer" {...register("profession")} className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="location">Current Location *</Label>
              <Input id="location" placeholder="City, Country" {...register("location")} className="mt-1.5" />
              {errors.location && <p className="mt-1 text-sm text-destructive">{errors.location.message}</p>}
            </div>

            <div>
              <Label>Payment Status</Label>
              <Select onValueChange={(v) => setValue("paymentStatus", v as "paid" | "pending")} value={watch("paymentStatus")}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label>Photo (Optional)</Label>
              <div className="mt-1.5 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full rounded-xl object-cover" />
                  ) : (
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  )}
                </button>
                <span className="text-sm text-muted-foreground">Max 2MB, JPG/PNG</span>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-8 w-full gold-gradient border-0 text-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity py-6 text-base">
            {isSubmitting ? "Submitting…" : "Submit Registration"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};
