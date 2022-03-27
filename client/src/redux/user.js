import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login, register } from 'services/authService';

const initialStateValue = {
  user: null,
  isFetching: false,
  error: false,
};

const tokenKey = 'accessToken';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000

  if (Date.now() > expiredToken) {
    localStorage.removeItem(tokenKey);
  } else {
    initialStateValue.user = decodedToken;
  }
}

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const { data } = await login(credentials);
    localStorage.setItem(tokenKey, data.accessToken);
    return data;
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (credentials) => {
    const { data } = await register(credentials);
    localStorage.setItem(tokenKey, data.accessToken);
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', () => {
  return localStorage.removeItem(tokenKey);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateValue,
  extraReducers: {
    [loginUserAsync.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.user = payload;
    },
    [loginUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    [registerUserAsync.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.user = payload;
    },
    [registerUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
