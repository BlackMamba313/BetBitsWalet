import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { hashRequestData } from '../../utils/hashRequestData';
import { showToast } from '../../utils/ShowToast';

export const auth = createAsyncThunk(
  'auth',
  async (params, { rejectWithValue }) => {
    const telegram_id = params.id;
    const requestData = {telegram_id, ...params}
    try {
      const { data } = await axiosInstance.post('telegram_login/', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const getWallets = createAsyncThunk(
  'getWallets',
  async () => {
    try {
      const { data } = await axiosInstance.get('balances/');
      return data;
    } catch (error) {
      return error
    }
  }
);

export const transfer = createAsyncThunk(
  'transfer',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('transfer', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const getCurrencyRate = createAsyncThunk(
  'getCurrencyRate',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = {currency_name: params}
      const { data } = await axiosInstance.post('get_exchange_rate/', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const GetFiat = createAsyncThunk(
  'GetFiat',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('fiat_currencies_list/');
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const GetCrypto = createAsyncThunk(
  'GetCrypto',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('crypto_currencies_list/');
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const GetTrans = createAsyncThunk(
  'GetTrans',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('gettrans', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const GetStat = createAsyncThunk(
  'GetStat',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('getStat', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const SignContract = createAsyncThunk(
  'SignContract',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('signContract', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const SetUserData = createAsyncThunk(
  'SetUserData',
  async (params, { rejectWithValue }) => {
    try {
      const requestData = hashRequestData(params);
      const { data } = await axiosInstance.post('setuserdata', requestData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

const initialState = {
  user: {
    id: null,
    iso: 'USD'
  },
  wallets:  null,
  currentWallet: null,
  currentCripto: null,
  currentRate: null,
  fullBalance: null,
  rate: null,
  fiat: null,
  crypto: null,
  trans: null,
  refStat: null,
  isAuthenticated: false,
  isLoggedIn: false,
  onSuccess: null,
  error: null,
  loaders: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveWallet: (state, action) => {
      state.currentWallet = action.payload;
      if (state.rate)
        state.currentRate = parseFloat(( 1 / state.rate[`${state.user.iso}\\${action.payload.token || 'USDT'}`]).toFixed(2))
    },
  },
  extraReducers: (builder) => {
    //auth
    builder.addCase(auth.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(auth.fulfilled, (state, {payload}) => {
      const {access, refresh, user} = payload
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      state.isAuthenticated = true;
      state.loaders = false;
      state.user.id = user;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //getWallets
    builder.addCase(getWallets.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getWallets.fulfilled, (state, {payload}) => {
      state.wallets = payload;
    });
    builder.addCase(getWallets.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //transfer
    builder.addCase(transfer.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(transfer.fulfilled, (state, {meta, payload}) => {
      const { token, network } = meta.arg; // Извлекаем token и network из meta
      const remains = payload?.remains; // Извлекаем остаток баланса после операции
      // Находим кошелек, который соответствует условиям token и network
      if (remains) {
        const walletIndex = state.wallets.findIndex(wallet => wallet.token === token && wallet.network === network);
        if (walletIndex !== -1) {
          // Если кошелек найден, обновляем его баланс на остаток после операции
          state.wallets[walletIndex].balance = remains;
        }
      }
      state.isLoggedIn = true
      state.onSuccess = true;
    });
    builder.addCase(transfer.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.payload.msg;
      showToast({icon: 'error', title: action.payload.msg})
    });
    //getCurrencyRate
    builder.addCase(getCurrencyRate.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getCurrencyRate.fulfilled, (state, {payload}) => {
      state.rate = payload;
      state.onSuccess = true;
    });
    builder.addCase(getCurrencyRate.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //GetFiat
    builder.addCase(GetFiat.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(GetFiat.fulfilled, (state, {payload}) => {
      state.fiat = payload;
      state.onSuccess = true;
    });
    builder.addCase(GetFiat.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //GetCrypto
    builder.addCase(GetCrypto.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(GetCrypto.fulfilled, (state, {payload}) => {
      state.crypto = payload;
      state.onSuccess = true;
    });
    builder.addCase(GetCrypto.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //GetTrans
    builder.addCase(GetTrans.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(GetTrans.fulfilled, (state, {payload}) => {
      state.trans = payload;
      state.onSuccess = true;
    });
    builder.addCase(GetTrans.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //GetStat
    builder.addCase(GetStat.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(GetStat.fulfilled, (state, {payload}) => {
      state.refStat = payload;
      state.onSuccess = true;
    });
    builder.addCase(GetStat.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //SignContract
    builder.addCase(SignContract.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(SignContract.fulfilled, (state, {payload}) => {
      state.user.hasContract = payload;
      state.onSuccess = true;
    });
    builder.addCase(SignContract.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
    //SetUserData
    builder.addCase(SetUserData.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(SetUserData.fulfilled, (state, {payload}) => {
      state.user = payload.user;
      state.onSuccess = true;
    });
    builder.addCase(SetUserData.rejected, (state, action) => {
      state.loader = false; // Останавливаем индикатор загрузки
      state.error = action.error.message;
    });
  },
});

export const {
  setActiveWallet
} = authSlice.actions;
export default authSlice.reducer;
