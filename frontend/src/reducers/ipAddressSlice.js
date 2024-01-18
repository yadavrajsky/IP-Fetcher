import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk for fetch IP Address
export const fetchIPAddress = createAsyncThunk('ipAddress/fetchIPAddress', async (address, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/ip?address=${address}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for inserting IP Addrress
export const insertIPAddress = createAsyncThunk('ipAddress/insertIPAddress', async (addressData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/ip', addressData);
        return response.data;
    } catch (error) {
        // Display an error message if the request fails
        return rejectWithValue(error.response.data);
    }
});

// Initial state
const initialState = {
    loading: false,
    error: null,
    message: null
};

// Create authSlice
const ipAddressSlice = createSlice({
    name: 'ipAddress',
    initialState,
    reducers: {
        resetNotificationState: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertIPAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;

            })
            .addCase(insertIPAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;

            })
            .addCase(insertIPAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchIPAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchIPAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(fetchIPAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

    },
});
export const { resetNotificationState } = ipAddressSlice.actions;

export default ipAddressSlice.reducer;
