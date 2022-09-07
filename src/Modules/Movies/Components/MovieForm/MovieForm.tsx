import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from 'react';
import { useForm } from '@mantine/form';

import {
  Container,
  Grid,
  TextInput,
  Button,
  Group,
  Space,
  Textarea,
  Slider,
  Chip,
  Box,
  createStyles,
  Badge,
  Image,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Movie, MovieFormType } from '../../../../app/interface/movie/movie';
import { useHover } from '@mantine/hooks';
import CustomizedFileInput from './CustomizedFileInput';
import { DatePicker } from '@mantine/dates';
import { maNhom } from '../../../../app/apis/params';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { postMovieData, updateMovieData } from '../../slice/movieSlice';
import FormAlert from '../FormAlert';

const useStyle = createStyles((theme) => ({
  customLabel: {
    display: 'inline-block',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 500,
    color: '#212529',
    wordBreak: 'break-word',
    cursor: 'default',
  },
  asterisk: {
    color: theme.colors.red,
  },
}));

interface AlertState {
  isLoading: boolean;
  success: string;
  error: string;
}
interface AlertAction {
  type: string;
  payload?: string;
}

const initialAlertState: AlertState = {
  isLoading: false,
  success: '',
  error: '',
};

const alertReducer = (state: AlertState, { type, payload }: AlertAction) => {
  switch (type) {
    case 'PENDING':
      return {
        ...initialAlertState,
        isLoading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: '',
        success: payload as string,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: payload as string,
        success: '',
      };
    case 'RESET':
      return {
        ...initialAlertState,
      };
    default:
      return state;
  }
};

interface MovieFormProps {
  movieDetail: Movie | undefined;
}

const MovieForm = ({ movieDetail }: MovieFormProps) => {
  const { classes } = useStyle();

  const [alertState, dispatchAlert] = useReducer(
    alertReducer,
    initialAlertState
  );
  const [hotChip, setHotChip] = useState<boolean>(false);
  const [dangChieuChip, setDangChieuChip] = useState<boolean>(false);
  const [sapChieuChip, setSapChieuChip] = useState<boolean>(false);
  const [danhGiaValue, setDanhGiaValue] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [pickDateValue, setPickDateValue] = useState<string>();
  const [preview, setPreview] = useState<string>();

  const { hovered, ref } = useHover();
  const dateRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      trailer: '',
      tenPhim: '',
      moTa: '',
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      ngayKhoiChieu: '',
    },
    // validate: {
    //   tenPhim: (value) => (value === '' ? 'Phải nhập tên phim' : null),
    //   moTa: (value) => (value === '' ? 'Chưa có mô tả phim' : null),
    //   ngayKhoiChieu: (value) =>
    //     value === '' ? 'Bạn phải chọn lịch chiếu' : null,
    // },
  });

  const resetFormHandler = () => {
    form.reset();
    setPreview(undefined);
  };

  const submitHandler = useCallback(
    async (values: MovieFormType) => {
      // dispatchAlert({ type: 'PENDING' });
      const date = new Date(values.ngayKhoiChieu);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      const ngayKhoiChieu = `${dd}/${mm}/${yyyy}`;

      // for (let key in values) {
      //   if (values[key as keyof typeof values] === values.trailer) continue;
      //   if (values[key as keyof typeof values] === values.ngayKhoiChieu)
      //     continue;
      //   if (values[key as keyof typeof values] === values.danhGia) {
      //     formData.append(key, `${values.danhGia.toFixed(1)}`);
      //     continue;
      //   }
      //   if (key === undefined) continue;
      //   formData.append(key, `${values[key as keyof typeof values]}`);
      // }

      console.log(values);
      const { tenPhim, danhGia, moTa, hot, dangChieu, sapChieu, trailer } =
        values;

      // formData.append('tenPhim', tenPhim);
      // formData.append('moTa', moTa);
      // formData.append('ngayKhoiChieu', ngayKhoiChieu);
      // formData.append('sapChieu', `${sapChieu}`);
      // formData.append('dangChieu', `${dangChieu}`);
      // formData.append('hot', `${hot}`);
      // formData.append('danhGia', `${danhGia.toFixed(1)}`);
      // formData.append('maNhom', maNhom);
      // formData.append('hinhAnh', selectedFile as File);
      // formData.append('ngayKhoiChieu', ngayKhoiChieu);

      try {
        if (movieDetail) {
          console.log('update');
          // let formData = new FormData();
          // formData.append('maPhim', `${movieDetail.maPhim}`);
          // formData.append('tenPhim', tenPhim);
          // formData.append('moTa', moTa);
          // formData.append('maPhim', maNhom);
          // formData.append('ngayKhoiChieu', ngayKhoiChieu);
          // formData.append('sapChieu', `${sapChieu}`);
          // formData.append('dangChieu', `${dangChieu}`);
          // formData.append('hot', `${hot}`);
          // formData.append('danhGia', `${danhGia.toFixed(1)}`);
          // formData.append('hinhAnh', selectedFile as Blob);

          // formData.forEach((item) => console.log(item));
          // const result = await dispatch(updateMovieData(formData)).unwrap();
          // dispatchAlert({
          //   type: 'SUCCESS',
          //   payload: 'Cập nhật phim thành công',
          // });
          // resetFormHandler();
          // return result;
        } else {
          console.log('post');
          let formData = new FormData();
          // formData.append('maPhim', `${movieDetail.maPhim}`);
          formData.append('tenPhim', tenPhim);
          formData.append('trailer', trailer);
          formData.append('moTa', moTa);
          formData.append('maPhim', maNhom);
          formData.append('ngayKhoiChieu', ngayKhoiChieu);
          formData.append('sapChieu', `${sapChieu}`);
          formData.append('dangChieu', `${dangChieu}`);
          formData.append('hot', `${hot}`);
          formData.append('danhGia', `${danhGia.toFixed(1)}`);
          formData.append('hinhAnh', selectedFile as Blob);
          console.log(formData.forEach((_, i) => console.log(i)));
          const result = await dispatch(postMovieData(formData)).unwrap();
          dispatchAlert({
            type: 'SUCCESS',
            payload: 'Thêm phim thành công',
          });
          // resetFormHandler();
          return result;
        }
      } catch (error) {
        console.log(error);
        dispatchAlert({ type: 'ERROR', payload: error as string });
      }
    },
    [selectedFile, movieDetail]
  );

  useEffect(() => {
    if (!movieDetail) return;
    const {
      tenPhim,
      trailer,
      danhGia,
      moTa,
      hot,
      dangChieu,
      sapChieu,
      ngayKhoiChieu,
      hinhAnh,
    } = movieDetail;
    const date = new Date(ngayKhoiChieu).toLocaleString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
    setPickDateValue(date);
    setPreview(hinhAnh);
    setDanhGiaValue(danhGia);

    form.setValues({
      tenPhim,
      trailer,
      danhGia,
      moTa,
      dangChieu,
      sapChieu,
      hot,
      ngayKhoiChieu: date.toString(),
    });
  }, [movieDetail]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl as string);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Container
      sx={{
        textAlign: 'left',
      }}
    >
      <form onSubmit={form.onSubmit(submitHandler)}>
        <Grid gutter='xl'>
          <Grid.Col sm={8}>
            <Grid>
              <Grid.Col sm={6}>
                <TextInput
                  placeholder='Nhập phim'
                  label='Tên phim'
                  withAsterisk
                  {...form.getInputProps('tenPhim')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  placeholder='Youtube URL trailer'
                  label='Trailer URL'
                  disabled={!!movieDetail}
                  {...form.getInputProps('trailer')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <DatePicker
                  placeholder={pickDateValue || 'Pick date'}
                  label='Ngày chiếu'
                  withAsterisk
                  ref={dateRef}
                  {...form.getInputProps('ngayKhoiChieu')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <label className={classes.customLabel}>
                  Đánh giá
                  <span> </span>
                  <span className={classes.asterisk}>*</span>
                  <Badge ml='md' color='yellow' variant='filled'>
                    {danhGiaValue?.toFixed(1)}
                  </Badge>
                </label>
                <Space h={4} />
                <Slider
                  defaultValue={40}
                  min={0}
                  max={10}
                  step={0.1}
                  color='yellow'
                  marks={[
                    { value: 10, label: '10' },
                    { value: 0, label: '0' },
                  ]}
                  ref={ref}
                  showLabelOnHover={false}
                  label={(value) => {
                    value.toFixed(1);
                  }}
                  onChangeEnd={(value) => {
                    setDanhGiaValue(value);
                  }}
                  styles={{
                    thumb: {
                      transition: 'opacity 150ms ease',
                      opacity: hovered ? 1 : 0,
                    },

                    dragging: {
                      opacity: 1,
                    },
                  }}
                  {...form.getInputProps('danhGia')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <Textarea
                  placeholder='Viết mô tả'
                  label='Viết mô tả'
                  withAsterisk
                  minRows={4}
                  {...form.getInputProps('moTa')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <label className={classes.customLabel}>
                  Trạng thái
                  <span> </span>
                  <span className={classes.asterisk}>*</span>
                </label>
                <Group spacing='xs'>
                  <Chip
                    checked={hotChip}
                    onChange={() => setHotChip((prev) => !prev)}
                    variant='filled'
                    radius='sm'
                    {...form.getInputProps('hot', { type: 'checkbox' })}
                  >
                    Hot
                  </Chip>
                  <Chip
                    checked={dangChieuChip}
                    onChange={() => setDangChieuChip((prev) => !prev)}
                    variant='filled'
                    radius='sm'
                    {...form.getInputProps('dangChieu', { type: 'checkbox' })}
                  >
                    Đang chiếu
                  </Chip>
                  <Chip
                    checked={sapChieuChip}
                    onChange={() => setSapChieuChip((prev) => !prev)}
                    variant='filled'
                    radius='sm'
                    {...form.getInputProps('sapChieu', { type: 'checkbox' })}
                  >
                    Sắp chiếu
                  </Chip>
                </Group>
              </Grid.Col>
            </Grid>
            <Grid mt={24}>
              <Grid.Col sm={12}>
                <Group position='left'>
                  <Button
                    onClick={resetFormHandler}
                    variant='light'
                    color='red'
                  >
                    Xóa tất cả
                  </Button>
                  <Button loading={alertState.isLoading} type='submit'>
                    {movieDetail ? 'Cập nhật' : 'Thêm'}
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col sm={4}>
            <CustomizedFileInput
              onChange={(payload) => setSelectedFile(payload as Blob)}
            />
            <Space h={24} />
            <Group>
              <Box>
                {preview && <Image width='100%' radius='md' src={preview} />}
              </Box>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
      <Space h={48} />
      <FormAlert alertState={alertState} />
    </Container>
  );
};

export default MovieForm;
