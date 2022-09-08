import { maNhom } from './params';
import { NewUser, User } from '../interface/user/user';
import { axiosClient } from './axiosClient';

export const userAPIs = {
  getUsers: (searchQuery?: string) => {
    const params = new URLSearchParams();
    params.append('maNhom', maNhom);
    if (searchQuery) {
      params.append('tuKhoa', searchQuery);
    }
    return axiosClient.get<unknown, User[]>(
      'QuanLyNguoiDung/LayDanhSachNguoiDung',
      {
        params: params,
      }
    );
  },

  getUserDetail: (account: string) => {
    const params = new URLSearchParams();
    params.append('maNhom', maNhom);
    params.append('tuKhoa', account);
    return axiosClient.get<unknown, User[]>(
      'QuanLyNguoiDung/TimKiemNguoiDung',
      {
        params: params,
      }
    );
  },

  postUser: (user: User) => {
    const newUser = {
      ...user,
      maNhom,
    };
    return axiosClient.post('QuanLyNguoiDung/ThemNguoiDung', newUser);
  },

  updateUser: (user: User) => {
    const updatedUser: NewUser = {
      ...user,
      maNhom,
    };
    return axiosClient.post(
      'QuanLyNguoiDung/CapNhatThongTinNguoiDung',
      updatedUser
    );
  },

  deleteUser: (account: string) => {
    const params = new URLSearchParams();
    params.append('TaiKhoan', account);
    return axiosClient.delete('QuanLyNguoiDung/XoaNguoiDung', {
      params: params,
    });
  },
};
