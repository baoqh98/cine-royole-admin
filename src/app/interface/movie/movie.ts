export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface MovieFormType
  extends Omit<
    Movie,
    'maNhom' | 'biDanh' | 'maPhim' | 'ngayKhoiChieu' | 'hinhAnh'
  > {
  ngayKhoiChieu: string;
}
