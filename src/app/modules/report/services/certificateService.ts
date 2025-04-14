import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface CertificateData {
  vin: string;
  makeModel: string;
  year: string | number;
  certificateNumber: string;
  ownerName: string;
  ownerAddress: string;
  date: string;
}

export const generateCertificate = async (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Add colored borders
  
  doc.setFillColor(255, 0, 0);
  doc.rect(0, 0, 210, 10, 'F');
  
  doc.setFillColor(0, 255, 0);
  doc.rect(0, 287, 210, 10, 'F');
  
  // Add logo watermark first (before other content)
  try {
    const logoUrl = '/images/logo.png';
    const watermarkWidth = 150;
    const watermarkHeight = 120;
    const centerX = (200 - watermarkWidth) / 2;
    const centerY = (267 - watermarkHeight) / 2;
    
    doc.saveGraphicsState();
    doc.setGState(doc.GState({ opacity: 0.1 }));
    doc.addImage(logoUrl, 'PNG', centerX, centerY, watermarkWidth, watermarkHeight);
    doc.restoreGraphicsState();
  } catch (error) {
    console.error('Error loading watermark logo:', error);
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(100);
    doc.text('NCS', 105, 150, { align: 'center' });
    doc.setTextColor(0, 0, 0);
  }
  
  // Add main logo and title
  try {
    const logoUrl = '/images/logo.png';
    const logoWidth = 15;
    const logoHeight = 16;
    const logoX = 60;
    const logoY = 20;
    
    doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    
    const textX = logoX + logoWidth + 5;
    const textLines = ['Customs Verification', 'Management System'];
    const totalTextHeight = logoHeight;
    const lineHeight = totalTextHeight / textLines.length;
    const textStartY = logoY + (logoHeight / 2) - (lineHeight * (textLines.length - 1)) / 2;
    
    textLines.forEach((line, index) => {
      doc.text(line, textX, textStartY + (index * lineHeight));
    });
    
  } catch (error) {
    console.error('Error loading logo:', error);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    const lineHeight = 7;
    const startY = 20;
    doc.text('Customs Verification', 105, startY, { align: 'center' });
    doc.text('Management System', 105, startY + lineHeight, { align: 'center' });
  }
  
  // Certificate title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('VEHICLE CERTIFICATE', 105, 70, { align: 'center' });
  
  // Descriptive text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const descLineHeight = 5;
  doc.text('This is to certify that the customs duty for the following vehicle has been', 
           105, 85, { align: 'center' });
  doc.text('fully paid on the Trade Portal.', 105, 85 + descLineHeight, { align: 'center' });
  
  // Vehicle Information section
// Vehicle Information section
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.text('Vehicle Information', 105, 115, { align: 'center' });

doc.setFontSize(11);
doc.setFont('helvetica', 'normal');

// Increase just the line spacing for better vertical separation
const lineSpacing = 7; // Changed from 5 to 8 for more vertical spacing
const startYDetails = 125;
const leftCol = 90;  // was 80
const rightCol = 115; // was 105


doc.text('VIN:', leftCol, startYDetails);
doc.text(data.vin, rightCol, startYDetails);

doc.text('Make/ Model:', leftCol, startYDetails + lineSpacing);
doc.text(data.makeModel, rightCol, startYDetails + lineSpacing );

doc.text('Year:', leftCol, startYDetails + lineSpacing * 2);
doc.text(data.year.toString(), rightCol, startYDetails + lineSpacing * 2);

const centerX = 105;
// Keep the "Certificate Number:" label in normal font
doc.setFont('helvetica', 'normal');
doc.text('Certificate Number:', centerX, startYDetails + lineSpacing * 3, { align: 'center' });

// Value in bold font, centered on next line
doc.setFont('helvetica', 'bold');
doc.text(data.certificateNumber, centerX, startYDetails + lineSpacing * 3 + 6, { align: 'center' });
  
  // Return to normal font for subsequent text
  doc.setFont('helvetica', 'normal');
  
  // Owner's Information
  // Owner's Information
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.text("Owner's Information", 105, 175, { align: 'center' });

doc.setFontSize(10);
doc.setFont('helvetica', 'normal');

const ownerY = 185;

doc.text('Full Name:', leftCol, ownerY);
doc.text(data.ownerName, rightCol, ownerY);

doc.text('Address:', leftCol, ownerY + lineSpacing);
doc.text(data.ownerAddress, rightCol, ownerY + lineSpacing);
  
  // Generate QR code
  const qrSize = 50; // in mm
  const qrX = 105 - qrSize/2;
  const qrY = 225;
  
  try {
    const qrValue = JSON.stringify({
      vin: data.vin,
      certificateNumber: data.certificateNumber,
      date: data.date
    });

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(qrValue, {
      errorCorrectionLevel: 'H',
      width: qrSize * 4, // Convert mm to pixels
      margin: 2,
      color: {
        dark: '#000000', // QR code dots
        light: '#ffffff' // Background
      }
    });

    // Add QR code to PDF
    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
  } catch (error) {
    console.error('Error generating QR code:', error);
    // Fallback: Draw empty QR code placeholder
    doc.rect(qrX, qrY, qrSize, qrSize);
    doc.setFontSize(8);
    doc.text('QR Code Error', qrX + qrSize/2, qrY + qrSize/2, { align: 'center' });
  }
  
  // Date at bottom
  doc.setFontSize(10);
  doc.text(`This certificate is generated on ${new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })}`, 105, 280, { align: 'center' });
  
  // Save the PDF
//   doc.save(`certificate_${data.vin}_${new Date().toISOString()}.pdf`);
// };

// Save the PDF
doc.save(`certificate_${data.vin}_${new Date().toISOString()}.pdf`);
};




