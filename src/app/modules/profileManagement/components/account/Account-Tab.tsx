// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserData, submitCac } from '../../redux/actions';
// import { 
//   selectUserData, 
//   selectIsBusinessAccount,
//   selectCacSubmitted
// } from '../../redux/selectors';

// import { FiMail, FiMapPin, FiEdit, FiSave } from 'react-icons/fi';
// import ProfileImageUpload from '../file-management.tsx/file-upload';

// import { AccountType } from '../../types';
// import CACUpload from '../file-management.tsx/Cac-Upload';

// const AccountTab = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector(selectUserData);
//   const isBusinessAccount = useSelector(selectIsBusinessAccount);
//   const cacSubmitted = useSelector(selectCacSubmitted);
  
//   // Ensure CAC upload is shown for Company accounts, regardless of the Redux state
//   const shouldShowCacUpload = isBusinessAccount || userData.accountType === 'Company';
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [additionalPhone, setAdditionalPhone] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsEditing(false);
//     alert('Profile updated successfully!');
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     dispatch(updateUserData({ [name]: value }));
//   };

//   const handleAdditionalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAdditionalPhone(e.target.value);
//   };

//   const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value as AccountType;
//     dispatch(updateUserData({ accountType: value }));
    
//     // Optionally force a re-render to ensure CAC component visibility updates
//     // This helps if the Redux state update doesn't trigger a re-render
//     if (value === 'Company') {
//       setIsEditing(isEditing);  // This is a trick to force re-render
//     }
//   };

//   const toggleEdit = () => {
//     if (isEditing) {
//       // If we're currently editing, this is a save action
//       alert('Profile updated successfully!');
//     }
//     setIsEditing(!isEditing);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <ProfileImageUpload />
      
//       <div className="m-auto w-[450px] border-t-2 border-gray-200 pt-8 mt-6"></div>
      
//       <div className="max-w-md m-auto space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Account Type (Demo Selector)</label>
//           <select
//             onChange={handleAccountTypeChange}
//             value={userData.accountType}
//             disabled={!isEditing}
//             className={`w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
//           >
//             <option value="Individual User">Individual User</option>
//             <option value="Agent">Agent</option>
//             <option value="Company">Company</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <img src="/icons/users.svg" alt="" />
//             </div> 
//             <input
//               type="text"
//               name="accountType"
//               value={userData.accountType}
//               className="pl-10 w-full py-2 px-4 bg-[#F5F7FA] border border-gray-300 rounded-md cursor-not-allowed opacity-75"
//               readOnly
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone Number</label>
//           <div className="flex">
//             <div className="w-1/5">
//               <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-2">
//                 <span className="text-green-500"><img src="/icons/flag.svg" alt="" /></span>
//                 <span className="ml-1 text-gray-600">+234</span>
//               </div>
//             </div>
//             <div className="relative w-4/5">
//               <input
//                 type="text"
//                 name="phone"
//                 value={userData.phone}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Additional Phone Number (Optional)</label>
//           <div className="flex">
//             <div className="w-1/5">
//               <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-2">
//                 <span className="text-green-500"><img src="/icons/flag.svg" alt="" /></span>
//                 <span className="ml-1 text-gray-600">+234</span>
//               </div>
//             </div>
//             <div className="relative w-4/5">
//               <input
//                 type="text"
//                 name="additionalPhone"
//                 value={additionalPhone}
//                 onChange={handleAdditionalPhoneChange}
//                 disabled={!isEditing}
//                 placeholder="Enter additional phone number"
//                 className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiMail className="text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] cursor-not-allowed opacity-75"
//               readOnly
//             />
//           </div>
//           <p className="text-xs text-gray-500 mt-1 ml-2">Email address cannot be changed</p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiMapPin className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="address"
//               value={userData.address}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
//             />
//           </div>
//         </div>

//         {shouldShowCacUpload && (
//           <div>
//             <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
//             <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document</p>
//             <CACUpload
//               onUpload={(file: File) => {
//                 console.log('File uploaded:', file);
//                 dispatch(submitCac(file.name));
//                 alert('CAC document uploaded successfully!');
//               }} 
//             />
//             {cacSubmitted && (
//               <p className="text-sm text-green-500 mt-2">✓ CAC document submitted successfully</p>
//             )}
//           </div>
//         )}

//         <div className="pt-4">
//           <button
//             type="button"
//             onClick={toggleEdit}
//             className={`w-full py-3 flex items-center justify-center ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition`}
//           >
//             {isEditing ? (
//               <>
//                 <FiSave className="mr-2" /> Save Changes
//               </>
//             ) : (
//               <>
//                 <FiEdit className="mr-2" /> Edit Profile
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AccountTab;





import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, submitCac } from '../../redux/actions';
import { 
  selectUserData, 
  selectIsBusinessAccount,
  selectCacSubmitted
} from '../../redux/selectors';

import { FiMail, FiMapPin, FiEdit, FiSave } from 'react-icons/fi';
import ProfileImageUpload from '../file-management.tsx/file-upload';

import { AccountType } from '../../types';
import CACUpload from '../file-management.tsx/Cac-Upload';
import Status from '../file-management.tsx/Status-Upload';
import Authorization from '../file-management.tsx/Authorization-upload';

const AccountTab = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const isBusinessAccount = useSelector(selectIsBusinessAccount);
  const cacSubmitted = useSelector(selectCacSubmitted);
  
  // Ensure CAC upload is shown for Company accounts, regardless of the Redux state
  const shouldShowCacUpload = isBusinessAccount || userData.accountType === 'Company';
  const shouldletterUpload = isBusinessAccount || userData.accountType === 'Company';
  const shouldStatusUpload = isBusinessAccount || userData.accountType === 'Company';
  
  const [isEditing, setIsEditing] = useState(false);
  const [additionalPhone, setAdditionalPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateUserData({ [name]: value }));
  };

  const handleAdditionalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalPhone(e.target.value);
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AccountType;
    dispatch(updateUserData({ accountType: value }));
    
    // Optionally force a re-render to ensure CAC component visibility updates
    if (value === 'Company') {
      setIsEditing(isEditing);  // This is a trick to force re-render
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // If we're currently editing, this is a save action
      alert('Profile updated successfully!');
    }
    setIsEditing(!isEditing);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProfileImageUpload />
      
      <div className="mx-auto w-full max-w-[450px] border-t-2 border-gray-200 pt-8 mt-6"></div>
      
      <div className="w-full max-w-md mx-auto px-4 sm:px-0 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type (Demo Selector)</label>
          <select
            onChange={handleAccountTypeChange}
            value={userData.accountType}
            disabled={!isEditing}
            className={`w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
          >
            <option value="Individual User">Individual User</option>
            <option value="Agent">Agent</option>
            <option value="Company">Company</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/icons/users.svg" alt="" />
            </div> 
            <input
              type="text"
              name="accountType"
              value={userData.accountType}
              className="pl-10 w-full py-2 px-4 bg-[#F5F7FA] border border-gray-300 rounded-md cursor-not-allowed opacity-75"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone Number</label>
          <div className="flex">
            <div className="w-1/4 sm:w-1/5">
              <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
                <span className="text-green-500"><img src="/icons/flag.svg" alt="" /></span>
                <span className="ml-1 text-gray-600 text-sm sm:text-base">+234</span>
              </div>
            </div>
            <div className="relative w-3/4 sm:w-4/5">
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Phone Number (Optional)</label>
          <div className="flex">
            <div className="w-1/4 sm:w-1/5">
              <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
                <span className="text-green-500"><img src="/icons/flag.svg" alt="" /></span>
                <span className="ml-1 text-gray-600 text-sm sm:text-base">+234</span>
              </div>
            </div>
            <div className="relative w-3/4 sm:w-4/5">
              <input
                type="text"
                name="additionalPhone"
                value={additionalPhone}
                onChange={handleAdditionalPhoneChange}
                disabled={!isEditing}
                placeholder="Enter additional phone number"
                className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] cursor-not-allowed opacity-75"
              readOnly
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-2">Email address cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
            />
          </div>
        </div>

        {shouldletterUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
            <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document</p>
            <Authorization
              onUpload={(file: File) => {
                console.log('File uploaded:', file);
                dispatch(submitCac(file.name));
                alert('CAC document uploaded successfully!');
              }} 
            />
            {cacSubmitted && (
              <p className="text-sm text-green-500 mt-2">✓ CAC document submitted successfully</p>
            )}
          </div>
        )}

        {shouldStatusUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Upload a letter of authorization signed by your </h3>
            <p className="text-sm text-gray-500 mb-3">company’s secretary or director.</p>
            <Status
              onUpload={(file: File) => {
                console.log('File uploaded:', file);
                dispatch(submitCac(file.name));
                alert('Status Certificate uploaded successfully!');
              }} 
            />
            {cacSubmitted && (
              <p className="text-sm text-green-500 mt-2">✓ Status Certificate submitted successfully</p>
            )}
          </div>
        )}

        {shouldShowCacUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
            <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document</p>
            <CACUpload
              onUpload={(file: File) => {
                console.log('File uploaded:', file);
                dispatch(submitCac(file.name));
                alert('CAC document uploaded successfully!');
              }} 
            />
            {cacSubmitted && (
              <p className="text-sm text-green-500 mt-2">✓ CAC document submitted successfully</p>
            )}
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={toggleEdit}
            className={`w-full py-3 flex items-center justify-center ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition`}
          >
            {isEditing ? (
              <>
                <FiSave className="mr-2" /> Save Changes
              </>
            ) : (
              <>
                <FiEdit className="mr-2" /> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountTab;