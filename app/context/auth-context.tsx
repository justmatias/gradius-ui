'use client';

import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	getMe,
	loginUser,
	registerUser,
	type RegisteredUser,
	type RegisterUserPayload,
} from '@/lib/auth';

export interface AuthContextValue {
	/** The authenticated user, or `null` when logged-out / unknown. */
	user: RegisteredUser | null;
	/** `true` while we are restoring the session on first load. */
	loading: boolean;
	/** Log in with username + password. Returns the user on success. */
	login: (username: string, password: string) => Promise<RegisteredUser>;
	/** Register a new account. Returns the created user on success. */
	register: (payload: RegisterUserPayload) => Promise<RegisteredUser>;
	/** Clear the local session. */
	logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<RegisteredUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('access_token');
		if (!token) {
			setLoading(false);
			return;
		}
		getMe()
			.then(setUser)
			.catch(() => {
				localStorage.removeItem('access_token');
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		const onLogout = () => {
			setUser(null);
		};
		window.addEventListener('auth:logout', onLogout);
		return () => window.removeEventListener('auth:logout', onLogout);
	}, []);

	const login = useCallback(
		async (username: string, password: string): Promise<RegisteredUser> => {
			const tokenRes = await loginUser(username, password);
			localStorage.setItem('access_token', tokenRes.access_token);
			const me = await getMe();
			setUser(me);
			return me;
		},
		[],
	);

	const register = useCallback(
		async (payload: RegisterUserPayload): Promise<RegisteredUser> => {
			const created = await registerUser(payload);
			const tokenRes = await loginUser(payload.username, payload.password);
			localStorage.setItem('access_token', tokenRes.access_token);
			setUser(created);
			return created;
		},
		[],
	);

	const logout = useCallback(() => {
		localStorage.removeItem('access_token');
		setUser(null);
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({ user, loading, login, register, logout }),
		[user, loading, login, register, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
