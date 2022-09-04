import React, { useEffect } from 'react';
import {
  Container,
  Title,
  Space,
  createStyles,
  Group,
  Button,
} from '@mantine/core';
import MovieTable from '../Components/MovieTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, movieSelector } from '../../../app/store';
import { getMoviesData } from '../slice/movieSlice';

const useStyle = createStyles((theme) => ({
  title: {
    textAlign: 'left',
    color: theme.colors.dark[3],
  },
}));

const MoviesPage = () => {
  const { classes } = useStyle();
  const { movies, isLoading } = useSelector(movieSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMoviesData(null));
  }, []);

  console.log(movies);

  return (
    <Container fluid>
      <Title className={classes.title}>Quản lý Phim</Title>
      <Space h={16} />
      <Group>
        <Button>Thêm phim</Button>
      </Group>
      <Space h={16} />
      <MovieTable data={movies} />
    </Container>
  );
};

export default MoviesPage;
