import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, Settings, Menu, X } from 'lucide-react';
import useToast from '../../hooks/useToast';

export default function Navigation() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (error) {
      showToast('Failed to sign out', 'error');
    } else {
      showToast('Signed out successfully', 'success');
      navigate('/login', { replace: true });
    }
  };

  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/todos', label: 'Todos' },
    { to: '/goals', label: 'Goals' },
    { to: '/journal', label: 'Journal' },
    { to: '/habits', label: 'Habits' },
    { to: '/expenses', label: 'Expenses' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-chronicle-stone/10 sticky top-0 z-40 shadow-soft">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold gradient-text">
              Chronicle
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-chronicle-charcoal hover:text-chronicle-sage-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Profile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-chronicle-charcoal hover:bg-chronicle-sage/10 rounded-soft transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 hover:bg-chronicle-sage/10 rounded-soft transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-chronicle-sage to-chronicle-moss rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-chronicle-charcoal max-w-[150px] truncate">
                  {user?.user_metadata?.name || user?.email}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-card shadow-large border border-chronicle-stone/10 py-2 animate-scale-in z-50">
                  <div className="px-4 py-3 border-b border-chronicle-stone/10">
                    <p className="text-sm font-medium text-chronicle-ink">
                      Welcome back, {user?.user_metadata?.name || 'there'}!
                    </p>
                    <p className="text-sm text-chronicle-stone truncate">{user?.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/profile');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-chronicle-charcoal hover:bg-chronicle-sage/10 transition-colors flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Profile Settings
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-chronicle-rust hover:bg-chronicle-rust/10 transition-colors flex items-center gap-2 border-t border-chronicle-stone/10 mt-1 pt-3"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-chronicle-stone/10 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setShowMobileMenu(false)}
                  className="px-4 py-2 text-sm font-medium text-chronicle-charcoal hover:bg-chronicle-sage/10 rounded-soft transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
