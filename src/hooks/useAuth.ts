import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User'
  }
];

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('user');
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isAuthenticated: !!savedUser
    };
  });

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem('user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [authState.user]);

  const signIn = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          u => u.email === email && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          setAuthState({
            user: userWithoutPassword,
            isAuthenticated: true
          });
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500); // Simulate API delay
    });
  };

  const signUp = (email: string, password: string, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find(u => u.email === email);
        
        if (existingUser) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser = {
          id: String(MOCK_USERS.length + 1),
          email,
          password,
          name
        };

        MOCK_USERS.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        setAuthState({
          user: userWithoutPassword,
          isAuthenticated: true
        });
        
        resolve();
      }, 500);
    });
  };

  const signOut = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut
  };
}