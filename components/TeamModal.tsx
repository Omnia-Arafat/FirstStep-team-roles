'use client';

import { useState, useEffect, useRef } from 'react';
import { TeamMember } from '@/types/team';
import { useApp } from '@/contexts/AppContext';
import { X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: (memberId: string) => void;
}

export default function TeamModal({ member, isOpen, onClose, onEdit, onDelete }: TeamModalProps) {
  const { language, isAdmin } = useApp();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const editButtonText = language === 'en' ? 'Edit Member' : 'تعديل العضو';
  const deleteButtonText = language === 'en' ? 'Delete Member' : 'حذف العضو';
  
  const handleDelete = () => {
    if (member && onDelete && confirm(language === 'en' ? 'Are you sure you want to delete this team member?' : 'هل أنت متأكد من حذف هذا العضو؟')) {
      onDelete(member.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          className="modal fixed inset-0 flex items-center justify-center bg-[var(--overlay)] z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-[var(--card)] w-[460px] max-w-full max-h-[85vh] rounded-[18px] p-7 relative flex flex-col"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[var(--text)] hover:text-[var(--red)] z-10 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="overflow-y-auto overflow-x-hidden pr-2" style={{ maxHeight: 'calc(85vh - 140px)' }}>
          <h2 className="text-2xl font-bold mb-4">
            {member.name[language]}
          </h2>
          <p className="mb-4 text-[var(--muted)]">
            {member.desc[language]}
          </p>
          <ul className="list-disc pl-5 space-y-2">
            {member.details[language].map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        {isAdmin && (
          <div className="mt-5 flex gap-3">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 py-3.5 rounded-2xl bg-[#4BB484] text-white border-none font-semibold cursor-pointer hover:opacity-90 transition-opacity"
              >
                {editButtonText}
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="px-4 py-3.5 rounded-2xl bg-[#B92C28] text-white border-none font-semibold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2"
                title={deleteButtonText}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
