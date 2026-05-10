import axios from 'axios';
import { supabase } from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || '';

export const usersApi = axios.create({
    baseURL: `${API_URL}/api/users`,
    headers: { 'Content-Type': 'application/json' }
});

export const mealsApi = axios.create({
    baseURL: `${API_URL}/api/meals`,
    headers: { 'Content-Type': 'application/json' }
});

mealsApi.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
});