//ts-nocheck
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { hashRequestData } from '../../utils/hashRequestData';
import {reject} from "lodash";


export const GetContacts = createAsyncThunk(
  'GetContacts',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('getContacts', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);


export const SetContacts = createAsyncThunk(
  'SetContacts',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('setContact', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const DelContact = createAsyncThunk(
  'DelContact',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('delContact', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);


const initialState = {
  contacts: null,
  onSuccess: null,
  error: null,
  loaders: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GetContacts
    builder.addCase(GetContacts.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(GetContacts.fulfilled, (state, {payload}) => {
      state.loader = false;
      state.contacts = payload.contacts
    });
    builder.addCase(GetContacts.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message;
    });
    //SetContacts
    builder.addCase(SetContacts.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(SetContacts.fulfilled, (state) => {
      state.loader = false;
    });
    builder.addCase(SetContacts.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message;
    });
    //DelContact
    builder.addCase(DelContact.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(DelContact.fulfilled, (state, action) => {
      console.log(action.meta.arg.cid)
      state.contacts = reject(state.contacts, {cid: action.meta.arg.cid})
    });
    builder.addCase(DelContact.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message;
    });
  },
});

export default contactsSlice.reducer;
