import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPis } from '../../../app/apis/authAPIs';
import { UserData, UserLogin } from '../../../app/interface/auth/auth';

interface AuthState {
  data: UserData | null;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  data: null,
  isLoading: false,
  error: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (user: UserLogin, { rejectWithValue }) => {
    try {
      const { login } = authAPis;
      const data = await login(user);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        state.data = payload as UserData;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
