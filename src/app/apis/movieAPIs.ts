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

  postMovie: (formData: FormData) => {
    return axiosClient.post('QuanLyPhim/ThemPhimUploadHinh', formData);
  },

  deleteMovie: (id: string) => {
    const params = new URLSearchParams();
    params.append('MaPhim', id);
    return axiosClient.delete('QuanLyPhim/XoaPhim', {
      params: params,
    });
  },
};
