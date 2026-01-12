'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';

import { SmartCard } from '@/components/ui/premium/smart-card';
import { PremiumButton } from '@/components/ui/premium/premium-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SmartCard variant="static" className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-semibold text-zinc-900 dark:text-white">
                Check your email
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                We've sent a password reset link to{' '}
                <span className="font-medium text-zinc-900 dark:text-white">
                  {getValues('email')}
                </span>
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/20">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                💡 Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <PremiumButton 
                variant="outline" 
                className="w-full"
                onClick={() => setSuccess(false)}
              >
                Try another email
              </PremiumButton>
              
              <Link href="/login" className="block w-full">
                <PremiumButton className="w-full">
                  Back to Login
                </PremiumButton>
              </Link>
            </div>
          </SmartCard>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SmartCard variant="static" className="p-8">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-2xl font-serif font-semibold text-zinc-900 dark:text-white">
              Forgot your password?
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/20">
                {error}
              </div>
            )}

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
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <PremiumButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </PremiumButton>
          </form>

          <Link 
            href="/login" 
            className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </SmartCard>
      </div>
    </div>
  );
}
