import React, { useRef, useState } from 'react';
import {
  Container,
  createStyles,
  Space,
  Title,
  Group,
  Button,
  ActionIcon,
  Grid,
  Input,
  Menu,
  Autocomplete,
  Box,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../app/interface/user/user';
import { AppDispatch, userSelector } from '../../../app/store';
import UserForm from '../Components/UserForm';
import UsersTable from '../Components/UsersTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getUserDetailData } from '../slice/usersSlice';

const useStyle = createStyles((theme) => ({
  title: {
    textAlign: 'left',
    color: theme.colors.dark[3],
  },
}));

const UserPage = () => {
  const [userDetail, setUserDetail] = useState<User | undefined>();
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { classes } = useStyle();

  const searchHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key !== 'Enter') return;

    setSearchQuery(searchRef.current!.value);
    setIsReset(true);
  };

  const resetHandler = () => {
    setSearchQuery('');
    setIsReset(false);
    searchRef.current!.value = '';
  };

  const setIsShowFormHandler = () => {
    setIsShowForm((prev) => !prev);
  };

  const getUserDetailHandler = (account: string) => {
    setIsShowFormHandler();
    dispatch(getUserDetailData(account))
      .unwrap()
      .then((data) => setUserDetail(data[0]));
  };

  return (
    <Container fluid>
      <Title className={classes.title}>Quản lý phim</Title>
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
                setUserDetail(undefined);
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
                placeholder='Tìm người dùng'
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
              setUserDetail(undefined);
              setIsShowForm(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </ActionIcon>
        )}
      </Group>

      {!isShowForm && (
        <UsersTable
          searchQuery={searchQuery}
          onGetAccount={getUserDetailHandler}
        />
      )}
      {isShowForm && <UserForm userDetail={userDetail} />}
    </Container>
  );
};

export default UserPage;
