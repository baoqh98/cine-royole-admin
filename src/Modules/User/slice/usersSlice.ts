import { authAPis } from './../../../app/apis/authAPIs';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAPIs } from '../../../app/apis/userAPIs';
import { User } from '../../../app/interface/user/user';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { getUsers } = userAPIs;
      const data = await getUsers();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const postUser = createAsyncThunk(
  'user/postUser',
  async (user: User) => {
    try {
      const { postUser } = userAPIs;
      const data = await postUser(user);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload as User[];
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
