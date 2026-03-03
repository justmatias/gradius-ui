import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 && typeof window !== 'undefined') {
			const isAuthEndpoint = error.config?.url?.startsWith('/auth');
			if (!isAuthEndpoint) {
				localStorage.removeItem('access_token');
				window.dispatchEvent(new Event('auth:logout'));
			}
		}
		return Promise.reject(error);
	},
);

export { api, API_BASE_URL };
