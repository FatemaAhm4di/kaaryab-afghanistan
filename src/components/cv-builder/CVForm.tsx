'use client';

import { useState } from 'react';
import { CVData } from '@/types/cv';
import { Plus, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type CVFormProps = {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
};

const inputClass =
  'w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]';

export function CVForm({ data, onChange }: CVFormProps) {
  const t = useTranslations('cv');
  const [activeSection, setActiveSection] = useState<string>('personal');

  const updatePersonal = (field: string, value: string) => {
    onChange({
      personal: { ...data.personal, [field]: value },
    });
  };

  const addSkill = () => {
    const skill = prompt(t('enterSkill'));
    if (skill?.trim()) {
      onChange({ skills: [...data.skills, skill.trim()] });
    }
  };

  const removeSkill = (index: number) => {
    onChange({ skills: data.skills.filter((_, i) => i !== index) });
  };

  const addExperience = () => {
    onChange({
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ experience: updated });
  };

  const removeExperience = (index: number) => {
    onChange({ experience: data.experience.filter((_, i) => i !== index) });
  };

  const addEducation = () => {
    onChange({
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string | boolean) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ education: updated });
  };

  const removeEducation = (index: number) => {
    onChange({ education: data.education.filter((_, i) => i !== index) });
  };

  const sections = [
    { id: 'personal', label: t('personalInfo') },
    { id: 'skills', label: t('skills') },
    { id: 'experience', label: t('experience') },
    { id: 'education', label: t('education') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeSection === section.id
                ? 'bg-[#09637e] text-white'
                : 'border border-[#d1eef2] text-[#09637e] hover:bg-[#d1eef2]'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {activeSection === 'personal' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('firstName')}</label>
              <input
                type="text"
                placeholder={t('firstNamePlaceholder')}
                value={data.personal.firstName}
                onChange={(e) => updatePersonal('firstName', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('lastName')}</label>
              <input
                type="text"
                placeholder={t('lastNamePlaceholder')}
                value={data.personal.lastName}
                onChange={(e) => updatePersonal('lastName', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('titleLabel')}</label>
            <input
              type="text"
              placeholder={t('titlePlaceholder')}
              value={data.personal.title}
              onChange={(e) => updatePersonal('title', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('email')}</label>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              value={data.personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('phone')}</label>
            <input
              type="text"
              placeholder={t('phonePlaceholder')}
              value={data.personal.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('address')}</label>
            <input
              type="text"
              placeholder={t('addressPlaceholder')}
              value={data.personal.address}
              onChange={(e) => updatePersonal('address', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('website')}</label>
              <input
                type="text"
                placeholder={t('websitePlaceholder')}
                value={data.personal.website || ''}
                onChange={(e) => updatePersonal('website', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('linkedin')}</label>
              <input
                type="text"
                placeholder={t('linkedinPlaceholder')}
                value={data.personal.linkedin || ''}
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('github')}</label>
            <input
              type="text"
              placeholder={t('githubPlaceholder')}
              value={data.personal.github || ''}
              onChange={(e) => updatePersonal('github', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('summary')}</label>
            <textarea
              rows={4}
              placeholder={t('summaryPlaceholder')}
              value={data.summary}
              onChange={(e) => onChange({ summary: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>
        </motion.div>
      )}

      {activeSection === 'skills' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-1 rounded-full bg-[#d1eef2] px-3 py-1 text-xs font-medium text-[#09637e]"
              >
                {skill}
                <button onClick={() => removeSkill(index)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={addSkill}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e] transition hover:bg-[#d1eef2]"
          >
            <Plus size={16} />
            {t('addSkill')}
          </motion.button>
        </motion.div>
      )}

      {activeSection === 'experience' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {data.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl border border-[#d1eef2] bg-white p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-[#09637e]">{t('experience')} #{index + 1}</h4>
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('company')}</label>
                    <input
                      type="text"
                      placeholder={t('companyPlaceholder')}
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('position')}</label>
                    <input
                      type="text"
                      placeholder={t('positionPlaceholder')}
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('startDate')}</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('endDate')}</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      className={`${inputClass} ${exp.current ? 'opacity-50' : ''}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#374151]">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                      className="rounded border-[#d1eef2]"
                    />
                    {t('currentlyWorking')}
                  </label>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#374151]">{t('description')}</label>
                  <textarea
                    rows={2}
                    placeholder={t('descPlaceholder')}
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={addExperience}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e] transition hover:bg-[#d1eef2]"
          >
            <Plus size={16} />
            {t('addExperience')}
          </motion.button>
        </motion.div>
      )}

      {activeSection === 'education' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {data.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl border border-[#d1eef2] bg-white p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-[#09637e]">{t('education')} #{index + 1}</h4>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('institution')}</label>
                    <input
                      type="text"
                      placeholder={t('institutionPlaceholder')}
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('degree')}</label>
                    <input
                      type="text"
                      placeholder={t('degreePlaceholder')}
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#374151]">{t('fieldOfStudy')}</label>
                  <input
                    type="text"
                    placeholder={t('fieldPlaceholder')}
                    value={edu.field}
                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('startDate')}</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#374151]">{t('endDate')}</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      disabled={edu.current}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      className={`${inputClass} ${edu.current ? 'opacity-50' : ''}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#374151]">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                      className="rounded border-[#d1eef2]"
                    />
                    {t('currentlyStudying')}
                  </label>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={addEducation}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e] transition hover:bg-[#d1eef2]"
          >
            <Plus size={16} />
            {t('addEducation')}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}