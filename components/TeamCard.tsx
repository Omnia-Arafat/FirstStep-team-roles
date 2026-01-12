'use client';

import { TeamMember, RoleType } from '@/types/team';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface TeamCardProps {
  member: TeamMember;
  onClick: () => void;
  index: number;
}

const roleColors: Record<RoleType, string> = {
  owner: '#B92C28',
  cto: '#3f6cff',
  pm: '#4BB484',
  design: '#8e24aa',
  frontend: '#039be5',
  backend: '#5e35b1',
  mobile: '#fb8c00',
  support: '#7cb342',
};

const roleOverlayColors: Record<RoleType, string> = {
  owner: 'rgba(185,44,40,0.9)',
  cto: 'rgba(63,108,255,0.9)',
  pm: 'rgba(75,180,132,0.9)',
  design: 'rgba(142,36,170,0.9)',
  frontend: 'rgba(3,155,229,0.9)',
  backend: 'rgba(94,53,177,0.9)',
  mobile: 'rgba(251,140,0,0.9)',
  support: 'rgba(124,179,66,0.9)',
};

export default function TeamCard({ member, onClick, index }: TeamCardProps) {
  const { isAdmin } = useApp();
  const { t, language } = useTranslation();

  const overlayText = isAdmin ? t('teamCard.clickToEdit') : t('teamCard.viewDetails');

  return (
    <motion.div
      onClick={onClick}
      className="relative bg-[var(--card)] rounded-[18px] p-6 cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.2)] group"
      data-role={member.roleType}
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.03,
        y: -5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-xl font-bold">{member.name[language]}</div>
      <div
        className="inline-block px-3.5 py-1.5 rounded-[14px] text-[13px] my-2.5 text-white"
        style={{ background: roleColors[member.roleType] }}
      >
        {member.role[language]}
      </div>
      <div className="text-sm text-[var(--muted)]">{member.desc[language]}</div>
      
      {/* Hover overlay */}
      <div
        className="absolute inset-0 rounded-[18px] flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: roleOverlayColors[member.roleType] }}
      >
        {overlayText}
      </div>
    </motion.div>
  );
}
