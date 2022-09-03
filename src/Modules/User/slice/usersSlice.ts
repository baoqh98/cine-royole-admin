import { UserData } from './../../../app/interface/auth/auth';
import { maNhom } from './../../../app/apis/params';
import { authAPis } from './../../../app/apis/authAPIs';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAPIs } from '../../../app/apis/userAPIs';
import { NewUser, User } from '../../../app/interface/user/user';

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
  async (searchQuery: string | null, { rejectWithValue, dispatch }) => {
    try {
      const { getUsers } = userAPIs;
      const data = searchQuery ? await getUsers(searchQuery) : await getUsers();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const postToGetUser = createAsyncThunk(
//   'user/postToGetUser',
//   async (account: string, { rejectWithValue }) => {
//     try {
//       const { postToGetUser } = userAPIs;
//       const data = await postToGetUser(account);
//       console.log(data);
//       return data;
//     } catch (error) {
//       throw rejectWithValue(error);
//     }
//   }
// );

export const getUserDetail = createAsyncThunk(
  'user/getUserDetail',
  async (account: string, { rejectWithValue }) => {
    try {
      const { getUserDetail } = userAPIs;
      const data = await getUserDetail(account);
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const postUser = createAsyncThunk(
  'user/postUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const { postUser } = userAPIs;
      const newUser: NewUser = {
        ...user,
        maNhom,
      };
      const data = await postUser(newUser);
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const { updateUser } = userAPIs;
      const updatedUser: NewUser = {
        ...user,
        maNhom,
      };
      const data = await updateUser(updatedUser);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (account: string, { rejectWithValue }) => {
    try {
      const { deleteUser } = userAPIs;
      const data = await deleteUser(account);
      return data;
    } catch (error) {
      throw rejectWithValue(error);
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
