'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

import { SmartCard } from '@/components/ui/premium/smart-card';
import { PremiumButton } from '@/components/ui/premium/premium-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const supabase = createClient();

  // Check if user has a valid reset session
  useEffect(() => {
    const checkSession = async () => {
      // Check for error in URL params (from Supabase redirect)
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      
      if (errorParam) {
        setError(errorDescription || 'Invalid or expired reset link');
        setIsValidSession(false);
        return;
      }

      // Check if user has an active session (password reset creates a session)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsValidSession(true);
      } else {
        // Try to exchange the code for a session
        const code = searchParams.get('code');
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setError('Invalid or expired reset link. Please request a new one.');
            setIsValidSession(false);
          } else {
            setIsValidSession(true);
          }
        } else {
          setError('Invalid reset link. Please request a new one.');
          setIsValidSession(false);
        }
      }
    };

    checkSession();
  }, [searchParams, supabase.auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
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

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <SmartCard variant="static" className="p-8 flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </SmartCard>
      </div>
    );
  }

  // Invalid session state
  if (!isValidSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SmartCard variant="static" className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">😔</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-semibold text-zinc-900 dark:text-white">
                Link Expired
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                {error || 'This password reset link is invalid or has expired.'}
              </p>
            </div>
            
            <Link href="/forgot-password" className="block w-full">
              <PremiumButton className="w-full">
                Request New Link
              </PremiumButton>
            </Link>
          </SmartCard>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SmartCard variant="static" className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-semibold text-zinc-900 dark:text-white">
                Password Updated!
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Your password has been successfully updated. Redirecting to dashboard...
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
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
              Reset your password
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
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
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white pr-10 h-11"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <PremiumButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </PremiumButton>
          </form>
        </SmartCard>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
          <SmartCard variant="static" className="p-8 flex items-center justify-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </SmartCard>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
