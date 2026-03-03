import { api } from './api';

export interface RegisterUserPayload {
	username: string;
	name: string;
	last_name: string;
	email: string;
	password: string;
}

export interface RegisteredUser {
	user_id: string;
	username: string;
	name: string;
	last_name: string;
	email: string;
}

export interface TokenResponse {
	access_token: string;
	token_type: string;
}

export async function registerUser(
	payload: RegisterUserPayload,
): Promise<RegisteredUser> {
	const { data } = await api.post<RegisteredUser>('/auth/register', payload);
	return data;
}

export async function loginUser(
	username: string,
	password: string,
): Promise<TokenResponse> {
	const formData = new URLSearchParams();
	formData.append('username', username);
	formData.append('password', password);

	const { data } = await api.post<TokenResponse>('/auth/token', formData, {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});

	return data;
}

export async function getMe(): Promise<RegisteredUser> {
	const { data } = await api.get<RegisteredUser>('/auth/me');
	return data;
}
