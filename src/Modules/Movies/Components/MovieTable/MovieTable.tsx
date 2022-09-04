import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Image,
  Group,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { Movie } from '../../../../app/interface/movie/movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

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

interface TableScrollAreaProps {
  data: Movie[];
}

export default function MovieTable({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
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
        <Group>
          {row.dangChieu ? <Badge>Đang chiếu</Badge> : null}
          {row.hot ? <Badge color='red'>Hot</Badge> : null}
        </Group>
      </td>

      <td className={classes.align}>{row.danhGia}</td>
      <td className={`${classes.align} ${classes.desc}`}>{row.moTa}</td>
      <td className={classes.align}>
        {new Date(row.ngayKhoiChieu).toLocaleString()}
      </td>
      <td className={classes.align}>
        <Group position='left' spacing={4}>
          <ActionIcon color='green'>
            <FontAwesomeIcon icon={faPen} />
          </ActionIcon>
          <ActionIcon color='red'>
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      type='scroll'
      sx={{ height: 720 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
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
  );
}
