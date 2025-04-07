import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Report, ReportState } from '../../types';

const initialState: ReportState = {
  reports: [
    {
      id: 1,
      title: 'Vehicle Report',
      vin: '456QKLUK/DSPBHD',
      action: 'download',
      downloadUrl: '/api/reports/1/download',
      vehicleDetails: {
        brand: 'Mack Truck',
        model: 'USA + USED MACK TRUCK',
        vehicle_year: '2012',
        color: 'Black',
        chassis_number: '456QKLUK/DSPBHD'
      }
    },
    {
      id: 2,
      title: 'VIN Search',
      vin: '1M2090323UDE0B1B7G1',
      action: 'download',
      downloadUrl: '/api/reports/2/download',
      isCertificate: true,
      vehicleDetails: {
        brand: 'Mack Truck',
        model: 'USA + USED MACK TRUCK',
        vehicle_year: '2012',
        color: 'Black',
        chassis_number: '1M2090323UDE0B1B7G1'
      }
    }
  ],
  loading: false,
  error: null,
};

// Async thunk for fetching reports
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/reports');
      // const data = await response.json();
      // return data;
      
      // For now, we'll return mock data
      return initialState.reports;
    } catch (error) {
      return rejectWithValue('Failed to fetch reports');
    }
  }
);

// Async thunk for downloading a report
export const downloadReport = createAsyncThunk(
  'reports/downloadReport',
  async (reportId: number, { rejectWithValue }) => {
    try {
      // In a real app, this would trigger a file download
      console.log(`Downloading report ${reportId}`);
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
      // In a real app, this would trigger a certificate download
      console.log(`Downloading certificate ${reportId}`);
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
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.reports = action.payload;
        state.loading = false;
      })
      .addCase(fetchReports.rejected, (state, action) => {
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








