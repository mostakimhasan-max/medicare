'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Info, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { ROLE_REDIRECTS } from '@/utils/constants';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_USERS = [
  { role: 'Admin',   email: 'admin@medicare.com' },
  { role: 'Doctor',  email: 'doctor@medicare.com' },
  { role: 'Staff',   email: 'staff@medicare.com' },
  { role: 'Patient', email: 'patient@medicare.com' },
];

const STAFF_AVATARS = [
  { alt: 'Female doctor smiling portrait',     src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtQXR84lY_TEuYSypuOh2TjkI40BnKTT3Qycc-CFrO3362XIWymVJNYzlYB9f2W2A2MztnrJPkJtuCchPvmsCRcywlW5QKxio-t9FgfTAQ-AhFcCnXwFI1PtUPjYqCFvAlj2AiNwJ0IU5TUoRRa5c2A1E1aZVJyPVzHSzf9CUxrFz0QkIil_aMCU3AQC47uwFGsM0xdbYno3aXPYvkTX2kjB3FvfTDJJal9WJrVj3wLl1-Pzb4gI8MVgkpwCjIakeZYgvmI6bmLJQ' },
  { alt: 'Male physician professional portrait', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI83agYogxV4_EdwFuGOEgJ836o26H4m1mUjrnaHzUmomsNQUjt2W42lsBZ5tGLHTv4HpEUYLjBfRUzrDy2B_i-1K78ueJQIOeEYgEFFrVGca6NcwfDq5OgrM9IYZREKH6vwjANwd0Aer4XvHY7_aBwCeT8GsybsY108YwNcOt9R5w_af6Lr8wEmdi07dcYuy8rv0U0hELEI69VMdulmBBaKFOrMB9rdrZyqLqHGZ6XCv46mLjXnnCGH46Ei_vpZF2a9sPLITJiiM' },
  { alt: 'Nurse in uniform portrait',           src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWWk3vytaya7xtTli1KIjdQyLYC5z04q_9KTXN2xkBK0-k5TGY_sf4t92Z6l3B2JrqY3Ex8qcNDge_Gm2BppTGKcB8-2o7yJf554UgVZgjYwywEUIISsqYoQMnz1rDLxEN60RrivksKwr1UcKM1hfWSBFA8Oa6SSC6uvLPp-E5Cs1iXxIWLEWI6UTNUtM9fLShvZL1fUVFHzpqr8xVAej0Z2S4B2GfKTmlxcmFCwJEd4138w1oXHVTAWIO5e6epDliSup7QvkbvE0' },
];

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const user = await authService.login(data);
      setUser(user);
      router.push(ROLE_REDIRECTS[user.role]);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left panel — marketing */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <ShieldCheck size={14} />
            HIPAA Compliant Security
          </div>

          <h1 className="text-5xl font-extrabold text-foreground leading-[1.1]">
            Modern Healthcare <br />
            <span className="text-primary">Starts Here.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Streamline patient care with our intuitive electronic medical records platform. Secure,
            efficient, and built for professionals.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex -space-x-3">
              {STAFF_AVATARS.map((a) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={a.alt}
                  alt={a.alt}
                  src={a.src}
                  className="size-12 rounded-full border-4 border-background shadow-sm object-cover"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Trusted by <span className="text-foreground font-bold">12,000+</span> medical staff daily
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex flex-col gap-8">
          <div className="bg-card rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 border border-border p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-card-foreground">Welcome Back</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Please enter your credentials to access the portal.
              </p>
            </div>

            {/* Server error */}
            {serverError && (
              <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                <span className="mt-0.5">⚠</span>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="doctor@medicare.com"
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-foreground" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in…' : (
                  <>
                    Sign In to Portal
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <Info size={14} />
                Demo Credentials
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {DEMO_USERS.map(({ role, email }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setValue('email', email);
                      setValue('password', 'password123');
                    }}
                    className="p-3 rounded-lg bg-background border border-border hover:border-primary/40 hover:shadow-sm transition-all text-left"
                  >
                    <span className="text-[10px] font-bold text-primary uppercase block mb-1">{role}</span>
                    <p className="text-[11px] text-foreground truncate">{email}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            By logging in, you agree to our{' '}
            <a href="#" className="underline hover:text-primary">Terms of Service</a> and{' '}
            <a href="#" className="underline hover:text-primary">Data Privacy Policy</a>.
          </p>
        </div>

      </div>
    </div>
  );
}

