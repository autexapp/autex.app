'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowRight, Building2, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthLayout } from "@/components/ui/premium/auth-layout"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { PremiumButton } from "@/components/ui/premium/premium-button"

const profileSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (user.user_metadata?.business_name) {
        router.push('/dashboard');
        return;
      }
      
      setUserEmail(user.email || null);
    };
    
    checkUser();
  }, [router]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          business_name: values.businessName,
          phone: values.phone,
        },
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <GlassCard>
          {/* Header */}
          <div className="mb-8 space-y-2 text-center">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-white/90 sm:text-4xl">
              Welcome to Autex
            </h1>
            <p className="text-sm text-white/50">
              {userEmail ? (
                <>Signed in as <span className="text-white/80 font-medium">{userEmail}</span></>
              ) : (
                'Complete your profile'
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Business Name Input */}
              <div className="space-y-1.5">
                <Label htmlFor="businessName" className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Business Name
                </Label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/30 transition-colors group-focus-within/input:text-white/70">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Acme Inc."
                    className="h-11 border-white/5 bg-black/20 pl-10 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/5 focus:ring-0 rounded-lg transition-all duration-300"
                    {...register('businessName')}
                  />
                </div>
                {errors.businessName && (
                  <p className="text-xs text-red-400 pl-1">{errors.businessName.message}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Phone Number
                </Label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/30 transition-colors group-focus-within/input:text-white/70">
                    <Phone className="h-4 w-4" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01700000000"
                    className="h-11 border-white/5 bg-black/20 pl-10 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/5 focus:ring-0 rounded-lg transition-all duration-300"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-400 pl-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <PremiumButton
              type="submit"
              loading={isLoading}
              className="bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] shadow-none"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </PremiumButton>
          </form>
        </GlassCard>
      </div>
    </AuthLayout>
  );
}
