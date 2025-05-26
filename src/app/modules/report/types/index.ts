// export interface ReportItem {
//   id: string;
//   title: string;
//   description: string;
//   status: 'available' | 'processing';
//   actionLabel: string;
//   actionColor: string;
// }

// export interface Report {
//   id: number;
//   title: string;
//   vin: string;
//   action: 'download' | 'view';
//   downloadUrl?: string;
//   viewUrl?: string;
//   isCertificate?: boolean;
// }

// export interface ReportState {
//   reports: Report[];
//   loading: boolean;
//   error: string | null;
// }




// export interface ReportItem {
//   id: string;
//   title: string;
//   description: string;
//   status: 'available' | 'processing';
//   actionLabel: string;
//   actionColor: string;
// }

// export interface VehicleDetails {
//   brand?: string;
//   model?: string;
//   vehicle_year?: string;
//   color?: string;
//   chassis_number?: string;
// }

// export interface Report {
//   id: number;
//   title: string;
//   vin: string;
//   action: 'download' | 'view';
//   downloadUrl?: string;
//   viewUrl?: string;
//   isCertificate?: boolean;
//   vehicleDetails?: VehicleDetails;
// }

// export interface ReportState {
//   reports: Report[];
//   loading: boolean;
//   error: string | null;
// }

// export interface UserProfile {
//   id?: string;
//   fullName: string;
//   email?: string;
//   address: string;
//   phone?: string;
// }

// export interface AuthState {
//   user: UserProfile | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// export interface VehicleCertificateData{
//   vin: string;
//   make: string;
//   model: string;
//   year: string;
//   certificateNumber: string;
//   ownerName: string;  
//   ownerAddress: string; 
//   date: Date;
   
// };






export interface ReportItem {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'processing';
  actionLabel: string;
  actionColor: string;
}

export interface VehicleDetails {
  brand?: string;
  model?: string;
  vehicle_year?: string;
  color?: string;
  chassis_number?: string;
}

export interface Report {
  id: number | string; // Allow both number and string for flexibility
  title: string;
  vin: string;
  action: 'download' | 'view';
  downloadUrl?: string;
  viewUrl?: string;
  isCertificate?: boolean;
  vehicleDetails?: VehicleDetails;
}

export interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

export interface UserProfile {
  id?: string;
  fullName: string;
  email?: string;
  address: string;
  phone?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface VehicleCertificateData {
  vin: string;
  makeModel: string; // Changed from separate make/model to makeModel to match usage
  model: string;
  year: string;
  certificateNumber: string;
  ownerName: string;  
  ownerAddress: string; 
  date: string; // Changed from Date to string since you're formatting it
  qrCodeBase64?: string; // Made optional and added this field
}
