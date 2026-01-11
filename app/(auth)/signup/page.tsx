'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { SmartCard } from '@/components/ui/premium/smart-card';
import { PremiumButton } from '@/components/ui/premium/premium-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const signupSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setIsGoogleLoading(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            business_name: values.businessName,
            phone: values.phone,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        setSuccess(true);
      } else {
        // User is logged in immediately
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <SmartCard variant="static" className="w-full max-w-md p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-semibold text-zinc-900 dark:text-white">
              Check your email
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              We've sent you a confirmation link. Please check your email to verify your account.
            </p>
          </div>
          
          <Link href="/login" className="block w-full">
            <PremiumButton variant="outline" className="w-full">
              Back to Login
            </PremiumButton>
          </Link>
        </SmartCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SmartCard variant="static" className="p-8">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-2xl font-serif font-semibold text-zinc-900 dark:text-white">
              Create an account
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Enter your details to get started with Autex
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Acme Inc."
                className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white h-11"
                {...register('businessName')}
              />
              {errors.businessName && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.businessName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01915969330"
                className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white h-11"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white h-11"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white pr-10 h-11"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            <PremiumButton type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </PremiumButton>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-black px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <PremiumButton 
              variant="outline" 
              className="w-full" 
              onClick={signInWithGoogle}
              disabled={isGoogleLoading}
              type="button"
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </PremiumButton>
            
            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{' '}
              <Link href="/login" className="text-zinc-900 dark:text-white hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </SmartCard>
      </div>
    </div>
  );
}
