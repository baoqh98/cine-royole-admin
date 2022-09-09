import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../Modules/Auth/slice/authSlice';
import usersReducer from '../Modules/User/slice/usersSlice';
import movieReducer from '../Modules/Movies/slice/movieSlice';
import showtimeReducer from '../Modules/Showtime/slice/showtimeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    movies: movieReducer,
    showtime: showtimeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const authSelector = (state: RootState) => state.auth;
export const userSelector = (state: RootState) => state.users;
export const movieSelector = (state: RootState) => state.movies;
export const showtimeSelector = (state: RootState) => state.showtime;
