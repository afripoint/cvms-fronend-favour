export interface VinSearchHistoryItem {
    user: {
      full_name: string;
    };
    vin: {
      vin: string;
      brand: string;
      vehicle_year: string;
      vehicle_type: string;
      payment_status: string;
      origin_country: string;
    };
    cert_num: string;
    status: string;
    qr_code_base64: string;
    slug: string;
    created_at: string;
  }
  
  // Create a service to fetch search history
  export const fetchSearchHistory = async (): Promise<VinSearchHistoryItem[]> => {
  try {
    // Get token from localStorage or your auth store
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch('https://cvms-backend-conversion.onrender.com/vin/search-history/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Add the token here
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch search history');
    }

    const data = await response.json();
    return data.Search_histories || [];
  } catch (error) {
    console.error('Error fetching search history:', error);
    throw error;
  }
};





// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Vehicle Certificate</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 0;
//             position: relative;
//         }
        
//         .document {
//             border-left: 20px solid black;
//             border-right: 20px solid lime;
//             border-top: 20px solid red;
//             border-bottom: 20px solid lime;
//             padding: 20px;
//             position: relative;
//             min-height: 100vh;
//             box-sizing: border-box;
//         }
        
//         .header {
//             display: flex;
//             align-items: center;
//             margin-bottom: 40px;
//         }
        
//         .logo {
//             width: 40px;
//             height: 40px;
//             margin-right: 10px;
//         }
        
//         .title {
//             font-size: 14px;
//             font-weight: bold;
//             line-height: 1.3;
//         }
        
//         h1 {
//             text-align: center;
//             font-size: 24px;
//             margin-bottom: 15px;
//         }
        
//         .description {
//             text-align: center;
//             margin-bottom: 40px;
//             font-size: 14px;
//         }
        
//         .section-title {
//             text-align: center;
//             font-weight: bold;
//             margin-bottom: 20px;
//             font-size: 16px;
//         }
        
//         .info-table {
//             width: 100%;
//             margin-bottom: 30px;
//         }
        
//         .info-table tr td:first-child {
//             text-align: right;
//             padding-right: 15px;
//             width: 40%;
//             font-weight: bold;
//             vertical-align: top;
//         }
        
//         .info-table tr td {
//             padding-bottom: 10px;
//             font-size: 14px;
//         }
        
//         .watermark {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             opacity: 0.05;
//             width: 300px;
//             height: 300px;
//             background-color: red;
//             border-radius: 50%;
//             z-index: -1;
//         }
        
//         .qr-code {
//             text-align: center;
//             margin-top: 40px;
//         }
        
//         .qr-code img {
//             width: 120px;
//             height: 120px;
//         }
        
//         .footer {
//             position: absolute;
//             bottom: 20px;
//             left: 0;
//             width: 100%;
//             text-align: center;
//             font-size: 12px;
//             color: #666;
//         }
//     </style>
// </head>
// <body>
//     <div class="document">
//         <div class="watermark"></div>
        
//         <div class="header">
//             <div class="logo">🛂</div>
//             <div class="title">
//                 Customs Verification<br>
//                 Management System
//             </div>
//         </div>
        
//         <h1>VEHICLE CERTIFICATE</h1>
        
//         <p class="description">
//             This is to certify that the customs duty for the following vehicle has been<br>
//             fully paid on the Trade Portal.
//         </p>
        
//         <div class="section-title">Vehicle Information</div>
        
//         <table class="info-table">
//             <tr>
//                 <td>VIN:</td>
//                 <td>1M2090323UDE08181761</td>
//             </tr>
//             <tr>
//                 <td>Make/ Model:</td>
//                 <td>Mack Truck USA + USED MACK TRUCK</td>
//             </tr>
//             <tr>
//                 <td>Year:</td>
//                 <td>2012</td>
//             </tr>
//             <tr>
//                 <td>Certificate Number:</td>
//                 <td>JDG-IHDOQH2900912UIE</td>
//             </tr>
//         </table>
        
//         <div class="section-title">Owner's Information</div>
        
//         <table class="info-table">
//             <tr>
//                 <td>Full Name:</td>
//                 <td>Yeez Alakae</td>
//             </tr>
//             <tr>
//                 <td>Address:</td>
//                 <td>5, Alhaji Mudashiru Street, Cola Avenue.</td>
//             </tr>
//         </table>
        
//         <div class="qr-code">
//             <img src="/api/placeholder/120/120" alt="QR Code">
//         </div>
        
//         <div class="footer">
//             This certificate is generated on June 20, 2025.
//         </div>
//     </div>
// </body>
// </html>