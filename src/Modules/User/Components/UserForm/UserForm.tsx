import React, { useEffect, useReducer } from 'react';

import {
  ActionIcon,
  Alert,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Loader,
  PasswordInput,
  Radio,
  Space,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { User } from '../../../../app/interface/user/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { postUserData, updateUser } from '../../slice/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface AlertState {
  isLoading: boolean;
  success: string;
  error: string;
}
interface AlertAction {
  type: string;
  payload?: string;
}

const initialAlertState: AlertState = {
  isLoading: false,
  success: '',
  error: '',
};

const alertReducer = (state: AlertState, { type, payload }: AlertAction) => {
  switch (type) {
    case 'PENDING':
      return {
        ...initialAlertState,
        isLoading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: '',
        success: payload as string,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: payload as string,
        success: '',
      };
    case 'RESET':
      return {
        ...initialAlertState,
      };
    default:
      return state;
  }
};

interface UserFormProps {
  userDetail: User | undefined;
}

const UserForm = ({ userDetail }: UserFormProps) => {
  const [alertState, dispatchAlert] = useReducer(
    alertReducer,
    initialAlertState
  );
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      taiKhoan: '',
      hoTen: '',
      email: '',
      soDT: '',
      matKhau: '',
      maLoaiNguoiDung: '',
    },
    validate: (values) => ({
      taiKhoan: values.taiKhoan === '' ? 'Không được để trống' : null,
      hoTen: values.hoTen === '' ? 'Không được để trống' : null,
      email: values.email === '' ? 'Không được để trống' : null,
      soDT: values.soDT === '' ? 'Không được để trống' : null,
      matKhau: values.matKhau === '' ? 'Không được để trống' : null,
      maLoaiNguoiDung:
        values.maLoaiNguoiDung === '' ? 'Không được để trống' : null,
    }),
  });

  const resetFormHandler = () => {
    form.reset();

    dispatchAlert({ type: 'RESET' });
  };

  const submitHandler = async (values: User) => {
    dispatchAlert({ type: 'PENDING' });
    try {
      if (userDetail) {
        const data = await dispatch(updateUser(values)).unwrap();
        dispatchAlert({
          type: 'SUCCESS',
          payload: 'Cập nhật người dùng thành công',
        });

        return data;
      } else {
        const data = await dispatch(postUserData(values)).unwrap();
        dispatchAlert({
          type: 'SUCCESS',
          payload: 'Thêm người dùng thành công',
        });
        form.reset();
        return data;
      }
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error as string });
    }
  };

  useEffect(() => {
    if (!userDetail) return;
    form.setValues({
      ...userDetail,
    });
  }, [userDetail]);

  return (
    <>
      <Space h={16} />
      <Container
        sx={{
          textAlign: 'left',
        }}
        size={720}
      >
        <form onSubmit={form.onSubmit(submitHandler)}>
          <Grid gutter='xl'>
            <Grid.Col sm={6}>
              <TextInput
                placeholder='Nhập tài khoản'
                label='Tài khoản'
                disabled={userDetail ? true : false}
                withAsterisk
                {...form.getInputProps('taiKhoan')}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <TextInput
                placeholder='Nhập họ và tên'
                label='Họ tên'
                withAsterisk
                {...form.getInputProps('hoTen')}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <TextInput
                placeholder='Nhập email'
                label='Email'
                withAsterisk
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <PasswordInput
                placeholder='Nhập mật khẩu'
                label='Mật khẩu'
                withAsterisk
                {...form.getInputProps('matKhau')}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <TextInput
                placeholder='Nhập số điện thoại'
                label='Số điện thoại'
                withAsterisk
                {...form.getInputProps('soDT')}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <Radio.Group
                label='Chọn vai trò'
                withAsterisk
                {...form.getInputProps('maLoaiNguoiDung')}
              >
                <Radio value='KhachHang' label='Khách hàng' />
                <Radio value='QuanTri' label='Quản trị' />
              </Radio.Group>
            </Grid.Col>
          </Grid>
          <Space h={32} />
          <Group position='right'>
            <Button onClick={resetFormHandler} variant='light' color='red'>
              Xóa tất cả
            </Button>
            <Button type='submit' loading={alertState.isLoading}>
              {userDetail && 'Cập nhật'}
              {!userDetail && 'Thêm'}
            </Button>
          </Group>
        </form>
        <Space h={48} />
        {alertState.isLoading && (
          <Alert
            icon={<Loader size={24} />}
            title={userDetail ? 'Cập nhật người dùng' : 'Thêm người dùng'}
            color='indigo'
          >
            Đang tải...
          </Alert>
        )}
        {alertState.error && (
          <Alert
            icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
            title={
              userDetail
                ? 'Cập nhật người dùng thất bại'
                : 'Thêm người dùng thất bại'
            }
            color='red'
          >
            {alertState.error}
          </Alert>
        )}
        {alertState.success && (
          <Alert
            icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
            title={
              userDetail
                ? 'Cập nhật người dùng thành công'
                : 'Thêm người dùng thành công'
            }
            color='green'
          >
            {alertState.success}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default UserForm;
