import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  Button,
  Container,
  createStyles,
  Group,
  Space,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import UserForm from '../Components/UserForm';
import UsersTable from '../Components/UsersTable';

const useStyle = createStyles((theme) => ({
  title: {
    textAlign: 'left',
    color: theme.colors.dark[3],
  },
}));

const User = () => {
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  const { classes } = useStyle();

  const setIsShowFormHandler = () => {
    setIsShowForm((prev) => !prev);
  };

  return (
    <Container fluid>
      <Title className={classes.title}>Quản lý phim</Title>
      <Space h={16} />
      <Group>
        {!isShowForm && (
          <Button onClick={setIsShowFormHandler}>Thên tài khoản</Button>
        )}
        {isShowForm && (
          <ActionIcon
            sx={{
              fontSize: 24,
            }}
            color='gray'
            variant='transparent'
            onClick={setIsShowFormHandler}
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </ActionIcon>
        )}
      </Group>
      <Space h={16} />
      {!isShowForm && <UsersTable />}
      {isShowForm && <UserForm />}
    </Container>
  );
};

export default User;
