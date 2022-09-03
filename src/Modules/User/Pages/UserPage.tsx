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
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../../../app/interface/user/user';
import { AppDispatch } from '../../../app/store';
import UserForm from '../Components/UserForm';
import UsersTable from '../Components/UsersTable';
import { getUserDetail } from '../slice/usersSlice';

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

  const getAccountDetailHandler = (account: string) => {
    setIsShowFormHandler();
    dispatch(getUserDetail(account))
      .unwrap()
      .then((data) => setUserDetail(data[0]));
  };

  return (
    <Container fluid>
      <Title className={classes.title}>Quản lý phim</Title>
      <Space h={16} />

      {!isShowForm && (
        <UsersTable
          onSetDefaultUser={() => setUserDetail(undefined)}
          onShowForm={setIsShowFormHandler}
          onGetAccount={getAccountDetailHandler}
        />
      )}
      {isShowForm && (
        <UserForm
          onSetDefaultUser={() => setUserDetail(undefined)}
          onShowTable={setIsShowFormHandler}
          userDetail={userDetail}
        />
      )}
    </Container>
  );
};

export default UserPage;
