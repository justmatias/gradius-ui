'use client';

import { useState } from 'react';
import { Navbar } from '@/components/gradius/navbar';
import { KpiCards } from '@/components/gradius/kpi-cards';
import { FileUploadZone } from '@/components/gradius/file-upload-zone';
import { DegreeMapCanvas } from '@/components/gradius/degree-map-canvas';
import { AuthModal } from '@/components/gradius/auth-modal';

type AuthMode = 'login' | 'register';

export default function Home() {
	const [authOpen, setAuthOpen] = useState(false);
	const [authMode, setAuthMode] = useState<AuthMode>('login');

	const openAuth = (mode: AuthMode) => {
		setAuthMode(mode);
		setAuthOpen(true);
	};

	return (
		<div className='relative min-h-screen bg-background'>
			<div className='pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.19_155/0.04),transparent_60%)]' />

			<Navbar onAuthOpen={openAuth} />

			<main className='relative mx-auto max-w-7xl px-4 py-8 lg:px-8'>
				<section id='dashboard' className='mb-8'>
					<div className='mb-6'>
						<h1 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance'>
							Your Degree Dashboard
						</h1>
						<p className='mt-1 text-sm text-muted-foreground'>
							Track your academic progress at a glance
						</p>
					</div>
					<KpiCards total={42} pending={24} approved={18} />
				</section>

				<section className='mb-8'>
					<FileUploadZone />
				</section>

				<section className='mb-8'>
					<DegreeMapCanvas />
				</section>
			</main>

			{authOpen && (
				<AuthModal
					mode={authMode}
					onClose={() => setAuthOpen(false)}
					onSwitchMode={(mode) => setAuthMode(mode)}
				/>
			)}
		</div>
	);
}
