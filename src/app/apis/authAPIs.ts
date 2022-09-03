import { axiosClient } from './axiosClient';

import { UserData, UserLogin } from '../interface/auth/auth';

export const authAPis = {
  login: (user: UserLogin) => {
    return axiosClient.post<unknown, UserData>(
      'QuanLyNguoiDung/DangNhap',
      user
    );
  },
};
