// src/modules/settings/components/TeamsTab/TeamMemberModal.tsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { TeamMember } from '../../types';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => void;
  editMember?: TeamMember;
  mode: 'add' | 'edit' | 'view';
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editMember,
  mode
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Team Member'
  });

  useEffect(() => {
    if (editMember && (mode === 'edit' || mode === 'view')) {
      // Split the name into first and last name
      const nameParts = editMember.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData({
        firstName,
        lastName,
        email: editMember.email,
        phone: editMember.phone || '',
        role: editMember.role
      });
    } else {
      // Reset form when opening for add
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'Team Member'
      });
    }
  }, [editMember, isOpen, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine first and last name
    const memberData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      role: formData.role
    };
    
    onSubmit(memberData);
    onClose();
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add Team Member' : mode === 'edit' ? 'Edit Team Member' : 'View Team Member';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                required
                disabled={isViewMode}
              />
            </div>
            
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex">
                <div className="w-1/5">
                  <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-2">
                    <span className="text-green-500">+234</span>
                  </div>
                </div>
                <div className="relative w-4/5">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA]"
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div> */}
            
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                disabled={isViewMode}
              >
                <option value="Administrator">Administrator</option>
                <option value="Team Member">Team Member</option>
                <option value="Manager">Manager</option>
              </select>
            </div> */}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            
            {!isViewMode && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition"
              >
                {mode === 'add' ? 'Create Member' : 'Save Changes'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberModal;