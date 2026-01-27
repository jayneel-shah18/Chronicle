import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, UserPlus } from 'lucide-react';
import useToast from '../../hooks/useToast';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleEmailSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please enter your name', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, name);

    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Account created! Check your email to verify.', 'success');
      navigate('/login');
    }

    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();

    if (error) {
      showToast(error.message, 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chronicle-cream via-chronicle-sand to-chronicle-warm-gray/30 pattern-dots flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-5xl font-display font-bold gradient-text mb-2">
            Chronicle
          </h1>
          <p className="text-chronicle-stone text-lg">
            Start your growth journey today
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="card animate-scale-in">
          <h2 className="text-2xl font-display font-semibold text-chronicle-ink mb-6">
            Create Account
          </h2>

          <form onSubmit={handleEmailSignUp} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                Name
              </label>
              <div className="relative">
                <UserPlus size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-chronicle-stone" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full pl-12"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-chronicle-stone" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full pl-12"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-chronicle-stone" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full pl-12"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
              <p className="text-xs text-chronicle-stone mt-1">
                At least 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-chronicle-stone" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full pl-12"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-chronicle-stone/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-chronicle-stone">Or continue with</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="btn-secondary w-full flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-chronicle-stone mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-chronicle-sage-dark font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-chronicle-stone mt-6">
          By continuing, you agree to Chronicle's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
