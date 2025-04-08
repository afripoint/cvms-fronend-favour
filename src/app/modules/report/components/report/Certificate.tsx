// import React, { useRef } from 'react';
// import QRCode from 'react-qr-code';

// interface CertificateData {
//   vin: string;
//   makeModel: string;
//   year: string | number;
//   certificateNumber: string;
//   ownerName: string;
//   ownerAddress: string;
//   date: string;
// }

// interface CertificateProps {
//   data: CertificateData;
//   onPrint?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({ data, onPrint }) => {
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const handlePrint = () => {
//     if (onPrint) {
//       onPrint();
//     } else {
//       const content = certificateRef.current;
//       if (content) {
//         const printWindow = window.open('', '_blank');
//         if (printWindow) {
//           printWindow.document.write(`
//             <html>
//               <head>
//                 <title>Vehicle Certificate - ${data.vin}</title>
//                 <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//                 <style>
//                   @media print {
//                     body {
//                       print-color-adjust: exact;
//                       -webkit-print-color-adjust: exact;
//                     }
//                   }
//                 </style>
//               </head>
//               <body>
//                 ${content.outerHTML}
//               </body>
//             </html>
//           `);
//           printWindow.document.close();
//           printWindow.focus();
//           printWindow.print();
//           // printWindow.close();
//         }
//       }
//     }
//   };

//   // Create QR code data
//   const qrData = JSON.stringify({
//     vin: data.vin,
//     certificateNumber: data.certificateNumber,
//     date: data.date
//   });

//   return (
//     <div className="flex flex-col items-center">
//       <div
//         ref={certificateRef}
//         className="bg-white w-full max-w-2xl mx-auto shadow-lg relative overflow-hidden"
//         style={{ height: '842px', width: '595px' }} // A4 size in pixels
//       >
//         {/* Colored borders */}
//         <div className="absolute left-0 top-0 h-full w-10 bg-black"></div>
//         <div className="absolute right-0 top-0 h-full w-10 bg-black"></div>
//         <div className="absolute top-0 left-0 w-full h-10 bg-red-600"></div>
//         <div className="absolute bottom-0 left-0 w-full h-10 bg-green-600"></div>

//         {/* Watermark */}
//         <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
//           <div className="text-9xl font-bold text-gray-300">NCS</div>
//         </div>

//         {/* Header */}
//         <div className="pt-20 px-16 flex items-center justify-center">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full mb-2">
//               <span className="text-sm">LOGO</span>
//             </div>
//           </div>
//           <div className="ml-4">
//             <h1 className="text-lg font-bold">Customs Verification</h1>
//             <h1 className="text-lg font-bold">Management System</h1>
//           </div>
//         </div>

//         {/* Certificate title */}
//         <div className="mt-16 text-center">
//           <h2 className="text-2xl font-bold">VEHICLE CERTIFICATE</h2>
//           <p className="text-sm mt-6">
//             This is to certify that the customs duty for the following vehicle has been
//           </p>
//           <p className="text-sm">fully paid on the Trade Portal.</p>
//         </div>

//         {/* Vehicle Information section */}
//         <div className="mt-10 px-20">
//           <h3 className="text-center text-lg font-bold mb-4">Vehicle Information</h3>
          
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             <div className="text-right">VIN:</div>
//             <div>{data.vin}</div>
            
//             <div className="text-right">Make/Model:</div>
//             <div>{data.makeModel}</div>
            
//             <div className="text-right">Year:</div>
//             <div>{data.year.toString()}</div>
//           </div>
          
//           <div className="text-center mt-4">
//             <div className="text-sm">Certificate Number:</div>
//             <div className="font-bold">{data.certificateNumber}</div>
//           </div>
//         </div>

//         {/* Owner's Information */}
//         <div className="mt-10 px-20">
//           <h3 className="text-center text-lg font-bold mb-4">Owner's Information</h3>
          
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             <div className="text-right">Full Name:</div>
//             <div>{data.ownerName}</div>
            
//             <div className="text-right">Address:</div>
//             <div>{data.ownerAddress}</div>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="mt-8 flex justify-center">
//           <div className="w-40 h-40">
//             <QRCode
//               value={qrData}
//               size={160}
//               style={{ height: "100%", width: "100%" }}
//               viewBox={`0 0 256 256`}
//             />
//           </div>
//         </div>

//         {/* Date at bottom */}
//         <div className="absolute bottom-14 left-0 right-0 text-center text-xs">
//           This certificate is generated on {new Date().toLocaleDateString('en-US', { 
//             month: 'long', 
//             day: 'numeric', 
//             year: 'numeric' 
//           })}
//         </div>
//       </div>

//       {/* Print button */}
//       <button 
//         onClick={handlePrint}
//         className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center"
//       >
//         <svg 
//           xmlns="http://www.w3.org/2000/svg" 
//           className="h-5 w-5 mr-2" 
//           viewBox="0 0 20 20" 
//           fill="currentColor"
//         >
//           <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
//         </svg>
//         Print Certificate
//       </button>
//     </div>
//   );
// };

// export default Certificate;














import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Footer, Header } from '../../../landing/components/layout';

interface CertificateDetails {
  vin: string;
  certificateNumber: string;
  date: string;
  makeModel?: string;
  year?: string;
  ownerName?: string;
  status?: string;
}

const VerifyCertificatePage = () => {
  const [searchParams] = useSearchParams();
  const [certificateDetails, setCertificateDetails] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'error' | 'pending'>('pending');

  useEffect(() => {
    const verifyDetails = async () => {
      try {
        setLoading(true);
        
        // Get parameters from URL
        const vin = searchParams.get('vin');
        const cert = searchParams.get('cert');
        const date = searchParams.get('date');
        
        if (!vin || !cert) {
          throw new Error('Missing required certificate information');
        }
        
        // In a real implementation, you would verify these details against your backend
        // For now, we'll just check if they exist and then fetch additional details
        const accessToken = localStorage.getItem("access_token");
        
        // Fetch certificate details from backend
        // Note: This might need adjustment based on your actual API
        const response = await fetch('https://afridev.com.ng/vin/search-history/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to verify certificate');
        }
        
        const data = await response.json();
        
        // Find matching record
        const vehicleRecord = data.Search_histories.find((record: any) => {
          return (
            (record.vin?.vin === vin) && 
            (record.cert_num === cert)
          );
        });
        
        if (!vehicleRecord) {
          // If no exact match in database, but we have basic info from QR code
          // We can still show minimal verification with a warning
          setCertificateDetails({
            vin: vin,
            certificateNumber: cert,
            date: date || 'Unknown',
            status: 'Limited verification - database record not found'
          });
          setVerificationStatus('error');
        } else {
          // If found in database, show full details
          setCertificateDetails({
            vin: vehicleRecord.vin?.vin || vin,
            certificateNumber: vehicleRecord.cert_num || cert,
            date: date || vehicleRecord.created_at || 'Unknown',
            makeModel: vehicleRecord.vin?.brand || 'Not available',
            year: vehicleRecord.vin?.vehicle_year || 'Not available',
            ownerName: vehicleRecord.user?.full_name || 'Not available',
            status: 'Fully verified'
          });
          setVerificationStatus('verified');
        }
      } catch (error) {
        console.error('Verification error:', error);
        // Still display the basic info from QR code if available
        const vin = searchParams.get('vin');
        const cert = searchParams.get('cert');
        const date = searchParams.get('date');
        
        if (vin && cert) {
          setCertificateDetails({
            vin,
            certificateNumber: cert,
            date: date || 'Unknown',
            status: 'Verification failed'
          });
        }
        setVerificationStatus('error');
      } finally {
        setLoading(false);
      }
    };
    
    verifyDetails();
  }, [searchParams]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      
      <main className="flex-grow container mx-auto px-4 py-4 mb-4 mt-12">
        <h1 className="text-2xl font-bold text-center mt-8 mb-6">Certificate Verification</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Status Header */}
            <div className={`p-4 text-white ${
              verificationStatus === 'verified' ? 'bg-green-500' : 
              verificationStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              <div className="flex items-center">
                {verificationStatus === 'verified' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <h2 className="text-lg font-semibold">
                  {verificationStatus === 'verified' ? 'Certificate Verified' : 
                   verificationStatus === 'error' ? 'Verification Issue' : 'Verifying...'}
                </h2>
              </div>
              {certificateDetails?.status && (
                <p className="mt-1 text-sm opacity-90">{certificateDetails.status}</p>
              )}
            </div>
            
            {/* Certificate Details */}
            {certificateDetails && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Certificate Number</h3>
                    <p className="mt-1 text-lg font-semibold">{certificateDetails.certificateNumber}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">VIN</h3>
                    <p className="mt-1 text-lg font-semibold">{certificateDetails.vin}</p>
                  </div>
                  
                  {certificateDetails.makeModel && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Make/Model</h3>
                      <p className="mt-1">{certificateDetails.makeModel}</p>
                    </div>
                  )}
                  
                  {certificateDetails.year && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Year</h3>
                      <p className="mt-1">{certificateDetails.year}</p>
                    </div>
                  )}
                  
                  {certificateDetails.ownerName && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                      <p className="mt-1">{certificateDetails.ownerName}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Issue Date</h3>
                    <p className="mt-1">{certificateDetails.date}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Certificate Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer/>
    </div>
  );
};

export default VerifyCertificatePage;