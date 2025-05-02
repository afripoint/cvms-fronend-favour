import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import { addTeamMember, updateTeamMember, deleteTeamMember } from '../../redux/actions';
import { selectTeamsData } from '../../redux/selectors';
import TeamMemberRow from './TeamMemberRow';
import TeamMemberModal from './TeamMemberModal';
import { TeamMember } from '../../types';

const TeamsTab = () => {
  const dispatch = useDispatch();
  const teamsData = useSelector(selectTeamsData);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentMember, setCurrentMember] = useState<TeamMember | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentMember(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setModalMode('edit');
    setCurrentMember(member);
    setIsModalOpen(true);
  };

  const openViewModal = (member: TeamMember) => {
    setModalMode('view');
    setCurrentMember(member);
    setIsModalOpen(true);
  };

  const handleAddMember = (memberData: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => {
    const newMember = {
      ...memberData,
      status: 'Active',
      lastLogin: 'Never'
    };
    
    dispatch(addTeamMember(newMember));
  };

  const handleUpdateMember = (memberData: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => {
    if (currentMember) {
      const updatedMember: TeamMember = {
        ...currentMember,
        ...memberData
      };
      
      dispatch(updateTeamMember(updatedMember));
    }
  };

  const handleDeleteMember = (id: number) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId !== null) {
      dispatch(deleteTeamMember(confirmDeleteId));
      setConfirmDeleteId(null);
    }
  };

  const handleSubmit = (memberData: Omit<TeamMember, 'id' | 'initials' | 'status' | 'lastLogin'>) => {
    if (modalMode === 'add') {
      handleAddMember(memberData);
    } else if (modalMode === 'edit') {
      handleUpdateMember(memberData);
    }
  };

  return (
    <div className="py-6 max-w-full">
      <div className="max-w-full mx-auto">
        <div className="flex justify-end items-center mb-6">
          <button 
            className="flex items-center px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition"
            onClick={openAddModal}
          >
            <FiPlus className="mr-2" /> Create New Member
          </button>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Email</th>
                {/* <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Role</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Phone</th> */}
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Last Login</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {teamsData.map(member => (
                <TeamMemberRow 
                  key={member.id} 
                  member={member} 
                  onEdit={openEditModal}
                  onDelete={handleDeleteMember}
                  onView={openViewModal}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Member Modal */}
        <TeamMemberModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editMember={currentMember}
          mode={modalMode}
        />
        
        {/* Delete Confirmation Modal */}
        {confirmDeleteId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete this team member? This action cannot be undone.</p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsTab;