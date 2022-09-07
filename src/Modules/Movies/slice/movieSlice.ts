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

const { getMovies, postMovie, deleteMovie, getMovieDetail, updateMovie } =
  movieAPIs;

export const getMoviesData = thunk.getData('movie/getMovies', getMovies);
export const getMovieDetailData = thunk.getDetailData(
  'movie/getMovieDetail',
  getMovieDetail
);
export const postMovieData = thunk.postData('movie/postMovie', postMovie);
export const updateMovieData = thunk.updateData(
  'movie/updateMovie',
  updateMovie
);
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
