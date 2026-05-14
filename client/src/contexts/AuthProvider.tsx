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
            if (_event === 'SIGNED_OUT') {
              setUser(null);
              setIsLoading(false);
              return;
            }

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

        setUser(null);
      } catch (err: any) {
        console.error('Sign out error: ', err);
        setError(err.message || 'Sign out failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    const updateName = async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
        const { error: authError } = await supabase.auth.updateUser({
            data: { name }
        });
        if (authError) throw authError;

        const { error: profileError } = await supabase
            .from('profiles')
            .update({ name })
            .eq('id', user!.id);
        if (profileError) throw profileError;

        setUser(prev => prev ? { ...prev, name } : null);
    } catch (err: any) {
        setError(err.message || 'Failed to update name');
        throw err;
    } finally {
        setIsLoading(false);
    }
};

  const updateEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
        const { error: authError } = await supabase.auth.updateUser({ email });
        if (authError) throw authError;

        const { error: profileError } = await supabase
            .from('profiles')
            .update({ email })
            .eq('id', user!.id);
        if (profileError) throw profileError;

        setUser(prev => prev ? { ...prev, email } : null);
    } catch (err: any) {
        setError(err.message || 'Failed to update email');
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
    } catch (err: any) {
        setError(err.message || 'Failed to update password');
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', user!.id);
        if (profileError) throw profileError;

        const { error: authError } = await supabase.auth.admin.deleteUser(user!.id);
        if (authError) throw authError;

        await signOut();
    } catch (err: any) {
        setError(err.message || 'Failed to delete account');
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
    updateName,
    updateEmail,
    updatePassword,
    deleteAccount,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}