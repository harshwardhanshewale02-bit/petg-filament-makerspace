import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Camera,
  Upload,
  RefreshCw,
  Check,
  Info,
  Edit2,
  X,
  FileImage,
  Sparkles
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { teamMembers as defaultMembers } from '../data/projectData';
import SmartImage from './SmartImage';

export default function TeamSection() {
  const [members, setMembers] = useState(() => {
    // Load persisted members and photos from localStorage if available
    try {
      const savedMembers = localStorage.getItem('pet2filament_team_members');
      if (savedMembers) {
        return JSON.parse(savedMembers);
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
    return defaultMembers;
  });

  const [editingMember, setEditingMember] = useState(null);
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [notification, setNotification] = useState(null);
  const fileInputRefs = useRef({});

  // Show temporary toast message
  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle uploading photo for a specific member
  const handlePhotoUpload = (memberId, event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      const updated = members.map((m) => {
        if (m.id === memberId) {
          return { ...m, photo: base64Data, customPhoto: true };
        }
        return m;
      });
      setMembers(updated);
      try {
        localStorage.setItem('pet2filament_team_members', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage quota limit reached:', err);
      }
      showToast(`Photo updated for ${members.find((m) => m.id === memberId)?.name || 'member'}!`);
    };
    reader.readAsDataURL(file);
  };

  // Reset member photo to default
  const handleResetPhoto = (memberId) => {
    const defaultM = defaultMembers.find((m) => m.id === memberId);
    const updated = members.map((m) => {
      if (m.id === memberId) {
        return { ...m, photo: defaultM ? defaultM.photo : '', customPhoto: false };
      }
      return m;
    });
    setMembers(updated);
    try {
      localStorage.setItem('pet2filament_team_members', JSON.stringify(updated));
    } catch (err) {}
    showToast('Photo reset to default path.');
  };

  // Save edited member details
  const handleSaveMemberDetails = (e) => {
    e.preventDefault();
    if (!editingMember) return;

    const updated = members.map((m) =>
      m.id === editingMember.id ? editingMember : m
    );
    setMembers(updated);
    try {
      localStorage.setItem('pet2filament_team_members', JSON.stringify(updated));
    } catch (err) {}
    setEditingMember(null);
    showToast('Member details updated successfully!');
  };

  return (
    <section id="team" className="py-24 bg-slate-950/80 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Project Contributors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            A 4-member student engineering team collaborating across mechanical CAD, thermal electronics, extrusion mechanics, and 3D print validation.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Real Photo Upload Guide & Instructions Banner */}
        <div className="mb-12 p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Add or Change Team Member Photos</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
                    Live Upload Available
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Click the <strong>camera button</strong> or <strong>“Upload Photo”</strong> on any member card to choose a photo directly from your device. It will preview instantly with high-res circular cropping!
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-1">
                  Permanent folder: <code className="text-emerald-400 font-mono">public/images/team/member1.jpg</code> to <code className="text-emerald-400 font-mono">member4.jpg</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Exactly 4 Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <div
              key={member.id}
              className="group p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col items-center text-center shadow-xl relative overflow-hidden"
            >
              {/* Member Number Badge */}
              <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500">
                0{idx + 1}
              </div>

              {/* Edit Member Info Button */}
              <button
                onClick={() => setEditingMember(member)}
                className="absolute top-4 left-4 p-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                title="Edit member details"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              {/* Hidden file input for this member */}
              <input
                type="file"
                ref={(el) => (fileInputRefs.current[member.id] = el)}
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoUpload(member.id, e)}
              />

              {/* Photo Frame with Camera Upload Overlay */}
              <div className="relative w-32 h-32 mb-4 rounded-full p-1 bg-gradient-to-tr from-emerald-500/30 via-slate-700/50 to-cyan-500/30 group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative group/avatar">
                  <SmartImage
                    src={member.photo}
                    alt={member.name}
                    type="team"
                    placeholderText="Click upload to add photo"
                    initials={`M0${idx + 1}`}
                    aspectRatio="aspect-square"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Camera overlay button on hover */}
                  <button
                    onClick={() => fileInputRefs.current[member.id]?.click()}
                    className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-emerald-400 text-xs gap-1 cursor-pointer"
                    title="Upload / Change Photo"
                  >
                    <Camera className="w-6 h-6" />
                    <span className="text-[10px] font-mono font-bold text-white">Change</span>
                  </button>
                </div>
              </div>

              {/* Upload Photo Button */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => fileInputRefs.current[member.id]?.click()}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-semibold transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3 h-3" />
                  <span>{member.customPhoto ? 'Change Photo' : 'Upload Photo'}</span>
                </button>
                {member.customPhoto && (
                  <button
                    onClick={() => handleResetPhoto(member.id)}
                    className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 text-[10px]"
                    title="Reset to default"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Name & Role */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {member.name}
              </h3>
              
              <div className="text-xs font-semibold text-cyan-400 mb-2 font-mono leading-snug">
                {member.role}
              </div>

              <div className="text-[11px] text-slate-400 font-mono mb-4 px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800">
                {member.prn}
              </div>

              {/* Contribution summary */}
              <p className="text-xs text-slate-300 leading-relaxed mb-6 flex-grow">
                {member.contribution}
              </p>

              {/* Social / Portfolio Links Placeholders */}
              <div className="pt-4 border-t border-slate-800/80 w-full flex items-center justify-center gap-3 text-slate-400">
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} LinkedIn`}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors border border-slate-800"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={member.github}
                  aria-label={`${member.name} GitHub`}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors border border-slate-800"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for editing Member Details */}
        {editingMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <button
                onClick={() => setEditingMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-emerald-400" />
                <span>Edit Team Member Details</span>
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Update name, role, PRN, or contributions directly for your presentation.
              </p>

              <form onSubmit={handleSaveMemberDetails} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Role / Specialization</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">PRN / Roll Number</label>
                  <input
                    type="text"
                    value={editingMember.prn}
                    onChange={(e) => setEditingMember({ ...editingMember, prn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Key Contribution</label>
                  <textarea
                    rows={3}
                    value={editingMember.contribution}
                    onChange={(e) => setEditingMember({ ...editingMember, contribution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
