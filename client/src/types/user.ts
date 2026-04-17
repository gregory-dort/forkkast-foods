export interface AppUser {
    id: string;
    email: string;
    name: string;
}

export interface AuthContextType {
    user: AppUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    clearError: () => void;
}