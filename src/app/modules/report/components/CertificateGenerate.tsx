// import { jsPDF } from 'jspdf';
// import QRCode from 'qrcode';

// interface CertificateData {
//   vin: string;
//   makeModel: string;
//   year: string | number;
//   certificateNumber: string;
//   ownerName: string;
//   ownerAddress: string;
//   date: string;
//   qrCodeBase64?: string;
// }

// export const generateCertificate = async (data: CertificateData): Promise<void> => {
//   const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4'
//   });
  
//   // Set font styles
//   doc.setFont('helvetica', 'bold');
  
//   // Add borders
//   doc.setFillColor(0, 0, 0);
//   // Left and right black borders
//   doc.rect(0, 0, 10, 297, 'F');
//   doc.rect(200, 0, 10, 297, 'F');
  
//   // Top border with black, red, green
//   doc.setFillColor(0, 0, 0);
//   doc.rect(0, 0, 10, 10, 'F');
//   doc.setFillColor(255, 0, 0);
//   doc.rect(10, 0, 63, 10, 'F');
//   doc.setFillColor(0, 0, 0);
//   doc.rect(73, 0, 64, 10, 'F');
//   doc.setFillColor(0, 255, 0);
//   doc.rect(137, 0, 73, 10, 'F');
  
//   // Bottom border with black, red, green
//   doc.setFillColor(0, 0, 0);
//   doc.rect(0, 287, 10, 10, 'F');
//   doc.setFillColor(255, 0, 0);
//   doc.rect(10, 287, 63, 10, 'F');
//   doc.setFillColor(0, 0, 0);
//   doc.rect(73, 287, 64, 10, 'F');
//   doc.setFillColor(0, 255, 0);
//   doc.rect(137, 287, 73, 10, 'F');
  
//   // Header
//   doc.setFontSize(16);
//   doc.text('Customs Verification', 75, 30);
//   doc.text('Management System', 75, 40);
  
//   // Title
//   doc.setFontSize(24);
//   doc.text('VEHICLE CERTIFICATE', 105, 60, { align: 'center' });
  
//   // Description text
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'normal');
//   doc.text('This is to certify that the customs duty for the following vehicle has been', 105, 75, { align: 'center' });
//   doc.text('fully paid on the Trade Portal.', 105, 82, { align: 'center' });
  
//   // Vehicle Information Section
//   doc.setFontSize(16);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Vehicle Information', 105, 100, { align: 'center' });
  
//   // Vehicle info fields
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('VIN:', 70, 120);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.vin, 90, 120);
  
//   doc.setFont('helvetica', 'bold');
//   doc.text('Make/Model:', 70, 130);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.makeModel, 110, 130);
  
//   doc.setFont('helvetica', 'bold');
//   doc.text('Year:', 70, 140);
//   doc.setFont('helvetica', 'normal');
//   doc.text(String(data.year), 90, 140);
  
//   doc.setFont('helvetica', 'bold');
//   doc.text('Certificate Number:', 70, 150);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.certificateNumber, 125, 150);
  
//   // Owner's Information Section
//   doc.setFontSize(16);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Owner\'s Information', 105, 170, { align: 'center' });
  
//   // Owner info fields
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Full Name:', 70, 190);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.ownerName, 110, 190);
  
//   doc.setFont('helvetica', 'bold');
//   doc.text('Address:', 70, 200);
//   doc.setFont('helvetica', 'normal');
//   doc.text(data.ownerAddress, 110, 200);
  
//   // Add watermark
// //   doc.setFontSize(80);
// //   doc.setTextColor(220, 220, 220);
// //   doc.text('PAID', 105, 150, { align: 'center', angle: -30 });
// //   doc.setTextColor(0, 0, 0);
  
//   // Add QR code if available
//   if (data.qrCodeBase64) {
//     try {
//       // Add the QR code image from base64 data
//       doc.addImage(data.qrCodeBase64, 'PNG', 75, 220, 60, 60);
//     } catch (error) {
//       console.error('Error adding QR code:', error);
//       // If there's an error with the provided QR code, generate a simple one
//       generateSimpleQR(doc, data.vin, 75, 220, 60, 60);
//     }
//   } else {
//     // If no QR code is provided, generate one with the VIN
//     try {
//       const qrCodeDataUrl = await generateQRCodeDataURL(data.vin);
//       doc.addImage(qrCodeDataUrl, 'PNG', 75, 220, 60, 60);
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       generateSimpleQR(doc, data.vin, 75, 220, 60, 60);
//     }
//   }
  
//   // Footer
//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'normal');
//   doc.text(`This certificate is generated on ${data.date}.`, 105, 285, { align: 'center' });
  
//   // Save the PDF
//   doc.save(`VIN_Certificate_${data.vin}.pdf`);
// };

// // Helper function to generate a QR code data URL
// const generateQRCodeDataURL = async (text: string): Promise<string> => {
//   try {
//     return await QRCode.toDataURL(text, { 
//       errorCorrectionLevel: 'H',
//       margin: 1,
//       width: 300
//     });
//   } catch (error) {
//     console.error('QR code generation error:', error);
//     throw error;
//   }
// };

// // Helper function to generate a simple pattern when QR code fails
// const generateSimpleQR = (doc: jsPDF, text: string, x: number, y: number, width: number, height: number): void => {
//   // Draw a border
//   doc.rect(x, y, width, height);
  
//   // Draw a simplified pattern
//   doc.setFillColor(0, 0, 0);
//   const squareSize = width / 10;
  
//   // Draw some squares to represent a QR code pattern
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       doc.rect(x + i * squareSize, y + j * squareSize, squareSize, squareSize, 'F');
//     }
//   }
  
//   // Draw the opposite corner
//   for (let i = 7; i < 10; i++) {
//     for (let j = 0; j < 3; j++) {
//       doc.rect(x + i * squareSize, y + j * squareSize, squareSize, squareSize, 'F');
//     }
//   }
  
//   // Draw the bottom left corner
//   for (let i = 0; i < 3; i++) {
//     for (let j = 7; j < 10; j++) {
//       doc.rect(x + i * squareSize, y + j * squareSize, squareSize, squareSize, 'F');
//     }
//   }
  
//   // Add text
//   doc.setTextColor(0, 0, 0);
//   doc.setFontSize(8);
//   doc.text(text, x + width/2, y + height + 10, { align: 'center' });
//   doc.setTextColor(0, 0, 0);
// };