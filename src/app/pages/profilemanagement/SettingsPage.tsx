// src/pages/SettingsPage.tsx
import { useState } from 'react';
import { FiUser, FiMail, FiCreditCard, FiMapPin, FiPlus, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MainLayout } from '../../modules/landing/components/layout';
import CACUpload from '../../modules/profileManagement/settings/components/UploadFile';

// Mock user data
const mockUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  phone: '9120 374 371',
  accountType: 'Individual User', // Can be 'Individual User', 'Agent', or 'Company'
  address: '10, Deji Makinde Street, Lagos State',
  nin: '', // Empty initially
  cac: '', // For Agent or Company accounts
  profilePicture: null
};

// Mock wallet data
const mockWalletData = {
  tier: 'SILVER',
  balance: '₦25,000',
  vinSearches: 23,
  vinSearchLimit: '(12 left)',
  transactions: [
    { 
      id: 1, 
      type: 'Silver plan subscription purchase', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM', 
      status: 'Successful' 
    },
    { 
      id: 2, 
      type: 'Silver plan subscription purchase', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM', 
      status: 'Successful' 
    },
    { 
      id: 3, 
      type: 'Silver plan subscription purchase', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM', 
      status: 'Failed' 
    },
  ]
};

// Mock search history data
const mockHistoryData = [
  { 
    id: 1, 
    type: 'VIN Search - 87153873877901313', 
    amount: '₦25,000', 
    date: '12/04/2025, 10:20 AM',
    status: 'Successful'
  },
  { 
    id: 2, 
    type: 'VIN Search - 87153873877901313', 
    amount: '₦25,000', 
    date: '12/04/2025, 10:20 AM',
    status: 'Successful'
  },
  { 
    id: 3, 
    type: 'Accredify', 
    amount: '₦25,000', 
    date: '12/04/2025, 10:20 AM',
    status: 'Successful'
  },
  { 
    id: 4, 
    type: 'VIN Search - 87153873877901313', 
    amount: '₦25,000', 
    date: '12/04/2025, 10:20 AM',
    status: 'Failed'
  },
  { 
    id: 5, 
    type: 'VIN Search - 87153873877901313', 
    amount: '₦25,000', 
    date: '12/04/2025, 10:20 AM',
    status: 'Failed'
  }
];

// Mock teams data
const mockTeamsData = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Administrator',
    email: 'john.smith@example.com',
    status: 'Active',
    lastLogin: 'Today, 10:30 AM', // Added lastLogin
    initials: 'JS' // Added initials
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Team Member',
    email: 'sarah.johnson@example.com',
    status: 'Active',
    lastLogin: 'Yesterday, 2:45 PM', // Added lastLogin
    initials: 'SJ' // Added initials
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Team Member',
    email: 'michael.brown@example.com',
    status: 'Inactive',
    lastLogin: 'Last week', // Added lastLogin
    initials: 'MB' // Added initials
  }
];
interface TeamMember {
    id: number;
    name: string;
    role: string;
    email: string;
    status: string;
    lastLogin?: string; // Optional property
    initials?: string; // Optional property
  }

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('History'); // Set to 'History' by default to match your image
  const [userData, setUserData] = useState(mockUserData);
  const [walletData, _setWalletData] = useState(mockWalletData);
  const [historyData, _setHistoryData] = useState(mockHistoryData);
//   const [teamsData, setTeamsData] = useState(mockTeamsData);
  const [ninSubmitted, setNinSubmitted] = useState(false);
  const [_cacSubmitted, setCacSubmitted] = useState(false);
  const [_teamsData, _setTeamsData] = useState<TeamMember[]>(mockTeamsData);

  // Check if account type is agent or company
  const isBusinessAccount = userData.accountType !== 'Individual User';

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  // Handle NIN submission
  const handleNinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.nin.trim()) {
      setNinSubmitted(true);
      alert('NIN submitted successfully!');
    }
  };

  // Handle CAC submission
//   const handleCacUpload = () => {
//     setCacSubmitted(true);
//     alert('CAC document uploaded successfully!');
//   };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle account type change (for demo purposes)
  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserData({ ...userData, accountType: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainLayout>
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto mb-8 mt-16 p-8 border rounded-lg shadow-sm">
          <div className="mb-8">
            <div className="flex space-x-8 w-fit mx-auto pb-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('Account')}
                className={`px-4 ${
                  activeTab === 'Account'
                    ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
                    : 'text-gray-500'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('Wallet')}
                className={`px-4 ${
                  activeTab === 'Wallet'
                    ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
                    : 'text-gray-500'
                }`}
              >
                Wallet
              </button>
              <button
                onClick={() => setActiveTab('History')}
                className={`px-4 ${
                  activeTab === 'History'
                    ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
                    : 'text-gray-500'
                }`}
              >
                History
              </button>
              {isBusinessAccount && (
                <button
                  onClick={() => setActiveTab('Teams')}
                  className={`px-4 ${
                    activeTab === 'Teams'
                      ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
                      : 'text-gray-500'
                  }`}
                >
                  Teams
                </button>
              )}
            </div>
          </div>

          {activeTab === 'Account' && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-start ml-48 space-x-4 items-center mb-8 ">
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
                  <button
                    type="button"
                    className="mt-2 px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div className="m-auto w-[450px] border-t-2 border-gray-200 pt-8 mt-6"></div>
              <div className="max-w-md m-auto space-y-6">
                {/* FOR DEMO ONLY: Option to change account type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type (Demo Selector)</label>
                  <select
                    onChange={handleAccountTypeChange}
                    value={userData.accountType}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
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
                      className="pl-10 w-full py-2 px-4 bg-[#F5F7FA] border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex">
                    <div className="w-1/5">
                      <div className="flex items-center border border-gray-300 rounded-l-md px-3 py-2">
                        <span className="text-green-500"><img src="/icons/flag.svg" alt="" /></span>
                        <span className="ml-1 text-gray-600">+234</span>
                      </div>
                    </div>
                    <div className="relative w-4/5">
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA]"
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
                      onChange={handleChange}
                      className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIN</label>
                  <form onSubmit={handleNinSubmit} className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCreditCard className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="nin"
                        value={userData.nin}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-l-md bg-[#F5F7FA]"
                        placeholder={ninSubmitted ? "NIN Verified" : "Enter your NIN"}
                        readOnly={ninSubmitted}
                      />
                    </div>
                    {!ninSubmitted && (
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#00000066] text-black rounded-r-md hover:bg-[#00000066] transition"
                      >
                        Submit
                      </button>
                    )}
                  </form>
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
                      className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
                    />
                  </div>
                </div>

                
                {isBusinessAccount && (
                <div>
                    <CACUpload
                    onUpload={(file: File) => {
                        // Handle the file upload here
                        console.log('File uploaded:', file);
                        setCacSubmitted(true);
                        alert('CAC document uploaded successfully!');
                    }} 
                    />
                </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500 text-black rounded-md hover:bg-green-600 transition"
                  >
                    {isBusinessAccount ? "Save changes" : "Edit profile"}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'Wallet' && (
            <div className="py-6 px-4">
              {/* Wallet Card */}
              <div className="bg-black rounded-lg p-6 max-w-md mx-auto mb-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-white bg-gray-700 px-3 py-1 rounded-full text-xs">
                      {walletData.tier}
                    </span>
                    <div className="text-white text-2xl font-bold mt-3">
                      {walletData.balance}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-800 to-black rounded-full h-10 w-10"></div>
                </div>
                <div className="flex items-center text-white mt-6">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{walletData.vinSearches} VIN Searches</span>
                  <span className="text-gray-400 text-sm ml-1">{walletData.vinSearchLimit}</span>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="max-w-md mx-auto">
                <h3 className="text-md font-medium mb-6 border-black border-b-2 text-black w-44">Recent Transactions</h3>
                
                <div className="max-w-md">
                  {walletData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-lg mb-4">
                      <div>
                        <h4 className="font-medium">{transaction.type}</h4>
                        <div className="text-gray-500 text-sm">
                          {transaction.amount} • {transaction.date}
                        </div>
                      </div>
                      <div>
                        {transaction.status === 'Successful' ? (
                          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                            • Successful
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                            • Failed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'History' && (
            <div className="py-6 px-4">
              {/* Search History Section */}
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-medium mb-6 border-b-2 border-black w-36 pb-2">Search History</h3>
                
                <div className="space-y-4">
                  {historyData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.type}</h4>
                        <div className="text-gray-500 text-sm">
                          {item.amount} • {item.date}
                        </div>
                      </div>
                      <div>
                        {item.status === 'Successful' ? (
                          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                            • Successful
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                            • Failed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* {activeTab === 'Teams' && isBusinessAccount && (
            <div className="py-6 px-4">
              {/* Teams Section */}
              {/* <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium border-b-2 border-black w-24 pb-2">Team Members</h3>
                  <button className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition">
                    Add Member
                  </button>
                </div>
                
                <div className="space-y-4">
                  {teamsData.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <div className="text-gray-500 text-sm">
                          {member.role} • {member.email}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {member.status === 'Active' ? (
                          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                            • Active
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            • Inactive
                          </span>
                        )}
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )} */} 


{activeTab === 'Teams' && (
  <div className="py-6  max-w-full">
    <div className="max-w-full mx-auto">
      <div className="flex justify-end items-center mb-6">
        <button 
          className="flex items-center px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition"
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
              <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Role</th>
              <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Last Login</th>
              <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Status</th>
              <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3 text-purple-600 font-medium">
                    MJ
                  </div>
                  <span>Michael James</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-600">email@gmail.com</td>
              <td className="py-4 px-6 text-gray-600">Admin</td>
              <td className="py-4 px-6 text-gray-600">2 mins ago</td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                  • Active
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                    <FiEye size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                    <FiEdit2 size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <FiUser className="text-gray-400" />
                  </div>
                  <span>John Doe</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-600">email@gmail.com</td>
              <td className="py-4 px-6 text-gray-600">Accountant</td>
              <td className="py-4 px-6 text-gray-600">Last week</td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                  • Active
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                    <FiEye size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                    <FiEdit2 size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3 text-blue-600 font-medium">
                    WC
                  </div>
                  <span>Willy Castin</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-600">email@gmail.com</td>
              <td className="py-4 px-6 text-gray-600">Accountant</td>
              <td className="py-4 px-6 text-gray-600">06/01/2025</td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                  • Active
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                    <FiEye size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
                    <FiEdit2 size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
        </div>
      </main>
      </MainLayout>
    </div>
  );
};

export default SettingsPage;