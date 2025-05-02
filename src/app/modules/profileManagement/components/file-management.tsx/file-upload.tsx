// import { FiUser } from 'react-icons/fi';
// import { useSelector } from 'react-redux';
// import { selectUserData } from '../../redux/selectors';

// const ProfileImageUpload = () => {
//   const userData = useSelector(selectUserData);

//   return (
//     <div className="flex flex-row justify-start ml-48 space-x-4 items-center mb-8">
//       <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
//         {userData.profilePicture ? (
//           <img
//             src={userData.profilePicture}
//             alt="Profile"
//             className="w-full h-full rounded-full object-cover"
//           />
//         ) : (
//           <FiUser size={30} className="text-gray-400" />
//         )}
//       </div>
//       <div className="text-left">
//         <h3 className="font-medium">Upload Image</h3>
//         <p className="text-sm text-gray-500">Min 400x400px, PNG or JPEG</p>
//         <button
//           type="button"
//           className="mt-2 px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
//         >
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileImageUpload;




import { useState, ChangeEvent } from 'react';
import { FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData } from '../../redux/selectors';
import { updateUserData } from '../../redux/actions';

const ProfileImageUpload = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file type
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        alert('Please select a JPEG or PNG image only');
        return;
      }
      
      // Create an image object to check dimensions
      const img = new Image();
      img.onload = () => {
        if (img.width < 400 || img.height < 400) {
          alert('Image must be at least 400x400 pixels');
          return;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should not exceed 5MB');
          return;
        }
        
        setSelectedImage(file);
        
        // Create a URL for the image and update the user data
        const imageUrl = URL.createObjectURL(file);
        dispatch(updateUserData({ profilePicture: imageUrl }));
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <div className="flex flex-row justify-start ml-64 space-x-4 items-center mb-8">
      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
        {userData.profilePicture ? (
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FiUser size={30} className="text-gray-400" />
        )}
      </div>
      <div className="text-left">
        <h3 className="font-medium">Upload Image</h3>
        <p className="text-sm text-gray-500">Min 400x400px, PNG or JPEG</p>
        <input
          type="file"
          id="profile-image"
          className="hidden"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
        />
        <label
          htmlFor="profile-image"
          className="inline-block mt-2 px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
        >
          Upload
        </label>
        {selectedImage && (
          <p className="mt-1 text-xs text-green-500">
            Selected: {selectedImage.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpload;