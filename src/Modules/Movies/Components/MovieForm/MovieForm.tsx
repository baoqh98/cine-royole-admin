import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from 'react';

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
  FileInput,
  NumberInput,
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
import { useForm } from '@mantine/form';

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
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [pickDateValue, setPickDateValue] = useState<string>();
  const [preview, setPreview] = useState<string>();

  const dateRef = useRef<HTMLInputElement>(null);

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
    validate: {
      tenPhim: (value) => (value === '' ? 'Bạn chưa nhập tên phim' : null),
      ngayKhoiChieu: (value) => (value === '' ? 'Chọn ngày khởi chiếu' : null),
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const resetFormHandler = () => {
    form.reset();
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const submitHandler = useCallback(
    async (values: MovieFormType) => {
      dispatchAlert({ type: 'PENDING' });
      try {
        const date = new Date(dateRef.current!.value);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        const ngayKhoiChieu = `${dd}/${mm}/${yyyy}`;

        if (movieDetail) {
          const result = await dispatch(
            updateMovieData({
              values,
              ngayKhoiChieu,
              selectedFile,
              maPhim: movieDetail.maPhim,
            })
          ).unwrap();
          dispatchAlert({
            type: 'SUCCESS',
            payload: 'Cập nhật phim thành công',
          });
          return result;
        } else {
          const result = await dispatch(
            postMovieData({ values, ngayKhoiChieu, selectedFile })
          ).unwrap();
          dispatchAlert({
            type: 'SUCCESS',
            payload: 'Thêm phim thành công',
          });
          resetFormHandler();
          return result;
        }
      } catch (error) {
        dispatchAlert({ type: 'ERROR', payload: error as string });
      }
    },
    [selectedFile, dispatch]
  );

  const onChangeImage = (file: Blob) => {
    setSelectedFile(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event: any) => {
      setPreview(event.target.result);
    };
  };

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
    form.setValues({
      tenPhim,
      trailer,
      danhGia,
      moTa,
      hot,
      dangChieu,
      sapChieu,
      ngayKhoiChieu: date,
    });
  }, [movieDetail]);

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
                  label='Trailer'
                  placeholder='Youtube URL trailer'
                  {...form.getInputProps('trailer')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <DatePicker
                  placeholder={pickDateValue || 'Pick date'}
                  label='Ngày chiếu'
                  ref={dateRef}
                  {...form.getInputProps('ngayKhoiChieu')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <NumberInput
                  min={0}
                  max={10}
                  step={0.1}
                  label='Đánh giá'
                  placeholder='Nhập số điểm'
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
              onChange={(payload) => onChangeImage(payload as File)}
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
