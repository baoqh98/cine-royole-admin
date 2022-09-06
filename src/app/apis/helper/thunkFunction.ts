import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunk = {
  getData: <T>(
    name: string,
    callbackGet: (searchQuery?: string) => Promise<T>
  ) => {
    const modifiedGetThunkFn = createAsyncThunk(
      name,
      async (searchQuery: string | null, { rejectWithValue }) => {
        try {
          const data = searchQuery
            ? await callbackGet(searchQuery)
            : await callbackGet();
          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );
    return modifiedGetThunkFn;
  },

  postData: <T>(name: string, callbackPost: (data: any) => Promise<T>) => {
    const modifiedPostThunkFn = createAsyncThunk(
      name,
      async (data: any, { rejectWithValue }) => {
        try {
          const result = await callbackPost(data);
          return result;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    return modifiedPostThunkFn;
  },

  deleteData: <T>(param: string, callbackDel: (data: any) => Promise<T>) => {
    const modifiedPostThunkFn = createAsyncThunk(
      param,
      async (data: any, { rejectWithValue }) => {
        try {
          const result = await callbackDel(data);
          return result;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    return modifiedPostThunkFn;
  },
};
