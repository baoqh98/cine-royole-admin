import { Movie } from './../interface/movie/movie';
import { axiosClient } from './axiosClient';
import { maNhom } from './params';
export const movieAPIs = {
  getMovies: () => {
    const params = maNhom;
    return axiosClient.get<unknown, Movie[]>('QuanLyPhim/LayDanhSachPhim', {
      params: params,
    });
  },
};
