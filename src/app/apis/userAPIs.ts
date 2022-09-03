import { User } from '../interface/user/user';
import { axiosClient } from './axiosClient';

export const userAPIs = {
  getUsers: () => {
    return axiosClient.get<unknown, User[]>(
      'QuanLyNguoiDung/LayDanhSachNguoiDung',
      {
        params: {
          maNhom: 'GP13',
        },
      }
    );
  },

  postUser: (user: User) => {
    return axiosClient.post('QuanLyNguoiDung/ThemNguoiDung', user);
  },
};
