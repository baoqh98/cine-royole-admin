import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieAPIs } from './../../../app/apis/movieAPIs';
import { Movie } from './../../../app/interface/movie/movie';
import { thunk } from './../../../app/apis/helper/thunkFunction';

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string;
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  error: '',
};

const { getMovies, postMovie, deleteMovie } = movieAPIs;

export const getMoviesData = thunk.getData('movie/getMovies', getMovies);
export const postMovieData = thunk.postData('movie/postMovie', postMovie);
export const deleteMovieData = thunk.deleteData(
  'movie/deleteMovie',
  deleteMovie
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoviesData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.movies = payload as Movie[];
      })
      .addCase(getMoviesData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export default movieSlice.reducer;
