export interface Theater {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface Cluster {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: DanhSachRap[];
}

export interface DanhSachRap {
  maRap: number;
  tenRap: string;
}

export interface ShowtimeData {
  maPhim: number;
  ngayChieuGioChieu: string;
  maRap: string;
  giaVe: number;
}
