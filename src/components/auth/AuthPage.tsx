import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthPageProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
}

export function AuthPage({ onSignIn, onSignUp }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="mt-3 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          WarrantyWise
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSignIn ? (
            <SignInForm
              onSubmit={onSignIn}
              onToggleForm={() => setIsSignIn(false)}
            />
          ) : (
            <SignUpForm
              onSubmit={onSignUp}
              onToggleForm={() => setIsSignIn(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}