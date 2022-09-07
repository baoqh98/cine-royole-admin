import { useState, useEffect } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Image,
  Group,
  ActionIcon,
  Badge,
  Space,
  Title,
  Modal,
  Text,
  Button,
} from '@mantine/core';
import { Movie } from '../../../../app/interface/movie/movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, movieSelector } from '../../../../app/store';
import { deleteMovieData, getMoviesData } from '../../slice/movieSlice';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  desc: {
    width: '300px',
  },

  status: {
    width: 'fit-content',
  },

  trailer: {
    width: '24px',
  },

  align: {
    textAlign: 'left',
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface MovieTableProps {
  onGetMovieId: (movieId: string) => void;
}

export default function MovieTable({ onGetMovieId }: MovieTableProps) {
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const { classes, cx } = useStyles();
  const [isModalOpened, setIsModalOpen] = useState<boolean>(false);
  const [movieInfo, setMovieInfo] = useState<{
    movieId: string;
    movieName: string;
  }>();
  const [status, setStatus] = useState<unknown>();
  const [scrolled, setScrolled] = useState(false);
  const { movies } = useSelector(movieSelector);

  const dispatch = useDispatch<AppDispatch>();

  const getMovieIdHandler = (movieId: string) => {};

  const openDeleteModalHandler = (movieId: string, movieName: string) => {
    setIsModalOpen(true);
    setMovieInfo({
      movieId,
      movieName,
    });
  };

  const deleteAccountHandler = async (movieId: string) => {
    try {
      const data = await dispatch(deleteMovieData(movieId)).unwrap();
      setStatus(data);
      dispatch(getMoviesData(null));
    } catch (error) {
      setStatus(error);
    }
  };

  useEffect(() => {
    dispatch(getMoviesData(null));
  }, []);

  const rows = movies.map((row) => (
    <tr key={row.maPhim}>
      <td className={classes.align}>{row.tenPhim}</td>
      <td className={classes.align}>
        <Image
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          fit='contain'
          width='100px'
          src={row.hinhAnh}
        />
      </td>

      <td className={classes.align}>{row.biDanh}</td>
      <td className={`${classes.align} ${classes.status}`}>
        <Group
          sx={{
            flexDirection: 'column',
          }}
        >
          {row.dangChieu ? <Badge>Đang chiếu</Badge> : null}
          {row.hot ? <Badge color='red'>Hot</Badge> : null}
          {row.sapChieu ? <Badge color='green'>Sap chiếu</Badge> : null}
        </Group>
      </td>

      <td className={classes.align}>{row.danhGia}</td>
      <td className={`${classes.align} ${classes.desc}`}>{row.moTa}</td>
      <td className={classes.align}>
        {new Date(row.ngayKhoiChieu).toLocaleString()}
      </td>
      <td className={classes.align}>
        <Group position='left' spacing={4}>
          <ActionIcon
            color='green'
            onClick={() => onGetMovieId(`${row.maPhim}`)}
          >
            <FontAwesomeIcon icon={faPen} />
          </ActionIcon>
          <ActionIcon
            onClick={() => openDeleteModalHandler(`${row.maPhim}`, row.tenPhim)}
            color='red'
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        title='Bạn có chắc chắn xóa phim?'
        opened={isModalOpened}
        onClose={() => setIsModalOpen(false)}
        centered
        overlayBlur={4}
      >
        <Group position='center'>
          <Title order={3} color='green'>
            {`Mã phim: ${movieInfo?.movieId} - Tên: ${movieInfo?.movieName}`}
          </Title>
        </Group>
        <Space h={16} />
        <Group position='center'>
          <Text
            sx={{
              textAlign: 'center',
            }}
            color='red'
          >
            {status as string}
          </Text>
        </Group>
        <Space h={16} />
        <Group position='right'>
          <Button
            color='blue'
            variant='light'
            onClick={() => {
              setIsModalOpen(false);
              setStatus(undefined);
            }}
          >
            Thoát
          </Button>

          <Button
            color='red'
            onClick={() => deleteAccountHandler(movieInfo!.movieId)}
          >
            Xóa tài khoản
          </Button>
        </Group>
      </Modal>

      <ScrollArea
        type='scroll'
        sx={{ height: 720 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Tên phim</th>
              <th>Hình ảnh</th>
              <th>Bí danh</th>
              <th>Trạng thái</th>
              <th>Đánh giá</th>
              <th>Mô tả</th>
              <th>Ngày chiếu</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
