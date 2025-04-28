import { useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiPlusCircle } from 'react-icons/fi';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'Active' | 'Inactive';
  initials?: string;
}

const TeamsComponent = () => {
  // Mock team members data to match the image
  const [teamMembers, _setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Michael James',
      email: 'email@gmail.com',
      role: 'Admin',
      lastLogin: '2 mins ago',
      status: 'Active',
      initials: 'MJ'
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'email@gmail.com',
      role: 'Accountant',
      lastLogin: 'Last week',
      status: 'Active',
      initials: '' // Empty initials to show the gray circle
    },
    {
      id: 3,
      name: 'Willy Custin',
      email: 'email@gmail.com',
      role: 'Accountant',
      lastLogin: '06/01/2025',
      status: 'Active',
      initials: 'WC'
    }
  ]);

  const [_selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [_showEditPopup, setShowEditPopup] = useState(false);

  const handleCreateMember = () => {
    // Logic to open create member form
    console.log('Create new member');
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setShowEditPopup(true);
  };

  const getInitialsBackground = (initials: string) => {
    if (!initials) return 'bg-gray-200'; // Gray background for empty initials
    if (initials === 'MJ') return 'bg-purple-200 text-purple-700';
    if (initials === 'WC') return 'bg-gray-200 text-gray-700';
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-8 pb-2">
            <button className="px-4 text-gray-500">Account</button>
            <button className="px-4 text-gray-500">Wallet</button>
            <button className="px-4 text-gray-500">History</button>
            <button className="px-4 text-green-500 border-b-2 border-green-500">Teams</button>
          </div>
          <button 
            onClick={handleCreateMember}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center"
          >
            <FiPlusCircle className="mr-2" /> Create New Member
          </button>
        </div>
        
        <div className="mt-8 bg-white rounded-lg overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full ${getInitialsBackground(member.initials || '')} flex items-center justify-center`}>
                        {member.initials}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      • {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      {member.id === 1 && (
                        <div className="absolute ml-8 -mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          Edit
                        </div>
                      )}
                      <button className="text-gray-500 hover:text-gray-700">
                        <FiEye size={16} />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleEdit(member)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamsComponent;