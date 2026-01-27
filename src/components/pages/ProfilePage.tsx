import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navigation from '../common/Navigation';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';
import { User, Mail, Calendar, Shield, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useToast from '../../hooks/useToast';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [isSavingName, setIsSavingName] = useState(false);
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);
  
  const { showToast } = useToast();

  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Unknown';

  const handleSaveName = async () => {
    if (!name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }

    setIsSavingName(true);
    try {
      const { error } = await supabase!.auth.updateUser({
        data: { name: name.trim() }
      });

      if (error) throw error;

      showToast('Name updated successfully!', 'success');
      setIsEditing(false);
    } catch (error: any) {
      showToast(error.message || 'Failed to update name', 'error');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleCancelEdit = () => {
    setName(user?.user_metadata?.name || '');
    setIsEditing(false);
  };

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast('Please enter your current password', 'error');
      return;
    }

    setIsVerifyingPassword(true);
    try {
      const { error } = await supabase!.auth.signInWithPassword({
        email: user?.email!,
        password: currentPassword,
      });

      if (error) {
        showToast('Current password is incorrect', 'error');
        return;
      }

      showToast('Password verified! Set your new password', 'success');
      setCurrentPasswordVerified(true);
    } catch (error: any) {
      showToast(error.message || 'Failed to verify password', 'error');
    } finally {
      setIsVerifyingPassword(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (currentPassword === newPassword) {
      showToast('New password must be different from current password', 'error');
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase!.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      showToast('Password changed successfully!', 'success');
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPasswordVerified(false);
    } catch (error: any) {
      showToast(error.message || 'Failed to change password', 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const isGoogleUser = user?.app_metadata?.provider === 'google';

  return (
    <div className="min-h-screen bg-gradient-to-br from-chronicle-cream via-chronicle-sand to-chronicle-warm-gray/30 pattern-dots">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <SectionHeader
          title="Profile Settings"
          subtitle="Manage your account information"
          icon={User}
        />

        <div className="space-y-6 mt-8">
          {/* Profile Information Card */}
          <Card variant="soft">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-chronicle-ink mb-1">
                  Personal Information
                </h3>
                <p className="text-sm text-chronicle-stone">
                  Your account details and preferences
                </p>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="btn-secondary text-sm"
                      disabled={isSavingName}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveName}
                      className="btn-primary text-sm"
                      disabled={isSavingName}
                    >
                      {isSavingName ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary text-sm"
                  >
                    Edit Name
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center gap-4 pb-4 border-b border-chronicle-stone/10">
                <div className="w-10 h-10 bg-chronicle-sage/20 rounded-soft flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-chronicle-sage" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-chronicle-stone mb-1">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input w-full text-sm py-2"
                      placeholder="Your name"
                    />
                  ) : (
                    <p className="text-chronicle-ink font-medium">
                      {user?.user_metadata?.name || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 pb-4 border-b border-chronicle-stone/10">
                <div className="w-10 h-10 bg-chronicle-terracotta/20 rounded-soft flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-chronicle-terracotta" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-chronicle-stone mb-1">Email</p>
                  <p className="text-chronicle-ink font-medium">{user?.email}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-4 pb-4 border-b border-chronicle-stone/10">
                <div className="w-10 h-10 bg-chronicle-ochre/20 rounded-soft flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-chronicle-ochre" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-chronicle-stone mb-1">Member Since</p>
                  <p className="text-chronicle-ink font-medium">{createdAt}</p>
                </div>
              </div>

              {/* Auth Provider */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-chronicle-moss/20 rounded-soft flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-chronicle-moss" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-chronicle-stone mb-1">Sign-in Method</p>
                  <p className="text-chronicle-ink font-medium">
                    {user?.app_metadata?.provider === 'google' ? 'Google OAuth' : 'Email & Password'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Password Change Card */}
          {!isGoogleUser && (
            <Card variant="soft">
              <h3 className="text-xl font-display font-semibold text-chronicle-ink mb-4">
                Password & Security
              </h3>
              
              {!showPasswordForm ? (
                <div>
                  <p className="text-sm text-chronicle-stone mb-4">
                    Keep your account secure by using a strong password.
                  </p>
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="btn-secondary text-sm"
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <>
                  {!currentPasswordVerified ? (
                    <form onSubmit={handleVerifyPassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="input w-full pr-12"
                            placeholder="Enter current password"
                            required
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-chronicle-stone hover:text-chronicle-charcoal"
                          >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-xs text-chronicle-stone mt-1">
                          Verify your identity to continue
                        </p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setCurrentPassword('');
                          }}
                          className="btn-secondary text-sm flex-1"
                          disabled={isVerifyingPassword}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary text-sm flex-1"
                          disabled={isVerifyingPassword}
                        >
                          {isVerifyingPassword ? 'Verifying...' : 'Verify Password'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input w-full pr-12"
                            placeholder="Enter new password"
                            minLength={6}
                            required
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-chronicle-stone hover:text-chronicle-charcoal"
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-xs text-chronicle-stone mt-1">
                          At least 6 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-chronicle-charcoal mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="input w-full"
                          placeholder="Confirm new password"
                          minLength={6}
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                            setCurrentPasswordVerified(false);
                          }}
                          className="btn-secondary text-sm flex-1"
                          disabled={isChangingPassword}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary text-sm flex-1"
                          disabled={isChangingPassword}
                        >
                          {isChangingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
