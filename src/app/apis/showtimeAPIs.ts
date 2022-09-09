import {
  Cluster,
  ShowtimeData,
  Theater,
} from './../interface/showtime/showtime';
import { axiosClient } from './axiosClient';
export const showtimeAPIs = {
  getTheaters: () => {
    return axiosClient.get<unknown, Theater[]>(
      'QuanLyRap/LayThongTinHeThongRap'
    );
  },

  getCluster: (maHeThongRap?: string) => {
    return axiosClient.get<unknown, Cluster[]>(
      'QuanLyRap/LayThongTinCumRapTheoHeThong',
      {
        params: {
          maHeThongRap,
        },
      }
    );
  },

  postShowtime: (showtimeData: ShowtimeData) => {
    return axiosClient.post('QuanLyDatVe/TaoLichChieu', showtimeData);
  },
};
