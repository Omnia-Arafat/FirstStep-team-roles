'use client';

import { useState, FormEvent } from 'react';
import { useApp } from '@/contexts/AppContext';
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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const text = {
    title: { en: 'Admin Authentication', ar: 'مصادقة المدير' },
    passwordLabel: { en: 'Password', ar: 'كلمة المرور' },
    passwordPlaceholder: { en: 'Enter admin password', ar: 'أدخل كلمة مرور المدير' },
    loginButton: { en: 'Login', ar: 'تسجيل الدخول' },
    cancelButton: { en: 'Cancel', ar: 'إلغاء' },
    forgotPassword: { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
    errorMessage: { en: 'Incorrect password', ar: 'كلمة المرور غير صحيحة' },
    recoveryTitle: { en: 'Password Recovery', ar: 'استعادة كلمة المرور' },
    recoveryMessage: {
      en: `Password will be sent to: ${RECOVERY_EMAIL}`,
      ar: `سيتم إرسال كلمة المرور إلى: ${RECOVERY_EMAIL}`
    },
    sendRecovery: { en: 'Send Password', ar: 'إرسال كلمة المرور' },
    backToLogin: { en: 'Back to Login', ar: 'العودة لتسجيل الدخول' },
    recoverySentTitle: { en: 'Password Sent!', ar: 'تم إرسال كلمة المرور!' },
    recoverySentMessage: {
      en: `Password has been sent to ${RECOVERY_EMAIL}`,
      ar: `تم إرسال كلمة المرور إلى ${RECOVERY_EMAIL}`
    },
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      setPassword('');
      onAuthenticate();
      onClose();
    } else {
      setError(text.errorMessage[language]);
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
              {text.title[language]}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-[var(--text)]">
                  {text.passwordLabel[language]}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder={text.passwordPlaceholder[language]}
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
                {text.loginButton[language]}
              </button>

              <button
                type="button"
                onClick={() => setShowRecovery(true)}
                className="w-full py-2 text-sm text-[var(--blue)] hover:underline"
              >
                {text.forgotPassword[language]}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[var(--muted)] text-white font-semibold hover:opacity-90 transition-opacity mt-2"
              >
                {text.cancelButton[language]}
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
              {text.recoveryTitle[language]}
            </h2>
            <p className="text-center text-[var(--muted)] mb-6">
              {text.recoveryMessage[language]}
            </p>
            <button
              onClick={handleRecovery}
              className="w-full py-3 rounded-xl bg-[var(--green)] text-white font-semibold hover:opacity-90 transition-opacity mb-3"
            >
              {text.sendRecovery[language]}
            </button>
            <button
              onClick={() => setShowRecovery(false)}
              className="w-full py-3 rounded-xl bg-[var(--muted)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {text.backToLogin[language]}
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
              {text.recoverySentTitle[language]}
            </h2>
            <p className="text-center text-[var(--muted)]">
              {text.recoverySentMessage[language]}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
