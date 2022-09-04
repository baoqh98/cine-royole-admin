import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunk = {
  getData: <T>(
    name: string,
    callbackGet: (searchQuery?: string) => Promise<T>
  ) => {
    const modifiedThunkFn = createAsyncThunk(
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
    return modifiedThunkFn;
  },
};
