import html2pdf from 'html2pdf.js';
import QRCode from 'qrcode';

interface CertificateData {
  vin: string;
  makeModel: string;
  year: string | number;
  certificateNumber: string;
  ownerName: string;
  ownerAddress: string;
  date: string;
  qrCodeBase64?: string; // Optional property for pre-generated QR code
}

export const generateCertificate = async (data: CertificateData) => {
  // Generate QR code if not provided
  let qrCodeDataUrl = data.qrCodeBase64;
  
  if (!qrCodeDataUrl) {
    try {
      const qrValue = JSON.stringify({
        vin: data.vin,
        certificateNumber: data.certificateNumber,
        date: data.date
      });
      
      qrCodeDataUrl = await QRCode.toDataURL(qrValue, {
        errorCorrectionLevel: 'H',
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      qrCodeDataUrl = '';
    }
  }
  
  // Create HTML template for certificate
  const certificateHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vehicle Certificate - ${data.vin}</title>
      <style>
        @page {
          size: 210mm 297mm; /* Explicitly set A4 dimensions */
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 210mm; /* A4 width */
          height: 297mm; /* A4 height */
          overflow: hidden;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }
        .certificate-container {
          width: 210mm;
          height: 297mm;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .colored-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }
        .left-border, .right-border {
          position: absolute;
          width: 5mm;
          height: 100%;
          background-color: black;
        }
        .left-border {
          left: 0;
        }
        .right-border {
          right: 0;
        }
        .top-border, .bottom-border {
          position: absolute;
          height: 5mm;
          width: 100%;
        }
        .top-border {
          top: 0;
        }
        .bottom-border {
          bottom: 0;
        }
        .border-segment {
          position: absolute;
          height: 100%;
        }
        .black-segment-1 {
          left: 0;
          width: 10mm;
          background-color: black;
        }
        .red-segment {
          // left: 10mm;
          left: 73mm;
          width: 63mm;
          background-color: red;
        }
        .black-segment-2 {
          // left: 73mm;
          left: 10mm;
          width: 64mm;
          background-color: black;
        }
        .green-segment {
          left: 137mm;
          width: 73mm;
          background-color: #00FF00;
        }
        
        .content {
          position: relative;
          z-index: 1;
          // padding: 15mm 10mm 5mm 10mm; 
          padding-top: 15mm;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.08;
          width: 500px;
          height: 550px;
          border-radius: 50%;
          z-index: -1;
        }
        .logo {
          width: 70px;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          line-height: 1.3;
          text-align: left;
          padding-bottom: 15px;
        }
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
          line-height: 30px;
        }
        .description {
          font-size: 14px;
          line-height: 1.5;
          // font-family: "inter";
          font-weight: 400;
          margin-bottom: 80px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          // margin-top: 15px;
          margin-bottom: 20px;
        }
        .info-container {
          width: 80%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-left: 30%;
        }
        .info-item {
          line-height: 1;
          margin-bottom: 10px;
          text-align: left;
          width: 100%;
          font-size: 12px;
          font-weight: 500;
        }
        .info-label {
          display: inline-block;
          font-weight: 400;
          margin-right: 10px;
          font-size: 14px;
        }
        .info-value {
          display: inline-block;
          font-weight: 600;
          font-size: 12px;
        }
        /* Year-specific styling to move it to the right */
        .year-item {
          line-height: 1;
          margin-bottom: 10px;
          text-align: left;
          width: 100%;
          padding-left: 30px; /* Add padding to move the year label and value to the right */
        }
        .certificate-number-label {
          font-size: 14px;
          font-weight: 400;
          // margin-top: 20px;
          text-align: center;
        }
        .certificate-number-value {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 90px;
          text-align: center;
        }
        .owner-title {
          font-size: 16px;
          font-weight: 600;
          margin: 10px 0;
          margin-bottom: 20px;
          text-align: center;
        }
        .qr-code {
          display: block;
          margin: 8px auto;
          width: 200px;
          height: 200px;
        }
        .date-footer {
        padding-top: 20px;
          font-size: 11px;
          width: 100%;
          text-align: center;
          
        }
        .logo-title-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 130px;
        }
          
        
        /* Adjusted footer container to position elements very close to bottom */
        .footer-container {
          margin-top: auto; /* Push to bottom */
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 6mm; /* Fixed space from bottom of page */
          position: absolute;
          bottom: 5mm; /* Position right above bottom border */
          left: 0;
          right: 0;
        }
      </style>
    </head>
    <body>
      <div class="certificate-container">
       
        <!-- Colored borders -->
        <div class="colored-border">
          <div class="left-border"></div>
          <div class="right-border"></div>
          
          <div class="top-border">
            <div class="border-segment black-segment-1"></div>
            <div class="border-segment red-segment"></div>
            <div class="border-segment black-segment-2"></div>
            <div class="border-segment green-segment"></div>
          </div>
          
          <div class="bottom-border">
            <div class="border-segment black-segment-1"></div>
            <div class="border-segment red-segment"></div>
            <div class="border-segment black-segment-2"></div>
            <div class="border-segment green-segment"></div>
          </div>
        </div>
    
        <!-- Watermark -->
        <img src="/images/Nigeria-Customs-Service_prev_ui 1.png" class="watermark" alt="Watermark">
        
        <div class="content">
          <!-- Logo and Title centered together -->
          <div class="logo-title-container">
            <img src="/images/logo.png" class="logo" alt="Logo">
            <div class="title">
              Customs Verification<br>
              Management System
            </div>
          </div>
          
          <h1>VEHICLE CERTIFICATE</h1>
          
          <p class="description">
            This is to certify that the customs duty for the following vehicle has been<br>
            fully paid on the Trade Portal.
          </p>
          
          <div class="section-title">Vehicle Information</div>
          
          <div class="info-container">
            <div class="info-item">
              <span class="info-label">VIN:</span>
              <span class="info-value">${data.vin}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Make/Model:</span>
              <span class="info-value">${data.makeModel}</span>
            </div>
            <div class="year-item">
              <span class="info-label">Year:</span>
              <span class="info-value">${data.year}</span>
            </div>
          </div>
          
          <div class="certificate-number-label">Certificate Number</div>
          <div class="certificate-number-value">${data.certificateNumber}</div>
          
          <div class="owner-title">Owner's Information</div>
          
          <div class="info-container">
            <div class="info-item">
              <span class="info-label">Name:</span>
              <span class="info-value">${data.ownerName}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Address:</span>
              <span class="info-value">${data.ownerAddress}</span>
            </div>
          </div>
        </div>
        
        <!-- Footer container with QR code and date positioned absolutely -->
        <div class="footer-container">
          <!-- QR Code positioned above the footer -->
          <img src="${qrCodeDataUrl}" class="qr-code" alt="QR Code">
          
          <!-- Date footer positioned just above the bottom border -->
          <div class="date-footer">
            This certificate is generated on ${new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Generate PDF from HTML
  const element = document.createElement('div');
  element.innerHTML = certificateHtml;
  
  const options = {
    margin: [0, 0, 0, 0],
    filename: `certificate_${data.vin}_${new Date().toISOString()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      width: 210 * 3.78, // Convert mm to px (approximately)
      height: 298 * 3.78 // Convert mm to px (approximately)
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
      precision: 16
    }
  };
  
  try {
    await html2pdf().from(element).set(options).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Fallback: Open certificate in new tab for printing
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(certificateHtml);
      newWindow.document.close();
      newWindow.onload = function() {
        newWindow.print();
      };
    } else {
      alert('Please allow pop-ups to view and print your certificate');
    }
  }
};







// import html2pdf from 'html2pdf.js';
// import QRCode from 'qrcode';

// interface CertificateData {
//   vin: string;
//   makeModel: string;
//   year: string | number;
//   certificateNumber: string;
//   ownerName: string;
//   ownerAddress: string;
//   date: string;
//   qrCodeBase64?: string; // Optional property for pre-generated QR code
// }

// export const generateCertificate = async (data: CertificateData) => {
//   // Generate QR code if not provided
//   let qrCodeDataUrl = data.qrCodeBase64;
  
//   if (!qrCodeDataUrl) {
//     try {
//       const qrValue = JSON.stringify({
//         vin: data.vin,
//         certificateNumber: data.certificateNumber,
//         date: data.date
//       });
      
//       qrCodeDataUrl = await QRCode.toDataURL(qrValue, {
//         errorCorrectionLevel: 'H',
//         margin: 2,
//         color: {
//           dark: '#000000',
//           light: '#ffffff'
//         }
//       });
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       qrCodeDataUrl = '';
//     }
//   }
  
//   // Create HTML template for certificate
//   const certificateHtml = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Vehicle Certificate - ${data.vin}</title>
//       <style>
//         @page {
//           size: 210mm 297mm; /* Explicitly set A4 dimensions */
//           margin: 0;
//         }
//         html, body {
//           margin: 0;
//           padding: 0;
//           width: 210mm; /* A4 width */
//           height: 297mm; /* A4 height */
//           overflow: hidden;
//           font-family: Arial, sans-serif;
//           box-sizing: border-box;
//            font-family: "poppins"
//         }
//         .certificate-container {
//           width: 210mm;
//           height: 297mm;
//           position: relative;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//         }

//         .colored-border {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 0;
//         }
//         .left-border, .right-border {
//           position: absolute;
//           width: 5mm;
//           height: 100%;
//           background-color: black;
//         }
//         .left-border {
//           left: 0;
//         }
//         .right-border {
//           right: 0;
//         }
//         .top-border, .bottom-border {
//           position: absolute;
//           height: 5mm;
//           width: 100%;
//         }
//         .top-border {
//           top: 0;
//         }
//         .bottom-border {
//           bottom: 0;
//         }
//         .border-segment {
//           position: absolute;
//           height: 100%;
//         }
//         .black-segment-1 {
//           left: 0;
//           width: 10mm;
//           background-color: black;
//         }
//         .red-segment {
//           // left: 10mm;
//           left: 73mm;
//           width: 63mm;
//           background-color: red;
//         }
//         .black-segment-2 {
//           // left: 73mm;
//           left: 10mm;
//           width: 64mm;
//           background-color: black;
//         }
//         .green-segment {
//           left: 137mm;
//           width: 73mm;
//           background-color: #00FF00;
//         }
        
//         .content {
//           position: relative;
//           z-index: 1;
//           // padding: 15mm 10mm 5mm 10mm; 
//           padding-top: 10mm;
//           text-align: center;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//         }
//         .watermark {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           opacity: 0.08;
//           width: 500px;
//           height: 550px;
//           border-radius: 50%;
//           z-index: -1;
//         }
//         .logo {
//           width: 70px;
//         }
//         .title {
//           font-size: 20px;
//           font-weight: bold;
//           line-height: 1.3;
//           text-align: left;
//           padding-bottom: 15px;
//         }
//         h1 {
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 15px;
//           line-height: 30px;
//         }
//         .description {
//           font-size: 14px;
//           line-height: 1.5;
//           font-family: "inter";
//           font-weight: 400;
//           margin-bottom: 80px;
//         }
//         .section-title {
//           font-size: 16px;
//           font-weight: 600;
//           // margin-top: 15px;
//           margin-bottom: 20px;
//         }
//         .info-container {
//           width: 80%;
//           margin: 0 auto;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//           padding-left: 30%;
//         }
//         .info-item {
//           line-height: 1;
//           margin-bottom: 10px;
//           text-align: left;
//           width: 100%;
//           font-size: 12px;
//           font-weight: 500;
//           font-family: "inter"
//         }
//         .info-label {
//           display: inline-block;
//           font-weight: 400;
//           margin-right: 10px;
//           font-size: 14px;
//         }
//         .info-value {
//           display: inline-block;
//           font-weight: 600;
//           font-size: 12px;
//         }
//         /* Year-specific styling to move it to the right */
//         .year-item {
//           line-height: 1;
//           margin-bottom: 10px;
//           text-align: left;
//           width: 100%;
//           padding-left: 30px; /* Add padding to move the year label and value to the right */
//         }
//         .certificate-number-label {
//           font-size: 14px;
//           font-weight: 400;
//           // margin-top: 20px;
//           text-align: center;
//         }
//         .certificate-number-value {
//           font-size: 16px;
//           font-weight: 600;
//           margin-bottom: 90px;
//           text-align: center;
//         }
//         .owner-title {
//           font-size: 16px;
//           font-weight: 600;
//           margin: 10px 0;
//           margin-bottom: 20px;
//           text-align: center;
//         }
//         .qr-code {
//           display: block;
//           margin: 8px auto;
//           width: 200px;
//           height: 200px;
//         }
//         .date-footer {
//         padding-top: 20px;
//           font-size: 11px;
//           width: 100%;
//           text-align: center;
          
//         }
//         .logo-title-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           margin-bottom: 130px;
//         }
          
        
//         /* Adjusted footer container to position elements very close to bottom */
//         .footer-container {
//           margin-top: auto; /* Push to bottom */
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding-bottom: 6mm; /* Fixed space from bottom of page */
//           position: absolute;
//           bottom: 5mm; /* Position right above bottom border */
//           left: 0;
//           right: 0;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="certificate-container">
       
//         <!-- Colored borders -->
//         <div class="colored-border">
//           <div class="left-border"></div>
//           <div class="right-border"></div>
          
//           <div class="top-border">
//             <div class="border-segment black-segment-1"></div>
//             <div class="border-segment red-segment"></div>
//             <div class="border-segment black-segment-2"></div>
//             <div class="border-segment green-segment"></div>
//           </div>
          
//           <div class="bottom-border">
//             <div class="border-segment black-segment-1"></div>
//             <div class="border-segment red-segment"></div>
//             <div class="border-segment black-segment-2"></div>
//             <div class="border-segment green-segment"></div>
//           </div>
//         </div>
    
//         <!-- Watermark -->
//         <img src="/images/Nigeria-Customs-Service_prev_ui 1.png" class="watermark" alt="Watermark">
        
//         <div class="content">
//           <!-- Logo and Title centered together -->
//           <div class="logo-title-container">
//             <img src="/images/logo.png" class="logo" alt="Logo">
//             <div class="title">
//               Customs Verification<br>
//               Management System
//             </div>
//           </div>
          
//           <h1>VEHICLE CERTIFICATE</h1>
          
//           <p class="description">
//             This is to certify that the customs duty for the following vehicle has been<br>
//             fully paid on the Trade Portal.
//           </p>
          
//           <div class="section-title">Vehicle Information</div>
          
//           <div class="info-container">
//             <div class="info-item">
//               <span class="info-label">VIN:</span>
//               <span class="info-value">${data.vin}</span>
//             </div>
//             <div class="info-item">
//               <span class="info-label">Make/Model:</span>
//               <span class="info-value">${data.makeModel}</span>
//             </div>
//             <div class="year-item">
//               <span class="info-label">Year:</span>
//               <span class="info-value">${data.year}</span>
//             </div>
//           </div>
          
//           <div class="certificate-number-label">Certificate Number</div>
//           <div class="certificate-number-value">${data.certificateNumber}</div>
          
//           <div class="owner-title">Owner's Information</div>
          
//           <div class="info-container">
//             <div class="info-item">
//               <span class="info-label">Name:</span>
//               <span class="info-value">${data.ownerName}</span>
//             </div>
//             <div class="info-item">
//               <span class="info-label">Address:</span>
//               <span class="info-value">${data.ownerAddress}</span>
//             </div>
//           </div>
//         </div>
        
//         <!-- Footer container with QR code and date positioned absolutely -->
//         <div class="footer-container">
//           <!-- QR Code positioned above the footer -->
//           <img src="${qrCodeDataUrl}" class="qr-code" alt="QR Code">
          
//           <!-- Date footer positioned just above the bottom border -->
//           <div class="date-footer">
//             This certificate is generated on ${new Date().toLocaleDateString('en-US', { 
//               month: 'long', 
//               day: 'numeric', 
//               year: 'numeric' 
//             })}
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
  
//   // Generate PDF from HTML
//   const element = document.createElement('div');
//   element.innerHTML = certificateHtml;
  
//   const options = {
//     margin: [0, 0, 0, 0],
//     filename: `certificate_${data.vin}_${new Date().toISOString()}.pdf`,
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { 
//       scale: 2,
//       useCORS: true,
//       letterRendering: true,
//       width: 210 * 3.78, // Convert mm to px (approximately)
//       height: 298 * 3.78 // Convert mm to px (approximately)
//     },
//     jsPDF: { 
//       unit: 'mm', 
//       format: 'a4', 
//       orientation: 'portrait',
//       compress: true,
//       precision: 16
//     }
//   };
  
//   try {
//     await html2pdf().from(element).set(options).save();
//   } catch (error) {
//     console.error('Error generating PDF:', error);
    
//     // Fallback: Open certificate in new tab for printing
//     const newWindow = window.open('', '_blank');
//     if (newWindow) {
//       newWindow.document.open();
//       newWindow.document.write(certificateHtml);
//       newWindow.document.close();
//       newWindow.onload = function() {
//         newWindow.print();
//       };
//     } else {
//       alert('Please allow pop-ups to view and print your certificate');
//     }
//   }
// };

