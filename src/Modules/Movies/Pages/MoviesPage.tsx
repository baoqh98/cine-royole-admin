import React, { useState } from 'react';
import {
  Container,
  Title,
  Space,
  createStyles,
  Group,
  Button,
  ActionIcon,
} from '@mantine/core';
import MovieTable from '../Components/MovieTable';
import MovieForm from '../Components/MovieForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { getMovieDetailData } from '../slice/movieSlice';
import { Movie } from '../../../app/interface/movie/movie';

const useStyle = createStyles((theme) => ({
  title: {
    textAlign: 'left',
    color: theme.colors.dark[3],
  },
}));

const MoviesPage = () => {
  const [movieDetail, setMovieDetail] = useState<Movie | undefined>();
  const { classes } = useStyle();
  const [isShowForm, setIsShowForm] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const getMovieDetailHandler = (movieId: string) => {
    setIsShowForm((prev) => !prev);
    dispatch(getMovieDetailData(movieId))
      .unwrap()
      .then((res) => {
        setMovieDetail(res);
      });
  };

  return (
    <Container fluid>
      <Title className={classes.title}>Quản lý Phim</Title>
      <Space h={16} />
      <Group>
        {!isShowForm && (
          <Button
            onClick={() => {
              setIsShowForm(true);
            }}
          >
            Thên Phim
          </Button>
        )}

        {isShowForm && (
          <ActionIcon
            sx={{
              fontSize: 24,
            }}
            color='gray'
            variant='transparent'
            onClick={() => {
              setIsShowForm(false);
              setMovieDetail(undefined);
            }}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </ActionIcon>
        )}
      </Group>
      <Space h={16} />
      {!isShowForm && <MovieTable onGetMovieId={getMovieDetailHandler} />}
      {isShowForm && <MovieForm movieDetail={movieDetail} />}
    </Container>
  );
};

export default MoviesPage;
