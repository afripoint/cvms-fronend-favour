// import { useCallback, useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
// import { RootState, AppDispatch } from '../../../core/store';
// import { fetchReports } from '../redux/slices/certificateSlice';
// import { Footer, Header } from '../../landing/components/layout';
// import { generateCertificate } from '../services/certificateService';
// // Remove unused import
// // import { useVinSearch } from '../../vin';

// // This interface can be removed if not used elsewhere
// // interface SearchHistoryResponse {
// //   Search_histories: SearchHistory[];
// // }

// interface SearchHistory {
//   user: {
//       full_name: string;
//   };
//   vin: VinInfo | null;
//   cert_num: string;
//   status: string;
//   qr_code_base64: string;
//   slug: string;
//   created_at: string;
// }

// interface VinInfo {
//   vin: string | null;
//   brand: string | null;
//   vehicle_year: string | null;
//   vehicle_type: string | null;
//   payment_status: string | null;
//   origin_country: string | null;
// }

// const Certificate = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const location = useLocation();
//   // Remove unused variable
//   // const {vinNumber} = useVinSearch();
//   const { reports } = useSelector((state: RootState) => state.reports);
//   const { user } = useSelector((state: RootState) => state.auth);
  
//   // State to track if certificate was generated automatically
//   const [certificateGenerated, setCertificateGenerated] = useState(false);
//   const [allCertData, setAllCertData] = useState<SearchHistory[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     dispatch(fetchReports());
//   }, [dispatch]);
  
//   // Auto-generate certificate if coming from payment success
//   useEffect(() => {
//     const fromPayment = location.state?.fromPayment;
//     const vinFromPayment = location.state?.vin;
    
//     if (fromPayment && vinFromPayment && !certificateGenerated) {
//       const targetReport = reports.find(r => r.vin === vinFromPayment);
//       if (targetReport) {
//         handleDownloadCertificate(targetReport.vin);
//         setCertificateGenerated(true);
//       }
//     }
//   }, [reports, location, certificateGenerated]);

//   const handleDownloadAll = () => {
//     reports.forEach(report => {
//       if (report.downloadUrl) {
//         const link = document.createElement('a');
//         link.href = report.downloadUrl;
//         link.setAttribute('download', `${report.title.replace(/\s+/g, '-')}-${report.vin}.pdf`);
//         link.setAttribute('target', '_blank');
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       }
//     });
//   };

//   // Fetching all certificate data
//   const certificateFetching = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const accesstoken = localStorage.getItem("access_token");
//       if (!accesstoken) {
//         throw new Error('No access token found');
//       }
      
//       const response = await fetch('https://afridev.com.ng/vin/search-history/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accesstoken}`
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch search history: ${response.status}`);
//       }
      
//       const resData = await response.json();
      
//       if (resData?.Search_histories) {
//         setAllCertData(resData.Search_histories);
//       } else {
//         console.warn('No Search_histories found in response');
//         setAllCertData([]);
//       }
//     } catch (error) {
//       console.error('Error fetching certificate data:', error instanceof Error ? error.message : String(error));
//       setAllCertData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);
  
//   useEffect(() => {
//     certificateFetching();
//   }, [certificateFetching]);

//   // Update this function to handle undefined or null values
//   const handleDownloadCertificate = async (vin: string) => {
//     try {
//       const accesstoken = localStorage.getItem("access_token");
//       if (!accesstoken) {
//         throw new Error('No access token found');
//       }
      
//       const response = await fetch('https://afridev.com.ng/vin/search-history/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accesstoken}`
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch search history');
//       }
      
//       const resData = await response.json();
      
//       const vehicleRecord = resData.Search_histories.find((record: SearchHistory) => {
//         return (
//           (record.vin?.vin === vin) || 
//           (record.slug?.includes(vin))
//         );
//       });
      
//       if (!vehicleRecord) {
//         console.error('Vehicle record not found for VIN:', vin);
//         return;
//       }
      
//       const userData = {
//         fullName: vehicleRecord.user.full_name,
//         address: user?.address || ''
//       };
      
//       const certificateData = {
//         vin: vehicleRecord.vin?.vin || vin,
//         makeModel: vehicleRecord.vin?.brand || '',
//         year: vehicleRecord.vin?.vehicle_year || '',
//         certificateNumber: vehicleRecord.cert_num || '',
//         ownerName: userData.fullName,
//         ownerAddress: userData.address,
//         date: new Date().toLocaleDateString('en-GB', { 
//           day: '2-digit', 
//           month: 'short', 
//           year: 'numeric' 
//         })
//       };
      
//       generateCertificate(certificateData);
//     } catch (error) {
//       console.error('Error generating certificate:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
      
//       <main className="flex-grow container mx-auto px-4 py-4 mb-4 mt-12">
//         <nav className="md:ml-16 mt-6 md:mt-12 block w-full px-2 md:px-0">
//           <Link 
//             to="/" 
//             className="inline-flex items-center text-green-500 font-medium text-base py-2 hover:underline"
//             aria-label="Navigate back to home page"
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-5 w-5 mr-2" 
//               viewBox="0 0 20 20" 
//               fill="currentColor"
//             >
//               <path 
//                 fillRule="evenodd" 
//                 d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
//                 clipRule="evenodd" 
//               />
//             </svg>
//             Back to Home
//           </Link>
          
//           <h1 className="text-xl md:text-2xl font-bold mt-2 mb-2">Vehicle Certificates</h1>
//         </nav>
        
//         <div className="w-full max-w-3xl mx-auto bg-[#F2F2F7] p-3 sm:p-6 rounded-lg shadow-md">
//           <div className="flex justify-end mb-4">
//             {reports.length > 1 && (
//               <button 
//                 className="bg-green-500 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center"
//                 onClick={handleDownloadAll}
//               >
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
//                   viewBox="0 0 20 20" 
//                   fill="currentColor"
//                 >
//                   <path 
//                     fillRule="evenodd" 
//                     d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
//                     clipRule="evenodd" 
//                   />
//                 </svg>
//                 <span className="hidden sm:inline">Download All Documents</span>
//                 <span className="sm:hidden">Download All</span>
//               </button>
//             )}
//           </div>
          
//           <div className="space-y-4">
//             {reports.length === 0 && !isLoading && allCertData.length === 0 ? (
//               <div className="text-center py-8 sm:py-12">
//                 <div className="mb-4">📄</div>
//                 <h3 className="text-base sm:text-lg font-medium mb-2">No certificates or reports found</h3>
//                 <p className="text-sm sm:text-base text-gray-600">Your vehicle documents will appear here after purchase.</p>
//               </div>
//             ) : (
//               <>
//                 {isLoading ? (
//                   <div className="text-center py-8">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading your certificates...</p>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Report items from Redux store */}
//                     {reports.map((report) => (
//                       <div key={report.id} className="bg-white border rounded-lg p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50">
//                         <div className='flex space-x-2 items-center'>
//                           <img src="/images/fileVINSearch.svg" alt="" width={40} className="sm:w-[50px]" />
//                           <div>
//                             <h3 className="font-medium text-base sm:text-lg">{report.title}</h3>
//                             <p className="text-xs sm:text-sm text-gray-600">VIN: {report.vin}</p>
//                           </div>
//                         </div>
//                         {report.isCertificate ? (
//                           <button
//                             onClick={() => handleDownloadCertificate(report.vin)}
//                             className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center justify-center"
//                           >
//                             <svg 
//                               xmlns="http://www.w3.org/2000/svg" 
//                               className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
//                               viewBox="0 0 20 20" 
//                               fill="currentColor"
//                             >
//                               <path 
//                                 fillRule="evenodd" 
//                                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
//                                 clipRule="evenodd" 
//                               />
//                             </svg>
//                             Download Certificate
//                           </button>
//                         ) : (
//                           <a
//                             href={report.downloadUrl}
//                             download
//                             className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center justify-center"
//                           >
//                             <svg 
//                               xmlns="http://www.w3.org/2000/svg" 
//                               className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
//                               viewBox="0 0 20 20" 
//                               fill="currentColor"
//                             >
//                               <path 
//                                 fillRule="evenodd" 
//                                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
//                                 clipRule="evenodd" 
//                               />
//                             </svg>
//                             Download Report
//                           </a>
//                         )}
//                       </div>
//                     ))}

//                     {/* Items from direct API fetch */}
//                     {allCertData.length > 0 && allCertData.map((certData, index) => (
//                       <div 
//                         key={`certificate-${index}`} 
//                         className="bg-white border rounded-lg p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50"
//                       >
//                         <div className='flex space-x-2 items-center'>
//                           <img 
//                             src="/images/fileVINSearch.svg" 
//                             alt="VIN Search Certificate" 
//                             width={40}
//                             className="sm:w-[50px]"
//                           />
//                           <div>
//                             <h3 className="font-medium text-base sm:text-lg">VinSearch</h3>
//                             <p className="text-xs sm:text-sm text-gray-600">
//                               VIN: {certData.vin?.vin || 'N/A'}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600">
//                               Date: {certData.created_at ? new Date(certData.created_at).toLocaleDateString() : 'N/A'}
//                             </p>
//                           </div>
//                         </div>
                        
//                         <button
//                           onClick={() => {
//                             // Fix the type error by checking if the value exists and providing a fallback
//                             const vinValue = certData.vin?.vin || '';
//                             if (vinValue) {
//                               handleDownloadCertificate(vinValue);
//                             } else {
//                               console.error('No VIN available for this certificate');
//                             }
//                           }}
//                           className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center justify-center transition-colors"
//                           disabled={!certData.vin?.vin}
//                         >
//                           <svg 
//                             xmlns="http://www.w3.org/2000/svg" 
//                             className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
//                             viewBox="0 0 20 20" 
//                             fill="currentColor"
//                           >
//                             <path 
//                               fillRule="evenodd" 
//                               d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
//                               clipRule="evenodd" 
//                             />
//                           </svg>
//                           Download Certificate
//                         </button>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };
// export default Certificate;





import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../core/store';
import { fetchReports } from '../redux/slices/certificateSlice';
import { Footer, Header } from '../../landing/components/layout';
import { generateCertificate } from '../services/certificateService';
// Remove unused import
// import { useVinSearch } from '../../vin';

interface SearchHistory {
  user: {
      full_name: string;
  };
  vin: VinInfo | null;
  cert_num: string;
  status: string;
  qr_code_base64: string;
  slug: string;
  created_at: string;
}

interface VinInfo {
  vin: string | null;
  brand: string | null;
  vehicle_year: string | null;
  vehicle_type: string | null;
  payment_status: string | null;
  origin_country: string | null;
}

const Certificate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { reports } = useSelector((state: RootState) => state.reports);
  const { user } = useSelector((state: RootState) => state.auth);
  
  // State to track if certificate was generated automatically
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [allCertData, setAllCertData] = useState<SearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);
  
  // Auto-generate certificate if coming from payment success
  useEffect(() => {
    const fromPayment = location.state?.fromPayment;
    const vinFromPayment = location.state?.vin;
    
    if (fromPayment && vinFromPayment && !certificateGenerated) {
      const targetReport = reports.find(r => r.vin === vinFromPayment);
      if (targetReport) {
        handleDownloadCertificate(targetReport.vin);
        setCertificateGenerated(true);
      }
    }
  }, [reports, location, certificateGenerated]);

  const handleDownloadAll = () => {
    reports.forEach(report => {
      if (report.downloadUrl) {
        const link = document.createElement('a');
        link.href = report.downloadUrl;
        link.setAttribute('download', `${report.title.replace(/\s+/g, '-')}-${report.vin}.pdf`);
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  // Fetching all certificate data
  const certificateFetching = useCallback(async () => {
    try {
      setIsLoading(true);
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error('No access token found');
      }
      
      const response = await fetch('https://afridev.com.ng/vin/search-history/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch search history: ${response.status}`);
      }
      
      const resData = await response.json();
      
      if (resData?.Search_histories) {
        // Sort the search histories by creation date in descending order (newest first)
        const sortedHistories = [...resData.Search_histories].sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA; // Descending order
        });
        
        setAllCertData(sortedHistories);
      } else {
        console.warn('No Search_histories found in response');
        setAllCertData([]);
      }
    } catch (error) {
      console.error('Error fetching certificate data:', error instanceof Error ? error.message : String(error));
      setAllCertData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    certificateFetching();
  }, [certificateFetching]);

  // Update this function to handle undefined or null values
  // const handleDownloadCertificate = async (vin: string) => {
  //   try {
  //     const accesstoken = localStorage.getItem("access_token");
  //     if (!accesstoken) {
  //       throw new Error('No access token found');
  //     }
      
  //     const response = await fetch('https://afridev.com.ng/vin/search-history/', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accesstoken}`
  //       },
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch search history');
  //     }
      
  //     const resData = await response.json();
      
  //     const vehicleRecord = resData.Search_histories.find((record: SearchHistory) => {
  //       return (
  //         (record.vin?.vin === vin) || 
  //         (record.slug?.includes(vin))
  //       );
  //     });
      
  //     if (!vehicleRecord) {
  //       console.error('Vehicle record not found for VIN:', vin);
  //       return;
  //     }
      
  //     const userData = {
  //       fullName: vehicleRecord.user.full_name,
  //       address: user?.address || ''
  //     };
      
  //     const certificateData = {
  //       vin: vehicleRecord.vin?.vin || vin,
  //       makeModel: vehicleRecord.vin?.brand || '',
  //       year: vehicleRecord.vin?.vehicle_year || '',
  //       certificateNumber: vehicleRecord.cert_num || '',
  //       ownerName: userData.fullName,
  //       ownerAddress: userData.address,
  //       date: new Date().toLocaleDateString('en-GB', { 
  //         day: '2-digit', 
  //         month: 'short', 
  //         year: 'numeric' 
  //       })
  //     };
      
  //     generateCertificate(certificateData);
  //   } catch (error) {
  //     console.error('Error generating certificate:', error);
  //   }
  // };

  const handleDownloadCertificate = async (vin: string) => {
    try {
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error('No access token found');
      }
      
      const response = await fetch('https://afridev.com.ng/vin/search-history/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch search history');
      }
      
      const resData = await response.json();
      
      const vehicleRecord = resData.Search_histories.find((record: SearchHistory) => {
        return (
          (record.vin?.vin === vin) || 
          (record.slug?.includes(vin))
        );
      });
      
      if (!vehicleRecord) {
        console.error('Vehicle record not found for VIN:', vin);
        return;
      }
      
      const userData = {
        fullName: vehicleRecord.user.full_name,
        address: user?.address || ''
      };
      
      const certificateData = {
        vin: vehicleRecord.vin?.vin || vin,
        makeModel: vehicleRecord.vin?.brand || '',
        year: vehicleRecord.vin?.vehicle_year || '',
        certificateNumber: vehicleRecord.cert_num || '',
        ownerName: userData.fullName,
        ownerAddress: "No 16B Alimini Street Ipaja",
        date: new Date().toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        // Add the QR code base64 data from the API response
        qrCodeBase64: vehicleRecord.qr_code_base64 || ''
      };
      
      generateCertificate(certificateData);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-4 mb-4 mt-12">
        <nav className="md:ml-16 mt-6 md:mt-12 block w-full px-2 md:px-0">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-500 font-medium text-base py-2 hover:underline"
            aria-label="Navigate back to home page"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold mt-2 mb-2">Vehicle Certificates</h1>
        </nav>
        
        <div className="w-full max-w-3xl mx-auto bg-[#F2F2F7] p-3 sm:p-6 rounded-lg shadow-md">
          <div className="flex justify-end mb-4">
            {reports.length > 1 && (
              <button 
                className="bg-green-500 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center"
                onClick={handleDownloadAll}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="hidden sm:inline">Download All Documents</span>
                <span className="sm:hidden">Download All</span>
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {reports.length === 0 && !isLoading && allCertData.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="mb-4">📄</div>
                <h3 className="text-base sm:text-lg font-medium mb-2">No certificates or reports found</h3>
                <p className="text-sm sm:text-base text-gray-600">Your vehicle documents will appear here after purchase.</p>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your certificates...</p>
                  </div>
                ) : (
                  <>
                    {/* Items from direct API fetch - Now shown first and sorted by date */}
                    {allCertData.length > 0 && allCertData.map((certData, index) => (
                      <div 
                        key={`certificate-${index}`} 
                        className="bg-white border rounded-lg p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50"
                      >
                        <div className='flex space-x-2 items-center'>
                          <img 
                            src="/images/fileVINSearch.svg" 
                            alt="VIN Search Certificate" 
                            width={40}
                            className="sm:w-[50px]"
                          />
                          <div>
                            <h3 className="font-medium text-base sm:text-lg">VinSearch</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              VIN: {certData.vin?.vin || 'N/A'}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Date: {certData.created_at ? new Date(certData.created_at).toLocaleString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            // Fix the type error by checking if the value exists and providing a fallback
                            const vinValue = certData.vin?.vin || '';
                            if (vinValue) {
                              handleDownloadCertificate(vinValue);
                            } else {
                              console.error('No VIN available for this certificate');
                            }
                          }}
                          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center justify-center transition-colors"
                          disabled={!certData.vin?.vin}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                          Download Certificate
                        </button>
                      </div>
                    ))}

                    {/* Report items from Redux store */}
                    {reports.map((report) => (
                      <div key={report.id} className="bg-white border rounded-lg p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50">
                        <div className='flex space-x-2 items-center'>
                          <img src="/images/fileVINSearch.svg" alt="" width={40} className="sm:w-[50px]" />
                          <div>
                            <h3 className="font-medium text-base sm:text-lg">{report.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">VIN: {report.vin}</p>
                          </div>
                        </div>
                        {report.isCertificate ? (
                          <button
                            onClick={() => handleDownloadCertificate(report.vin)}
                            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center justify-center"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            Download Certificate
                          </button>
                        ) : (
                          <a
                            href={report.downloadUrl}
                            download
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center justify-center"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-3 w-3 sm:h-4 sm:w-4 mr-1" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            Download Report
                          </a>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
export default Certificate;