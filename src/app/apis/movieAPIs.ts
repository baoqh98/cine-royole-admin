import { Movie, MovieFormType } from './../interface/movie/movie';
import { axiosClient } from './axiosClient';
import { maNhom } from './params';
export const movieAPIs = {
  getMovies: (searchQuery?: string) => {
    const params = new URLSearchParams();
    params.append('maNhom', maNhom);
    if (searchQuery) {
      params.append('tenPhim', searchQuery);
    }
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

  postMovie: (data: any) => {
    const { values, selectedFile, ngayKhoiChieu } = data;
    const formData = new FormData();
    for (let key in values) {
      if (key === 'ngayKhoiChieu') {
        continue;
      }
      if (key === 'hinhAnh') {
        continue;
      }
      formData.append(key, `${values[key]}`);
    }
    formData.append('ngayKhoiChieu', ngayKhoiChieu);
    formData.append('maNhom', maNhom);
    formData.append('hinhAnh', selectedFile as Blob);

    return axiosClient.post('QuanLyPhim/ThemPhimUploadHinh', formData);
  },

  updateMovie: (data: any) => {
    const { values, selectedFile, ngayKhoiChieu, maPhim } = data;
    const formData = new FormData();
    for (let key in values) {
      if (key === 'ngayKhoiChieu') {
        continue;
      }
      if (key === 'hinhAnh') {
        continue;
      }
      formData.append(key, `${values[key]}`);
    }
    formData.append('ngayKhoiChieu', ngayKhoiChieu);
    formData.append('maNhom', maNhom);
    formData.append('maPhim', `${maPhim}`);
    formData.append('hinhAnh', selectedFile as Blob);

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
