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

  getDetailData: <T>(
    name: string,
    callbackGetDetail: (params: string) => Promise<T>
  ) => {
    const modifiedGetDetailThunkFn = createAsyncThunk(
      name,
      async (data: string, { rejectWithValue }) => {
        try {
          const result = await callbackGetDetail(data);
          return result;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    return modifiedGetDetailThunkFn;
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

  updateData: <T>(name: string, callbackUpdate: (data: any) => Promise<T>) => {
    const modifiedUpdateThunkFn = createAsyncThunk(
      name,
      async (data: any, { rejectWithValue }) => {
        try {
          const result = await callbackUpdate(data);
          return result;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );

    return modifiedUpdateThunkFn;
  },

  deleteData: <T>(param: string, callbackDel: (data: any) => Promise<T>) => {
    const modifiedDeleteThunkFn = createAsyncThunk(
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

    return modifiedDeleteThunkFn;
  },
};
