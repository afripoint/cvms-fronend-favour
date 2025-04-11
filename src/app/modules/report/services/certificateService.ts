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
  
  // Add colored borders - thinner borders on left and right sides
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 8, 297, 'F'); // Left black border - reduced from 15 to 8
  doc.rect(202, 0, 8, 297, 'F'); // Right black border - reduced from 15 to 8
  
  doc.setFillColor(255, 0, 0);
  doc.rect(8, 0, 5, 297, 'F'); // Red border - reduced from 40 to 20
  
  doc.setFillColor(0, 255, 0);
  doc.rect(182, 0, 10, 297, 'F'); // Green border - reduced from 40 to 20
  
  // Create content area with white background - expanded with reduced borders
  doc.setFillColor(255, 255, 255);
  doc.rect(28, 0, 154, 297, 'F');
  
  // Content area starts at x=28 and has width of 154mm
  const contentCenterX = 28 + (154/2); // Center of content area
  
  // Add watermark - "PAID" text and circle
  doc.saveGraphicsState();
  doc.setGState(doc.GState({ opacity: 0.07 }));
  
  // Add watermark circle
  
  // Add "PAID" text watermark
  doc.setTextColor(255, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(50); // Reduced from 60
  doc.text('PAID', contentCenterX, 148.5, { 
    align: 'center',
    angle: -45
  });
  doc.restoreGraphicsState();
  
  // Add header with reduced padding
  const headerY = 20; // Reduced from 25
  
  // Add logo (using emoji as placeholder like in the HTML)
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('🔐', contentCenterX - 35, headerY);
  
  // Add title text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const titleX = contentCenterX - 28;
  doc.text('Customs Verification', titleX, headerY - 3);
  doc.text('Management System', titleX, headerY + 3);
  
  // Certificate title with reduced padding
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('VEHICLE CERTIFICATE', contentCenterX, 50, { align: 'center' }); // Reduced from 60
  
  // Descriptive text with reduced padding
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('This is to certify that the customs duty for the following vehicle has been', 
           contentCenterX, 62, { align: 'center' }); // Reduced from 75
  doc.text('fully paid on the Trade Portal.', contentCenterX, 68, { align: 'center' }); // Reduced from 82
  
  // Vehicle Information section with reduced padding
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Vehicle Information', contentCenterX, 85, { align: 'center' }); // Reduced from 100

  // Center-align all vehicle information items with reduced spacing
  doc.setFontSize(10);
  const startYDetails = 95; // Reduced from 115
  const lineSpacing = 12; // Reduced from 15
  
  // VIN
  doc.setFont('helvetica', 'normal');
  doc.text('VIN:', contentCenterX, startYDetails, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(data.vin, contentCenterX, startYDetails + 5, { align: 'center' }); // Reduced from 7
  
  // Make/Model
  doc.setFont('helvetica', 'normal');
  doc.text('Make/ Model:', contentCenterX, startYDetails + lineSpacing, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(data.makeModel, contentCenterX, startYDetails + lineSpacing + 5, { align: 'center' });
  
  // Year
  doc.setFont('helvetica', 'normal');
  doc.text('Year:', contentCenterX, startYDetails + lineSpacing * 2, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(data.year.toString(), contentCenterX, startYDetails + lineSpacing * 2 + 5, { align: 'center' });
  
  // Certificate Number
  doc.setFont('helvetica', 'normal');
  doc.text('Certificate Number:', contentCenterX, startYDetails + lineSpacing * 3, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(data.certificateNumber, contentCenterX, startYDetails + lineSpacing * 3 + 5, { align: 'center' });
  
  // Owner's Information with reduced padding
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text("Owner's Information", contentCenterX, 160, { align: 'center' }); // Reduced from 190

  const ownerY = 170; // Reduced from 205
  
  // Full Name
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Full Name:', contentCenterX, ownerY, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(data.ownerName, contentCenterX, ownerY + 5, { align: 'center' });
  
  // Address
  doc.setFont('helvetica', 'normal');
  doc.text('Address:', contentCenterX, ownerY + lineSpacing, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(data.ownerAddress, contentCenterX, ownerY + lineSpacing + 5, { align: 'center' });
  
  // Generate QR code with reduced size
  const qrSize = 30; // Reduced from 35
  const qrX = contentCenterX - qrSize/2;
  const qrY = 200; // Reduced from 240
  
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
      margin: 1, // Reduced from 2
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
    doc.text('QR Code Error', contentCenterX, qrY + qrSize/2, { align: 'center' });
  }
  
  // Date at bottom (footer) with less padding from bottom
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`This certificate is generated on ${new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })}`, contentCenterX, 270, { align: 'center' }); // Reduced from 280
  
  // Save the PDF
  doc.save(`certificate_${data.vin}_${new Date().toISOString()}.pdf`);
};



