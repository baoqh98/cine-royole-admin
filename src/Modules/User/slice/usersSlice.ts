import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAPIs } from '../../../app/apis/userAPIs';
import { NewUser, User } from '../../../app/interface/user/user';
import { thunk } from './../../../app/apis/helper/thunkFunction';
import { maNhom } from './../../../app/apis/params';

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

const { getUsers, postUser } = userAPIs;

export const getUsersData = thunk.getData('user/getUsers', getUsers);

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

export const postUserData = thunk.postData('user/postUser', postUser);

// export const postUser = createAsyncThunk(
//   'user/postUser',
//   async (user: User, { rejectWithValue }) => {
//     try {
//       const { postUser } = userAPIs;
//       const data = await postUser(user);
//       return data;
//     } catch (error) {
//       throw rejectWithValue(error);
//     }
//   }
// );

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
      .addCase(getUsersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload as User[];
      })
      .addCase(getUsersData.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
