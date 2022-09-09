import React, { useCallback, useEffect, useReducer, useState } from 'react';

import {
  Container,
  Title,
  Space,
  createStyles,
  Grid,
  Image,
  Text,
  Select,
  NumberInput,
  Group,
  Button,
  Alert,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { getMovieDetailData } from '../../Movies/slice/movieSlice';
import { Movie } from '../../../app/interface/movie/movie';
import { DatePicker, TimeInput } from '@mantine/dates';
import {
  getClusterData,
  getTheatersData,
  postShowtimeData,
} from '../slice/showtimeSlice';
import { Theater, Cluster } from '../../../app/interface/showtime/showtime';
import { useForm } from '@mantine/form';
import FormAlert from '../../../UI/FormAlert';

const useStyle = createStyles((theme) => ({
  title: {
    textAlign: 'left',
    color: theme.colors.dark[3],
  },

  movieTitle: {
    color: theme.colors.blue,
  },
  movieCode: {
    color: theme.colors.green,
  },
  form: {
    textAlign: 'left',
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

const Showtime = () => {
  const { classes } = useStyle();
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const [theaters, setTheaters] = useState<Theater[]>();
  const [clusterList, setClusterList] = useState<Cluster[] | null>(null);
  const [clusterCode, setClusterCode] = useState<string | null>(null);
  const [cluster, setCluster] = useState<string | null>(null);

  const [alertState, dispatchAlert] = useReducer(
    alertReducer,
    initialAlertState
  );

  const form = useForm({
    initialValues: {
      ngayChieu: '',
      gioChieu: '',
      giaVe: 0,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const initialShowtimeHandler = useCallback(async () => {
    try {
      const movieDetail = await dispatch(
        getMovieDetailData(movieId as string)
      ).unwrap();
      setMovieDetail(movieDetail);
      const theaters = await dispatch(getTheatersData(null)).unwrap();
      setTheaters(theaters);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initialShowtimeHandler();

    if (cluster) {
      setClusterList([]);
      dispatch(getClusterData(cluster))
        .unwrap()
        .then((data) => {
          setClusterList(data);
        });
    }
  }, [cluster]);

  const submitHandler = async (values: any) => {
    dispatchAlert({ type: 'PENDING' });

    try {
      const { giaVe, ngayChieu, gioChieu } = values;
      const date = new Date(ngayChieu);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      const dateShowtime = `${dd}/${mm}/${yyyy}`;
      const timeShowtime = new Date(gioChieu).toTimeString().slice(0, 8);

      const showtimeData = {
        maPhim: movieId ? +movieId : 0,
        maRap: clusterCode,
        giaVe: giaVe,
        ngayChieuGioChieu: `${dateShowtime} ${timeShowtime}`,
      };

      const result = await dispatch(postShowtimeData(showtimeData)).unwrap();
      dispatchAlert({
        type: 'SUCCESS',
        payload: result as unknown as string,
      });

      form.reset();
      return result;
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error as string });
    }
  };

  return (
    <>
      <Title className={classes.title}>Tạo lịch chiếu</Title>
      <Space h={16} />
      <Container size={900}>
        <Grid
          sx={{
            alignItems: 'center',
            textAlign: 'left',
          }}
        >
          <Grid.Col sm={6}>
            <Title className={classes.movieTitle} order={3}>
              {movieDetail?.tenPhim}
            </Title>
            <Text className={classes.movieCode}>- {movieDetail?.maPhim} -</Text>
            <Space h={16} />
            <Image
              height='480px'
              fit='contain'
              radius='md'
              src={movieDetail?.hinhAnh}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <Select
              label='Chọn hệ thống rạp'
              placeholder={'Chọn hệ thống rạp'}
              data={
                theaters?.map((item) => ({
                  value: item.maHeThongRap,
                  label: item.tenHeThongRap,
                })) || []
              }
              onChange={setCluster}
              withAsterisk
            />
            <Space h={16} />

            <Select
              label='Chọn cụm rạp'
              placeholder='Trống'
              data={
                clusterList?.map((item) => ({
                  value: item.maCumRap,
                  label: item.tenCumRap,
                })) || []
              }
              onChange={setClusterCode}
              withAsterisk
            />
            <Space h={16} />
            <form
              onSubmit={form.onSubmit(submitHandler)}
              className={classes.form}
            >
              <DatePicker
                label='Ngày chiếu'
                placeholder='Chọn ngày chiếu'
                {...form.getInputProps('ngayChieu')}
                withAsterisk
              />
              <Space h={16} />
              <TimeInput
                label='Giờ chiếu'
                placeholder='Chọn giờ chiếu'
                {...form.getInputProps('gioChieu')}
                withSeconds
                withAsterisk
              />
              <Space h={16} />
              <NumberInput
                min={75000}
                max={200000}
                label='Giá vé'
                {...form.getInputProps('giaVe')}
                withAsterisk
                hideControls
              />
              <Space h={16} />
              <Group>
                <Button type='submit'>Tạo lịch chiếu</Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
        <Space h={24} />
        <FormAlert alertState={alertState} />
      </Container>
    </>
  );
};

export default Showtime;
