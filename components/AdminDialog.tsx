'use client';

import { useState, FormEvent } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Lock, Mail, X, AlertCircle, CheckCircle } from 'lucide-react';

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

const ADMIN_PASSWORD = 'firstStepAdmin@2026';
const RECOVERY_EMAIL = 'o.arafat@firststepsa.co';

export default function AdminDialog({ isOpen, onClose, onAuthenticate }: AdminDialogProps) {
  const { language } = useApp();
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      setPassword('');
      onAuthenticate();
      onClose();
    } else {
      setError(t('adminDialog.errorMessage'));
    }
  };

  const handleRecovery = () => {
    // Simulate sending recovery email
    setRecoverySent(true);
    setTimeout(() => {
      setRecoverySent(false);
      setShowRecovery(false);
    }, 3000);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setShowRecovery(false);
    setRecoverySent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admin-dialog fixed inset-0 flex items-center justify-center bg-[var(--overlay)] z-[60] transition-opacity duration-300">
      <div className="bg-[var(--card)] w-[420px] max-w-[90%] rounded-2xl p-8 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[var(--text)] hover:text-[var(--red)] transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {!showRecovery && !recoverySent && (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--blue)] flex items-center justify-center">
                <Lock size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text)]">
              {t('adminDialog.title')}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-[var(--text)]">
                  {t('adminDialog.passwordLabel')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder={t('adminDialog.passwordPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none"
                  autoFocus
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center gap-2 text-red-700 dark:text-red-300">
                  <AlertCircle size={18} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--blue)] text-white font-semibold hover:opacity-90 transition-opacity mb-3"
              >
                {t('adminDialog.loginButton')}
              </button>

              <button
                type="button"
                onClick={() => setShowRecovery(true)}
                className="w-full py-2 text-sm text-[var(--blue)] hover:underline"
              >
                {t('adminDialog.forgotPassword')}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[var(--muted)] text-white font-semibold hover:opacity-90 transition-opacity mt-2"
              >
                {t('adminDialog.cancelButton')}
              </button>
            </form>
          </>
        )}

        {showRecovery && !recoverySent && (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--green)] flex items-center justify-center">
                <Mail size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-[var(--text)]">
              {t('adminDialog.recoveryTitle')}
            </h2>
            <p className="text-center text-[var(--muted)] mb-6">
              {t('adminDialog.recoveryMessage', { email: RECOVERY_EMAIL })}
            </p>
            <button
              onClick={handleRecovery}
              className="w-full py-3 rounded-xl bg-[var(--green)] text-white font-semibold hover:opacity-90 transition-opacity mb-3"
            >
              {t('adminDialog.sendRecovery')}
            </button>
            <button
              onClick={() => setShowRecovery(false)}
              className="w-full py-3 rounded-xl bg-[var(--muted)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t('adminDialog.backToLogin')}
            </button>
          </>
        )}

        {recoverySent && (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--green)] flex items-center justify-center animate-pulse">
                <CheckCircle size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-[var(--text)]">
              {t('adminDialog.recoverySentTitle')}
            </h2>
            <p className="text-center text-[var(--muted)]">
              {t('adminDialog.recoverySentMessage', { email: RECOVERY_EMAIL })}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
