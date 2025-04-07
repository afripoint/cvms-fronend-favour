import React, { useRef } from 'react';
import QRCode from 'react-qr-code';

interface CertificateData {
  vin: string;
  makeModel: string;
  year: string | number;
  certificateNumber: string;
  ownerName: string;
  ownerAddress: string;
  date: string;
}

interface CertificateProps {
  data: CertificateData;
  onPrint?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ data, onPrint }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      const content = certificateRef.current;
      if (content) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Vehicle Certificate - ${data.vin}</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <style>
                  @media print {
                    body {
                      print-color-adjust: exact;
                      -webkit-print-color-adjust: exact;
                    }
                  }
                </style>
              </head>
              <body>
                ${content.outerHTML}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          // printWindow.close();
        }
      }
    }
  };

  // Create QR code data
  const qrData = JSON.stringify({
    vin: data.vin,
    certificateNumber: data.certificateNumber,
    date: data.date
  });

  return (
    <div className="flex flex-col items-center">
      <div
        ref={certificateRef}
        className="bg-white w-full max-w-2xl mx-auto shadow-lg relative overflow-hidden"
        style={{ height: '842px', width: '595px' }} // A4 size in pixels
      >
        {/* Colored borders */}
        <div className="absolute left-0 top-0 h-full w-10 bg-black"></div>
        <div className="absolute right-0 top-0 h-full w-10 bg-black"></div>
        <div className="absolute top-0 left-0 w-full h-10 bg-red-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-green-600"></div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="text-9xl font-bold text-gray-300">NCS</div>
        </div>

        {/* Header */}
        <div className="pt-20 px-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full mb-2">
              <span className="text-sm">LOGO</span>
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-lg font-bold">Customs Verification</h1>
            <h1 className="text-lg font-bold">Management System</h1>
          </div>
        </div>

        {/* Certificate title */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">VEHICLE CERTIFICATE</h2>
          <p className="text-sm mt-6">
            This is to certify that the customs duty for the following vehicle has been
          </p>
          <p className="text-sm">fully paid on the Trade Portal.</p>
        </div>

        {/* Vehicle Information section */}
        <div className="mt-10 px-20">
          <h3 className="text-center text-lg font-bold mb-4">Vehicle Information</h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-right">VIN:</div>
            <div>{data.vin}</div>
            
            <div className="text-right">Make/Model:</div>
            <div>{data.makeModel}</div>
            
            <div className="text-right">Year:</div>
            <div>{data.year.toString()}</div>
          </div>
          
          <div className="text-center mt-4">
            <div className="text-sm">Certificate Number:</div>
            <div className="font-bold">{data.certificateNumber}</div>
          </div>
        </div>

        {/* Owner's Information */}
        <div className="mt-10 px-20">
          <h3 className="text-center text-lg font-bold mb-4">Owner's Information</h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-right">Full Name:</div>
            <div>{data.ownerName}</div>
            
            <div className="text-right">Address:</div>
            <div>{data.ownerAddress}</div>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-8 flex justify-center">
          <div className="w-40 h-40">
            <QRCode
              value={qrData}
              size={160}
              style={{ height: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>

        {/* Date at bottom */}
        <div className="absolute bottom-14 left-0 right-0 text-center text-xs">
          This certificate is generated on {new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </div>
      </div>

      {/* Print button */}
      <button 
        onClick={handlePrint}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
        </svg>
        Print Certificate
      </button>
    </div>
  );
};

export default Certificate;