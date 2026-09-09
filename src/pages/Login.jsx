import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signUpWithEmail } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { data, error: signInError } = await signInWithEmail(email, password);
        if (signInError) throw signInError;
        navigate('/dashboard');
      } else {
        const { data, error: signUpError } = await signUpWithEmail(email, password);
        if (signUpError) throw signUpError;
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-lg">LS</span>
          </div>
          <h1 className="text-3xl font-bold text-white">LeadSetu</h1>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            {mode === 'signin'
              ? 'Sign in to access your leads and manage your pipeline'
              : 'Start your free 7-day trial. No credit card required.'}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              <span>{loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center text-slate-400 text-sm mt-6">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError('');
              }}
              className="text-indigo-500 hover:text-indigo-400 font-medium transition"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
