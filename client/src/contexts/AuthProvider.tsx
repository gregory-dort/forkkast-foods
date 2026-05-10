import { supabase } from '../lib/supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext'
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppUser, AuthContextType } from '../types/user';


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const checkSession = async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
        
            if (error) {
            console.error("Error checking session: ", error);
            setUser(null);
            } else if (session?.user) {
              const name = session.user.user_metadata?.name || '';

              if (!name) {
                const { data } = await supabase
                  .from('profiles')
                  .select('name')
                  .eq('id', session.user.id)
                  .single();
                setUser({
                  id: session.user.id, 
                  email: session.user.email || '', 
                  name: data?.name || ''
                });
              } else {
                setUser({ 
                  id: session.user.id, 
                  email: session.user.email || '', 
                  name 
                });
              }
            } else {
              setUser(null);
            }
        }
        catch (err) {
            console.error("Unexpected error during session check: ", err)
            setUser(null);
        }
        finally {
            setIsLoading(false);
        }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        const updateUser = async () => {
            if (session?.user) {
                const name = session.user.user_metadata?.name || '';
                
                if (!name) {
                    const { data } = await supabase
                        .from('profiles')
                        .select('name')
                        .eq('id', session.user.id)
                        .single<{ name: string }>();
                    setUser({ 
                        id: session.user.id, 
                        email: session.user.email || '', 
                        name: data?.name || '' 
                    });
                } else {
                    setUser({ 
                        id: session.user.id, 
                        email: session.user.email || '', 
                        name 
                    });
                }
              } else {
                  setUser(null);
              }
              setIsLoading(false);
          };
          updateUser();
      }
    );

    return () => {
      subscription.unsubscribe();
    };
    }, []);

    const signUp = async (email: string, password: string, name: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: {name}},
        });

        if (signUpError) {
          setError(signUpError.message);
          throw signUpError;
        }
      } catch (err: any) {
        console.error("Sign up error: ", err);
        setError(err.message || 'Sign up failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    const signIn = async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          throw signInError;
        }
      } catch (err: any) {
        console.error("Sign in error: ", err);
        setError(err.message || 'Sign in failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    const signOut = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { error: signOutError } = await supabase.auth.signOut();

        if (signOutError) {
          setError(signOutError.message);
          throw signOutError;
        }
      } catch (err: any) {
        console.error('Sign out error: ', err);
        setError(err.message || 'Sign out failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    const clearError = () => setError(null);

    const value: AuthContextType = {
    user,
    name: '',
    isAuthenticated: !!user,
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}