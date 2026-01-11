'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  show: boolean;
  message?: string;
}

export default function Toast({ show, message }: ToastProps) {
  const { language } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const defaultMessage = language === 'en' ? 'Saved successfully' : 'تم الحفظ بنجاح';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast fixed bottom-6 right-6 bg-[#4BB484] text-white py-3.5 px-5 rounded-[14px] z-[100] shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          {message || defaultMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
