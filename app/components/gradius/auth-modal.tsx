'use client';

import { useState } from 'react';
import {
	GraduationCap,
	Mail,
	Lock,
	Eye,
	EyeOff,
	X,
	ArrowRight,
	User,
	Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
	mode: AuthMode;
	onClose: () => void;
	onSwitchMode: (mode: AuthMode) => void;
}

interface AuthFormData {
	username: string;
	name: string;
	lastName: string;
	email: string;
	password: string;
}

const INITIAL_FORM_DATA: AuthFormData = {
	username: '',
	name: '',
	lastName: '',
	email: '',
	password: '',
};

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
	const { login, register } = useAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState<AuthFormData>(INITIAL_FORM_DATA);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isLogin = mode === 'login';

	const updateField =
		(field: keyof AuthFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
			setFormData((prev) => ({ ...prev, [field]: e.target.value }));

	const resetForm = () => {
		setFormData(INITIAL_FORM_DATA);
		setError(null);
	};

	const handleSwitchMode = (newMode: AuthMode) => {
		resetForm();
		onSwitchMode(newMode);
	};

	const extractErrorMessage = (err: unknown): string => {
		if (err instanceof AxiosError) {
			const detail = err.response?.data?.detail;
			if (typeof detail === 'string') return detail;
			if (Array.isArray(detail)) {
				return detail
					.map((d: { msg?: string }) => d.msg ?? String(d))
					.join('. ');
			}
		}
		if (err instanceof Error) return err.message;
		return 'An unexpected error occurred';
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			if (isLogin) {
				await login(formData.username, formData.password);
				toast.success('Welcome back!', {
					description: 'You are now signed in.',
				});
			} else {
				await register({
					username: formData.username,
					name: formData.name,
					last_name: formData.lastName,
					email: formData.email,
					password: formData.password,
				});
				toast.success('Account created!', {
					description: 'You are now signed in.',
				});
			}
			onClose();
		} catch (err) {
			const message = extractErrorMessage(err);
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-background/80 backdrop-blur-sm'
				onClick={onClose}
				role='presentation'
			/>

			<div className='relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-300'>
				<div className='mx-4 overflow-hidden rounded-2xl border border-border/60 glass glass-border glow-primary'>
					<div className='relative px-8 pb-8 pt-10'>
						<button
							type='button'
							onClick={onClose}
							className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
							aria-label='Close'
						>
							<X className='h-4 w-4' />
						</button>

						<div className='mb-8 flex flex-col items-center gap-3'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 glow-primary'>
								<GraduationCap className='h-6 w-6 text-primary' />
							</div>
							<div className='text-center'>
								<h2 className='text-xl font-semibold text-foreground'>
									{isLogin ? 'Welcome back' : 'Create your account'}
								</h2>
								<p className='mt-1 text-sm text-muted-foreground'>
									{isLogin
										? 'Sign in to manage your degree path'
										: 'Start tracking your academic journey'}
								</p>
							</div>
						</div>

						{/* ── Error banner ───────────────────────────────────── */}
						{error && (
							<div className='mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200'>
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
							{/* ── Username ──────────────────────────────────────── */}
							<div className='flex flex-col gap-2'>
								<Label
									htmlFor='username'
									className='text-sm font-medium text-foreground'
								>
									Username
								</Label>
								<div className='relative'>
									<User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
									<Input
										id='username'
										type='text'
										placeholder='johndoe'
										value={formData.username}
										onChange={updateField('username')}
										required
										disabled={loading}
										className='pl-10 bg-secondary border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20'
									/>
								</div>
							</div>

							{/* ── Register-only fields ──────────────────────────── */}
							{!isLogin && (
								<>
									<div className='grid grid-cols-2 gap-3'>
										<div className='flex flex-col gap-2'>
											<Label
												htmlFor='name'
												className='text-sm font-medium text-foreground'
											>
												First Name
											</Label>
											<Input
												id='name'
												type='text'
												placeholder='John'
												value={formData.name}
												onChange={updateField('name')}
												required
												disabled={loading}
												className='bg-secondary border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20'
											/>
										</div>
										<div className='flex flex-col gap-2'>
											<Label
												htmlFor='last-name'
												className='text-sm font-medium text-foreground'
											>
												Last Name
											</Label>
											<Input
												id='last-name'
												type='text'
												placeholder='Doe'
												value={formData.lastName}
												onChange={updateField('lastName')}
												required
												disabled={loading}
												className='bg-secondary border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20'
											/>
										</div>
									</div>

									<div className='flex flex-col gap-2'>
										<Label
											htmlFor='email'
											className='text-sm font-medium text-foreground'
										>
											Email
										</Label>
										<div className='relative'>
											<Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
											<Input
												id='email'
												type='email'
												placeholder='you@university.edu'
												value={formData.email}
												onChange={updateField('email')}
												required
												disabled={loading}
												className='pl-10 bg-secondary border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20'
											/>
										</div>
									</div>
								</>
							)}

							{/* ── Password ──────────────────────────────────────── */}
							<div className='flex flex-col gap-2'>
								<Label
									htmlFor='password'
									className='text-sm font-medium text-foreground'
								>
									Password
								</Label>
								<div className='relative'>
									<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
									<Input
										id='password'
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter your password'
										value={formData.password}
										onChange={updateField('password')}
										required
										disabled={loading}
										className='pl-10 pr-10 bg-secondary border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground'
										aria-label={
											showPassword ? 'Hide password' : 'Show password'
										}
									>
										{showPassword ? (
											<EyeOff className='h-4 w-4' />
										) : (
											<Eye className='h-4 w-4' />
										)}
									</button>
								</div>
							</div>

							{isLogin && (
								<div className='flex justify-end'>
									<button
										type='button'
										className='text-xs text-primary hover:text-primary/80 transition-colors'
									>
										Forgot password?
									</button>
								</div>
							)}

							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:glow-primary'
							>
								{loading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										{isLogin ? 'Signing In…' : 'Creating Account…'}
									</>
								) : (
									<>
										{isLogin ? 'Sign In' : 'Create Account'}
										<ArrowRight className='ml-2 h-4 w-4' />
									</>
								)}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<p className='text-sm text-muted-foreground'>
								{isLogin
									? "Don't have an account?"
									: 'Already have an account?'}{' '}
								<button
									type='button'
									onClick={() =>
										handleSwitchMode(isLogin ? 'register' : 'login')
									}
									className='font-medium text-primary hover:text-primary/80 transition-colors'
								>
									{isLogin ? 'Sign up' : 'Sign in'}
								</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
