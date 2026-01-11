'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TeamMember, RoleType } from '@/types/team';
import { X, UserPlus } from 'lucide-react';

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<TeamMember, 'id'>) => void;
  editMember?: TeamMember | null;
}

const roleTypes: { value: RoleType; label: { en: string; ar: string } }[] = [
  { value: 'owner', label: { en: 'Owner', ar: 'المالك' } },
  { value: 'cto', label: { en: 'CTO', ar: 'المدير التقني' } },
  { value: 'pm', label: { en: 'Project Manager', ar: 'مدير المشروع' } },
  { value: 'design', label: { en: 'Designer', ar: 'مصمم' } },
  { value: 'frontend', label: { en: 'Frontend Developer', ar: 'مطور واجهات' } },
  { value: 'backend', label: { en: 'Backend Developer', ar: 'مطور خلفي' } },
  { value: 'mobile', label: { en: 'Mobile Developer', ar: 'مطور تطبيقات' } },
  { value: 'support', label: { en: 'Support', ar: 'دعم' } },
];

export default function AddMemberDialog({ isOpen, onClose, onSave, editMember }: AddMemberDialogProps) {
  const { language } = useApp();
  
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    roleEn: '',
    roleAr: '',
    roleType: 'pm' as RoleType,
    descEn: '',
    descAr: '',
    detailsEn: '',
    detailsAr: '',
  });

  // Update form data when editMember changes
  useEffect(() => {
    if (editMember) {
      setFormData({
        nameEn: editMember.name.en,
        nameAr: editMember.name.ar,
        roleEn: editMember.role.en,
        roleAr: editMember.role.ar,
        roleType: editMember.roleType,
        descEn: editMember.desc.en,
        descAr: editMember.desc.ar,
        detailsEn: editMember.details.en.join('\n'),
        detailsAr: editMember.details.ar.join('\n'),
      });
    } else {
      setFormData({
        nameEn: '',
        nameAr: '',
        roleEn: '',
        roleAr: '',
        roleType: 'pm',
        descEn: '',
        descAr: '',
        detailsEn: '',
        detailsAr: '',
      });
    }
  }, [editMember, isOpen]);

  const text = {
    title: { en: editMember ? 'Edit Team Member' : 'Add Team Member', ar: editMember ? 'تعديل عضو الفريق' : 'إضافة عضو للفريق' },
    nameEn: { en: 'Name (English)', ar: 'الاسم (إنجليزي)' },
    nameAr: { en: 'Name (Arabic)', ar: 'الاسم (عربي)' },
    roleEn: { en: 'Role (English)', ar: 'المنصب (إنجليزي)' },
    roleAr: { en: 'Role (Arabic)', ar: 'المنصب (عربي)' },
    roleType: { en: 'Role Type', ar: 'نوع المنصب' },
    descEn: { en: 'Description (English)', ar: 'الوصف (إنجليزي)' },
    descAr: { en: 'Description (Arabic)', ar: 'الوصف (عربي)' },
    detailsEn: { en: 'Responsibilities (English, one per line)', ar: 'المهام (إنجليزي، واحد لكل سطر)' },
    detailsAr: { en: 'Responsibilities (Arabic, one per line)', ar: 'المهام (عربي، واحد لكل سطر)' },
    saveButton: { en: editMember ? 'Update' : 'Add Member', ar: editMember ? 'تحديث' : 'إضافة عضو' },
    cancelButton: { en: 'Cancel', ar: 'إلغاء' },
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newMember: Omit<TeamMember, 'id'> = {
      name: { en: formData.nameEn, ar: formData.nameAr },
      role: { en: formData.roleEn, ar: formData.roleAr },
      roleType: formData.roleType,
      desc: { en: formData.descEn, ar: formData.descAr },
      details: {
        en: formData.detailsEn.split('\n').filter(d => d.trim()),
        ar: formData.detailsAr.split('\n').filter(d => d.trim()),
      },
    };

    onSave(newMember);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nameEn: '',
      nameAr: '',
      roleEn: '',
      roleAr: '',
      roleType: 'pm',
      descEn: '',
      descAr: '',
      detailsEn: '',
      detailsAr: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--overlay)] z-[60] p-4">
      <div className="bg-[var(--card)] w-[600px] max-w-full max-h-[90vh] rounded-2xl p-6 relative flex flex-col shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[var(--text)] hover:text-[var(--red)] transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--blue)] flex items-center justify-center">
            <UserPlus size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text)]">
            {text.title[language]}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto overflow-x-hidden pr-2 flex-1">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.nameEn[language]}
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.nameAr[language]}
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none"
                  required
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                {text.roleType[language]}
              </label>
              <select
                value={formData.roleType}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value as RoleType })}
                className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none"
              >
                {roleTypes.map((rt) => (
                  <option key={rt.value} value={rt.value}>
                    {rt.label[language]}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.roleEn[language]}
                </label>
                <input
                  type="text"
                  value={formData.roleEn}
                  onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.roleAr[language]}
                </label>
                <input
                  type="text"
                  value={formData.roleAr}
                  onChange={(e) => setFormData({ ...formData, roleAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none"
                  required
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.descEn[language]}
                </label>
                <textarea
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none resize-none"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.descAr[language]}
                </label>
                <textarea
                  value={formData.descAr}
                  onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none resize-none"
                  rows={3}
                  required
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.detailsEn[language]}
                </label>
                <textarea
                  value={formData.detailsEn}
                  onChange={(e) => setFormData({ ...formData, detailsEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none resize-none"
                  rows={5}
                  placeholder="Line 1&#10;Line 2&#10;Line 3"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-[var(--text)]">
                  {text.detailsAr[language]}
                </label>
                <textarea
                  value={formData.detailsAr}
                  onChange={(e) => setFormData({ ...formData, detailsAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-[var(--muted)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--blue)] outline-none resize-none"
                  rows={5}
                  dir="rtl"
                  placeholder="السطر 1&#10;السطر 2&#10;السطر 3"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-[var(--muted)]">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[var(--blue)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {text.saveButton[language]}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl bg-[var(--muted)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {text.cancelButton[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
