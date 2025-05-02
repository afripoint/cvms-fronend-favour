// // src/modules/settings/components/TeamsTab/TeamMemberRow.tsx
// import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
// import { TeamMember } from '../../types';


// interface TeamMemberRowProps {
//   member: TeamMember;
// }

// const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ member }) => {
//   return (
//     <tr className=" border-t border-gray-200">
//       <td className="py-4 px-4">
//         <div className="flex items-center">
//           <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3 text-purple-600 font-medium">
//             {member.initials || member.name.split(' ').map(n => n[0]).join('')}
//           </div>
//           <span>{member.name}</span>
//         </div>
//       </td>
//       <td className="py-4 px-6 text-gray-600">{member.email}</td>
//       <td className="py-4 px-6 text-gray-600">{member.role}</td>
//       <td className="py-4 px-6 text-gray-600">{member.lastLogin || 'Never'}</td>
//       <td className="py-4 px-6">
//         <span className={`inline-flex items-center ${
//           member.status === 'Active' 
//             ? 'bg-green-100 text-green-600' 
//             : 'bg-gray-100 text-gray-600'
//           } text-xs px-3 py-1 rounded-full`}>
//           • {member.status}
//         </span>
//       </td>
//       <td className="py-4 px-4">
//         <div className="flex space-x-2">
//           <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
//             <FiEye size={16} />
//           </button>
//           <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
//             <FiEdit2 size={20} />
//           </button>
//           <button className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100">
//             <FiTrash2 size={20} />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default TeamMemberRow;




// src/modules/settings/components/TeamsTab/TeamMemberRow.tsx
// src/modules/settings/components/TeamsTab/TeamMemberRow.tsx
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { TeamMember } from '../../types';

interface TeamMemberRowProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: number) => void;
  onView: (member: TeamMember) => void;
}

const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ 
  member, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  return (
    <tr className="border-t border-gray-200">
      <td className="py-4 px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3 text-purple-600 font-medium">
            {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span>{member.name}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-600">{member.email}</td>
      {/* <td className="py-4 px-6 text-gray-600">{member.role}</td>
      <td className="py-4 px-6 text-gray-600">{member.phone || 'N/A'}</td> */}
      <td className="py-4 px-6 text-gray-600">{member.lastLogin || 'Never'}</td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center ${
          member.status === 'Active' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-gray-100 text-gray-600'
          } text-xs px-3 py-1 rounded-full`}>
          • {member.status}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex space-x-2">
          <button 
            className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
            onClick={() => onView(member)}
            title="View details"
          >
            <FiEye size={16} />
          </button>
          <button 
            className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
            onClick={() => onEdit(member)}
            title="Edit member"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100"
            onClick={() => onDelete(member.id)}
            title="Delete member"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TeamMemberRow;