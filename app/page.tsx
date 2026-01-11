'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types/team';
import { useApp } from '@/contexts/AppContext';
import Controls from '@/components/Controls';
import TeamGrid from '@/components/TeamGrid';
import TeamModal from '@/components/TeamModal';
import Toast from '@/components/Toast';
import AdminDialog from '@/components/AdminDialog';
import AddMemberDialog from '@/components/AddMemberDialog';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const text = {
  title: { en: 'First Step Team', ar: 'فريق First Step' },
  subtitle: {
    en: 'Click a card to view or edit responsibilities',
    ar: 'اضغط على البطاقة لعرض أو تعديل المهام',
  },
};

export default function Home() {
  const { language, isAdmin, toggleAdmin } = useApp();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    // Fetch team data from API
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
        setLoading(false);
      });
  }, []);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleSave = async (updatedMember: TeamMember) => {
    try {
      const response = await fetch(`/api/team/${updatedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember),
      });

      if (response.ok) {
        const updated = await response.json();
        setTeamMembers((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleAdminClick = () => {
    setShowAdminDialog(true);
  };

  const handleAdminAuthenticate = () => {
    toggleAdmin();
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 2000);
  };

  const handleAddOrUpdateMember = async (memberData: Omit<TeamMember, 'id'>) => {
    try {
      if (editingMember) {
        // Update existing member
        const response = await fetch(`/api/team/${editingMember.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editingMember.id, ...memberData }),
        });

        if (response.ok) {
          const updated = await response.json();
          setTeamMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
          showToastMessage(language === 'en' ? 'Member updated successfully!' : 'تم تحديث العضو بنجاح!');
          setEditingMember(null);
        }
      } else {
        // Add new member
        const response = await fetch('/api/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData),
        });

        if (response.ok) {
          const newMember = await response.json();
          setTeamMembers((prev) => [...prev, newMember]);
          showToastMessage(language === 'en' ? 'Member added successfully!' : 'تمت إضافة العضو بنجاح!');
        }
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      showToastMessage(language === 'en' ? 'Error saving member' : 'خطأ في حفظ العضو');
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      const response = await fetch(`/api/team/${memberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
        showToastMessage(language === 'en' ? 'Member deleted successfully!' : 'تم حذف العضو بنجاح!');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      showToastMessage(language === 'en' ? 'Error deleting member' : 'خطأ في حذف العضو');
    }
  };

  const handleEditClick = () => {
    if (selectedMember && isAdmin) {
      setEditingMember(selectedMember);
      setIsModalOpen(false);
      setShowAddDialog(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Controls onAdminClick={handleAdminClick} />
      <div className="max-w-[1300px] mx-auto px-5 py-12">
        <img
          src="https://firststep-app.com/assets/logos/complete_logo.svg"
          alt="First Step Logo"
          className="block mx-auto mb-5 w-[170px]"
        />
        <h1 className="text-center text-[var(--blue)] dark:text-[var(--green)] text-4xl font-bold mb-2">
          {text.title[language]}
        </h1>
        <p className="text-center text-[var(--muted)] mb-10">
          {text.subtitle[language]}
        </p>
        <TeamGrid members={teamMembers} onMemberClick={handleMemberClick} />
      </div>
      
      {/* Floating Add Button - Only visible for admin */}
      {isAdmin && (
        <motion.button
          onClick={() => setShowAddDialog(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[var(--green)] text-white shadow-2xl flex items-center justify-center z-30"
          title={language === 'en' ? 'Add Team Member' : 'إضافة عضو للفريق'}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Plus size={32} />
        </motion.button>
      )}

      <TeamModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={isAdmin ? handleEditClick : undefined}
        onDelete={isAdmin ? handleDeleteMember : undefined}
      />
      <AdminDialog
        isOpen={showAdminDialog}
        onClose={() => setShowAdminDialog(false)}
        onAuthenticate={handleAdminAuthenticate}
      />
      <AddMemberDialog
        isOpen={showAddDialog}
        onClose={() => {
          setShowAddDialog(false);
          setEditingMember(null);
        }}
        onSave={handleAddOrUpdateMember}
        editMember={editingMember}
      />
      <Toast show={showToast} message={toastMessage} />
    </>
  );
}
