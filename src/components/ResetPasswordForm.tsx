// src/components/ResetPasswordForm.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Properly extract token from URL
    const urlToken = searchParams?.get('token');
    console.log('Extracted token from URL:', urlToken); // Debug log
    
    if (!urlToken) {
      setMessage({ text: 'Invalid reset link - missing token', isError: true });
    } else {
      setToken(urlToken);
    }

    console.log('Full URL:', window.location.href);
  console.log('Search params:', Array.from(searchParams?.entries() || []));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setMessage({ text: 'Reset token is missing', isError: true });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', isError: true });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      console.log('Reset response:', data); // Debug log

      if (!response.ok) throw new Error(data.error || 'Failed to reset password');

      setMessage({ 
        text: 'Password reset successfully! Redirecting...', 
        isError: false 
      });
      setTimeout(() => router.push('/sign-in'), 2000);
    } catch (error: any) {
      setMessage({ 
        text: error.message || 'An error occurred', 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      
      {message.text && (
        <p className={`p-3 rounded ${
          message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="hidden"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        
        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}