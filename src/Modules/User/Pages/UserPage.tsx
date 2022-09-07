import React, { useEffect, useState } from 'react';
import {
  Container,
  createStyles,
  Space,
  Title,
  Group,
  Button,
  ActionIcon,
} from '@mantine/core';
import { useDispatch } from 'react-redux';
import { User } from '../../../app/interface/user/user';
import { AppDispatch } from '../../../app/store';
import UserForm from '../Components/UserForm';
import UsersTable from '../Components/UsersTable';
import { getUserDetail } from '../slice/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

const useStyle = createStyles((theme) => ({
  title: {
    textAlign: 'left',
    color: theme.colors.dark[3],
  },
}));

const UserPage = () => {
  const [userDetail, setUserDetail] = useState<User | undefined>();
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { classes } = useStyle();

  const setIsShowFormHandler = () => {
    setIsShowForm((prev) => !prev);
  };

  const getUserDetailHandler = (account: string) => {
    setIsShowFormHandler();
    dispatch(getUserDetail(account))
      .unwrap()
      .then((data) => setUserDetail(data[0]));
  };

  return (
    <Container fluid>
      <Title className={classes.title}>Quản lý phim</Title>
      <Space h={16} />

      <Group>
        {!isShowForm && (
          <Button
            onClick={() => {
              setIsShowForm(true);
              setUserDetail(undefined);
            }}
          >
            Thên tài khoản
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
              setUserDetail(undefined);
              setIsShowForm(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </ActionIcon>
        )}
      </Group>

      {!isShowForm && <UsersTable onGetAccount={getUserDetailHandler} />}
      {isShowForm && <UserForm userDetail={userDetail} />}
    </Container>
  );
};

export default UserPage;
