import { Movie } from './../interface/movie/movie';
import { axiosClient } from './axiosClient';
import { maNhom } from './params';
export const movieAPIs = {
  getMovies: () => {
    const params = new URLSearchParams();
    params.append('maNhom', maNhom);
    return axiosClient.get<unknown, Movie[]>('QuanLyPhim/LayDanhSachPhim', {
      params,
    });
  },

  getMovieDetail: (movieId: string) => {
    const params = new URLSearchParams();
    params.append('MaPhim', movieId);
    return axiosClient.get<unknown, Movie>('QuanLyPhim/LayThongTinPhim', {
      params,
    });
  },

  postMovie: (formData: FormData) => {
    return axiosClient.post('QuanLyPhim/ThemPhimUploadHinh', formData);
  },

  updateMovie: (formData: FormData) => {
    return axiosClient.post('QuanLyPhim/CapNhatPhimUpload', formData);
  },

  deleteMovie: (id: string) => {
    const params = new URLSearchParams();
    params.append('MaPhim', id);
    return axiosClient.delete('QuanLyPhim/XoaPhim', {
      params: params,
    });
  },
};
