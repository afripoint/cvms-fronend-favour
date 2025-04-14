// import React, { useEffect, useRef } from 'react';
// import QRCode from 'qrcode';

// interface CertificateProps {
//   vin: string;
//   makeModel: string;
//   year: string | number;
//   certificateNumber: string;
//   ownerName: string;
//   ownerAddress: string;
//   date: string;
//   qrCodeBase64?: string;
//   onPrint?: () => void;
// }

// const CertificateGenerate: React.FC<CertificateProps> = ({
//   vin,
//   makeModel,
//   year,
//   certificateNumber,
//   ownerName,
//   ownerAddress,
//   date,
//   qrCodeBase64,
//   onPrint
// }) => {
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const qrCodeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Generate QR code if not provided directly
//     if (!qrCodeBase64 && qrCodeRef.current) {
//       const qrValue = JSON.stringify({
//         vin,
//         certificateNumber,
//         date
//       });

//       QRCode.toCanvas(qrCodeRef.current, qrValue, {
//         errorCorrectionLevel: 'H',
//         margin: 2,
//         width: 200,
//         color: {
//           dark: '#000000',
//           light: '#ffffff'
//         }
//       }).catch(err => {
//         console.error('Error generating QR code:', err);
//       });
//     }
//   }, [vin, certificateNumber, date, qrCodeBase64]);

//   const handlePrint = () => {
//     if (onPrint) {
//       onPrint();
//     } else {
//       const printContent = certificateRef.current?.innerHTML;
//       const originalContents = document.body.innerHTML;
      
//       if (printContent) {
//         const printWindow = window.open('', '_blank');
//         if (printWindow) {
//           printWindow.document.write(`
//             <html>
//               <head>
//                 <title>Vehicle Certificate - ${vin}</title>
//                 <style>
//                   @media print {
//                     body { margin: 0; padding: 0; }
//                     .certificate-container { width: 210mm; height: 297mm; }
//                     .red-border { height: 10mm; background-color: red; }
//                     .green-border { height: 10mm; background-color: green; }
//                     .watermark { opacity: 0.1; }
//                     @page { size: A4; margin: 0; }
//                   }
//                 </style>
//               </head>
//               <body>
//                 ${printContent}
//               </body>
//             </html>
//           `);
//           printWindow.document.close();
//           printWindow.focus();
//           printWindow.print();
//           printWindow.close();
//         }
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div 
//         ref={certificateRef} 
//         className="w-full max-w-[210mm] bg-white  mx-auto relative"
//         style={{ height: '297mm' }}
//       >
//         {/* Red top border */}
//         <div className="w-full h-10 bg-red-600"></div>
        
//         {/* Watermark */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <img 
//             src="/images/logo.png" 
//             alt="Watermark" 
//             className="w-[150px] h-auto opacity-10"
//           />
//         </div>
        
//         {/* Logo and title */}
//         <div className="flex items-center justify-center mt-10">
//           <img src="/images/logo.png" alt="Logo" className="w-[60px] h-auto" />
//           <div className="ml-4 font-bold text-lg">
//             <p>Customs Verification</p>
//             <p>Management System</p>
//           </div>
//         </div>
        
//         {/* Certificate title */}
//         <div className="text-center mt-16">
//           <h1 className="text-2xl font-bold">VEHICLE CERTIFICATE</h1>
//           <p className="mt-4 text-sm">
//             This is to certify that the customs duty for the following vehicle has been
//             <br />fully paid on the Trade Portal.
//           </p>
//         </div>
        
//         {/* Vehicle Information */}
//         <div className="mt-12 text-center">
//           <h2 className="text-lg font-bold mb-4">Vehicle Information</h2>
          
//           <div className="flex justify-center">
//             <div className="w-64 text-left">
//               <div className="flex py-1">
//                 <span className="w-32">VIN:</span>
//                 <span className="flex-1">{vin}</span>
//               </div>
//               <div className="flex py-1">
//                 <span className="w-32">Make/Model:</span>
//                 <span className="flex-1">{makeModel}</span>
//               </div>
//               <div className="flex py-1">
//                 <span className="w-32">Year:</span>
//                 <span className="flex-1">{year}</span>
//               </div>
//               <div className="text-center mt-2">
//                 <p>Certificate Number:</p>
//                 <p className="font-bold mt-1">{certificateNumber}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Owner's Information */}
//         <div className="mt-12 text-center">
//           <h2 className="text-lg font-bold mb-4">Owner's Information</h2>
          
//           <div className="flex justify-center">
//             <div className="w-64 text-left">
//               <div className="flex py-1">
//                 <span className="w-32">Full Name:</span>
//                 <span className="flex-1">{ownerName}</span>
//               </div>
//               <div className="flex py-1">
//                 <span className="w-32">Address:</span>
//                 <span className="flex-1">{ownerAddress}</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* QR Code */}
//         <div className="flex justify-center mt-8">
//           {qrCodeBase64 ? (
//             <img 
//               src={`data:image/png;base64,${qrCodeBase64}`} 
//               alt="Certificate QR Code" 
//               className="w-40 h-40"
//             />
//           ) : (
//             <div ref={qrCodeRef} className="w-40 h-40 border border-gray-300 flex items-center justify-center">
//               <span className="text-gray-400">Loading QR Code...</span>
//             </div>
//           )}
//         </div>
        
//         {/* Date at bottom */}
//         <div className="absolute bottom-16 left-0 right-0 text-center text-sm">
//           <p>This certificate is generated on {new Date().toLocaleDateString('en-US', { 
//             month: 'long', 
//             day: 'numeric', 
//             year: 'numeric' 
//           })}</p>
//         </div>
        
//         {/* Green bottom border */}
//         <div className="absolute bottom-0 w-full h-10 bg-green-600"></div>
//       </div>
      
//       {/* Print button */}
//       {/* <button 
//         onClick={handlePrint}
//         className="mt-6 mb-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md flex items-center"
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
//       </button> */}
//     </div>
//   );
// };

// export default CertificateGenerate;