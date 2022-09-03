import React, { useState } from 'react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  createStyles,
  Loader,
  Center,
} from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, userSelector } from '../../../../app/store';
import { getUsers } from '../../slice/usersSlice';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    zIndex: 100,
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'all ease 0.2s',

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

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const jobColors: Record<string, string> = {
  QuanTri: 'yellow',
  KhachHang: 'pink',
};

export default function UsersTable() {
  const { users, isLoading } = useSelector(userSelector);
  const dispatch = useDispatch<AppDispatch>();

  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const rows = users.map((item) => (
    <tr key={Math.random()}>
      <td>
        <Group spacing='sm'>
          <Text size='sm' weight={500}>
            {item.taiKhoan}
          </Text>
        </Group>
      </td>

      <td>
        <Group position='left'>
          <Text>{item.hoTen}</Text>
        </Group>
      </td>

      <td>
        <Group position='left'>
          <Badge
            color={jobColors[item.maLoaiNguoiDung]}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
          >
            {item.maLoaiNguoiDung}
          </Badge>
        </Group>
      </td>

      <td>
        <Group position='left'>
          <Anchor<'a'>
            size='sm'
            href='#'
            onClick={(event) => event.preventDefault()}
          >
            {item.email}
          </Anchor>
        </Group>
      </td>
      <td>
        <Group position='left'>
          <Text size='sm' color='dimmed'>
            {item.matKhau}
          </Text>
        </Group>
      </td>
      <td>
        <Group position='left'>
          <Text size='sm' color='dimmed'>
            {item.soDT}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon>
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
      sx={{ height: 720 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Tài khoản</th>
            <th>Họ và Tên</th>
            <th>Vai trò</th>
            <th>Email</th>
            <th>Mật khẩu</th>
            <th>Số điện thoại</th>
            <th />
          </tr>
        </thead>
        <tbody>{!isLoading && rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
