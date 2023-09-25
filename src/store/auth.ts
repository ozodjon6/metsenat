import {defineStore} from 'pinia';
import axios from '@/service/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(username: string, password: string): Promise<void> {
            try {
                const response = await axios.post('/auth/login/', {
                    username,
                    password,
                });
                const token = response.data.access;
                this.token = token;
                localStorage.setItem('token', token);
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Authentication error:', error);
                throw error
            }
        },
        logout(): void {
            // Очистите состояние и localStorage при выходе
            this.token = null;
            localStorage.removeItem('token');
            this.isAuthenticated = false;
        },
        setIsAuthenticated(isAuthenticated: boolean) {
            this.isAuthenticated = isAuthenticated;
        },
    },
});
