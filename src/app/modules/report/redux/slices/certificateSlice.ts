import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Report, ReportState } from '../../types';

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

// Define the API response interface to match the actual response
interface ApiVinInfo {
  vin: string | null;
  make: string | null;
  vehicle_year: string | null;
  vehicle_type: string | null;
  payment_status: string | null;
  origin_country: string | null;
}

interface ApiUser {
  full_name: string;
}

interface ApiSearchRecord {
  user: ApiUser;
  vin: ApiVinInfo | null;
  reference_num: string;
  status: string;
  qr_code_base64: string;
  slug: string;
  created_at: string;
}

// Async thunk for fetching reports - FIXED: Remove empty vins parameter
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error('No access token found');
      }
      
      // FIXED: Remove the empty vins parameter to get all search history
      const response = await fetch('https://cvms-api.afripointdev.com/vin/vin-search/?=', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle the API response - it should be an array based on your example
      if (Array.isArray(data)) {
        return data.map((record: ApiSearchRecord) => ({
          id: record.reference_num || Math.random().toString(36).substr(2, 9),
          title: 'VIN Search',
          vin: record.vin?.vin || record.slug || '',
          action: 'download' as const,
          downloadUrl: `/api/reports/${record.reference_num}/download`,
          isCertificate: true,
          vehicleDetails: {
            brand: record.vin?.make || 'Not available',
            model: record.vin?.vehicle_type || 'Not available',
            vehicle_year: record.vin?.vehicle_year || 'Not available',
            color: 'Not available',
            chassis_number: record.vin?.vin || ''
          }
        }));
      }
      
      return [];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch reports');
    }
  }
);

// FIXED: Also fix the specific VIN search function used in certificate download
export const fetchSpecificVinData = createAsyncThunk(
  'reports/fetchSpecificVinData',
  async (vin: string, { rejectWithValue }) => {
    try {
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error('No access token found');
      }
      
      // When searching for a specific VIN, use the vins parameter correctly
      const response = await fetch(
        `https://cvms-api.afripointdev.com/vin/vin-search/?vins=${encodeURIComponent(vin)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch VIN data');
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch VIN data');
    }
  }
);

// Async thunk for downloading a report
export const downloadReport = createAsyncThunk(
  'reports/downloadReport',
  async (reportId: number, { rejectWithValue }) => {
    try {
      // This should be replaced with actual download functionality
      // For now we just return the ID to acknowledge the action
      return reportId;
    } catch (error) {
      return rejectWithValue(`Failed to download report ${reportId}`);
    }
  }
);

// Async thunk for downloading a certificate
export const downloadCertificate = createAsyncThunk(
  'reports/downloadCertificate',
  async (reportId: number, { rejectWithValue }) => {
    try {
      // This should be replaced with actual download functionality
      // For now we just return the ID to acknowledge the action
      return reportId;
    } catch (error) {
      return rejectWithValue(`Failed to download certificate ${reportId}`);
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.loading = false;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSpecificVinData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificVinData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSpecificVinData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(downloadReport.fulfilled, (_state, action) => {
        console.log(`Successfully downloaded report ${action.payload}`);
      })
      .addCase(downloadCertificate.fulfilled, (_state, action) => {
        console.log(`Successfully downloaded certificate ${action.payload}`);
      });
  },
});

export const { addReport } = reportSlice.actions;
export default reportSlice.reducer;