import { showtimeAPIs } from './../../../app/apis/showtimeAPIs';
import { thunk } from './../../../app/apis/helper/thunkFunction';
import { createSlice } from '@reduxjs/toolkit';
import { Cluster, Theater } from '../../../app/interface/showtime/showtime';

interface ShowtimeState {
  theaters: Theater[];
  cluster: Cluster | null;
}
const initialState: ShowtimeState = {
  theaters: [],
  cluster: null,
};

const { getTheaters, getCluster, postShowtime } = showtimeAPIs;

export const getTheatersData = thunk.getData(
  'showtime/getTheaters',
  getTheaters
);
export const getClusterData = thunk.getData('showtime/getCluster', getCluster);
export const postShowtimeData = thunk.postData(
  'showtime/postShowtime',
  postShowtime
);

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default showtimeSlice.reducer;
