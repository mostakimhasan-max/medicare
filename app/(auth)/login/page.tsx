'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Activity, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { ROLE_REDIRECTS } from '@/utils/constants';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_USERS = [
  { role: 'Admin', email: 'admin@medicare.com', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' },
  { role: 'Doctor', email: 'doctor@medicare.com', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
  { role: 'Staff', email: 'staff@medicare.com', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
  { role: 'Patient', email: 'patient@medicare.com', badge: 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300' },
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
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Activity size={22} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-lg block leading-tight">Medicare</span>
            <span className="text-[11px] text-blue-300 uppercase tracking-widest">
              Management System
            </span>
          </div>
        </div>

        <div>
          <blockquote className="text-2xl font-light leading-relaxed text-slate-200">
            "Empowering healthcare professionals with the tools to deliver{' '}
            <span className="text-blue-400 font-medium">exceptional patient care</span>."
          </blockquote>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'Active Patients', value: '1,247' },
              { label: 'Doctors On Staff', value: '24' },
              { label: 'Appointments Today', value: '48' },
              { label: 'Years Serving', value: '15+' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500">© 2026 Medicare Management System</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground">Medicare</span>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-card-foreground">Welcome back</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Server error */}
            {serverError && (
              <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                <span className="mt-0.5">⚠</span>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="you@medicare.com"
                    autoComplete="email"
                    className="w-full h-10 pl-9 pr-3 border border-input bg-background text-foreground rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-foreground" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full h-10 pl-9 pr-10 border border-input bg-background text-foreground rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                className="w-full h-10 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            {/* Demo quick-fill */}
            <div className="mt-7 pt-6 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Demo accounts — click to fill
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_USERS.map(({ role, email, badge }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setValue('email', email);
                      setValue('password', 'password123');
                    }}
                    className="flex items-center gap-2 px-3 py-2.5 bg-muted hover:bg-accent border border-border rounded-xl text-left text-xs transition-colors"
                  >
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${badge}`}>
                      {role}
                    </span>
                    <span className="text-muted-foreground truncate">{email}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-[11px] text-muted-foreground mt-3">
                Password: <span className="font-mono font-medium">password123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

