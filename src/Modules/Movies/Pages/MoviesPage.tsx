import React, { useState, useRef } from 'react';
import {
  Container,
  Title,
  Space,
  createStyles,
  Group,
  Button,
  ActionIcon,
  Input,
} from '@mantine/core';
import MovieTable from '../Components/MovieTable';
import MovieForm from '../Components/MovieForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchRef = useRef<HTMLInputElement>(null);
  const searchHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key !== 'Enter') return;
    setIsReset(true);
    setSearchQuery(searchRef.current!.value);
  };

  const dispatch = useDispatch<AppDispatch>();

  const resetHandler = () => {
    setSearchQuery('');
    setIsReset(false);
    searchRef.current!.value = '';
  };

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
          <Group
            position='apart'
            sx={{
              width: '100%',
            }}
          >
            <Button
              onClick={() => {
                setIsShowForm(true);
                setMovieDetail(undefined);
              }}
            >
              Thên tài khoản
            </Button>
            <Group>
              {isReset && (
                <Button
                  onClick={resetHandler}
                  size='xs'
                  color='gray'
                  variant='subtle'
                >
                  Reset
                </Button>
              )}
              <Input
                placeholder='Tìm phim'
                icon={<FontAwesomeIcon icon={faSearch} />}
                type='text'
                sx={{
                  minWidth: '300px',
                }}
                ref={searchRef}
                onKeyDown={searchHandler}
              />
            </Group>
          </Group>
        )}

        {isShowForm && (
          <ActionIcon
            sx={{
              fontSize: 24,
            }}
            color='gray'
            variant='transparent'
            onClick={() => {
              setMovieDetail(undefined);
              setIsShowForm(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </ActionIcon>
        )}
      </Group>
      {/* <Group>
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
      </Group> */}
      <Space h={16} />
      {!isShowForm && (
        <MovieTable
          searchQuery={searchQuery}
          onGetMovieId={getMovieDetailHandler}
        />
      )}
      {isShowForm && <MovieForm movieDetail={movieDetail} />}
    </Container>
  );
};

export default MoviesPage;
