// // src/modules/settings/components/TeamsTab/TeamMemberView.tsx
// import { FiX } from 'react-icons/fi';
// import { TeamMember } from '../../types';

// interface TeamMemberViewProps {
//   member: TeamMember;
//   onClose: () => void;
// }

// const TeamMemberView = ({ member, onClose }: TeamMemberViewProps) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Member Details</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FiX size={24} />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center mr-4 text-purple-600 font-medium text-xl">
//               {member.initials || member.name.split(' ').map(n => n[0]).join('')}
//             </div>
//             <h3 className="text-lg font-medium">{member.name}</h3>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-medium">{member.email}</p>
//             </div>
            
//             {member.phone && (
//               <div>
//                 <p className="text-sm text-gray-500">Phone</p>
//                 <p className="font-medium">{member.phone}</p>
//               </div>
//             )}
            
//             <div>
//               <p className="text-sm text-gray-500">Role</p>
//               <p className="font-medium">{member.role}</p>
//             </div>
            
//             <div>
//               <p className="text-sm text-gray-500">Status</p>
//               <p className="font-medium">{member.status}</p>
//             </div>
            
//             <div>
//               <p className="text-sm text-gray-500">Last Login</p>
//               <p className="font-medium">{member.lastLogin || 'Never'}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamMemberView;