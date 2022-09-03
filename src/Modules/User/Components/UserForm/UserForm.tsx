import React from 'react';

import {
  Alert,
  Button,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  PasswordInput,
  Radio,
  Space,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { User } from '../../../../app/interface/user/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { postUser } from '../../slice/usersSlice';

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

const UserForm = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const formValidate = useForm({
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

  const submitHandler = async (values: User) => {
    try {
      const data = await dispatch(postUser(values)).unwrap();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size={720}>
      <form onSubmit={formValidate.onSubmit(submitHandler)}>
        <Grid gutter='xl'>
          <Grid.Col sm={6}>
            <TextInput
              sx={{
                textAlign: 'left',
              }}
              placeholder='Nhập tài khoản'
              label='Tài khoản'
              withAsterisk
              {...formValidate.getInputProps('taiKhoan')}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <TextInput
              sx={{
                textAlign: 'left',
              }}
              placeholder='Nhập họ và tên'
              label='Họ tên'
              withAsterisk
              {...formValidate.getInputProps('hoTen')}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <TextInput
              sx={{
                textAlign: 'left',
              }}
              placeholder='Nhập email'
              label='Email'
              withAsterisk
              {...formValidate.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <PasswordInput
              sx={{
                textAlign: 'left',
              }}
              placeholder='Nhập mật khẩu'
              label='Mật khẩu'
              withAsterisk
              {...formValidate.getInputProps('matKhau')}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <TextInput
              sx={{
                textAlign: 'left',
              }}
              placeholder='Nhập số điện thoại'
              label='Số điện thoại'
              withAsterisk
              {...formValidate.getInputProps('soDT')}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <Radio.Group
              label='Chọn vai trò'
              withAsterisk
              {...formValidate.getInputProps('maLoaiNguoiDung')}
            >
              <Radio value='KhachHang' label='Khách hàng' />
              <Radio value='QuanTri' label='Quản trị' />
            </Radio.Group>
          </Grid.Col>
        </Grid>
        <Space h={32} />
        <Group position='right'>
          <Button
            onClick={() =>
              formValidate.setValues({
                taiKhoan: '',
                hoTen: '',
                matKhau: '',
                soDT: '',
                email: '',
                maLoaiNguoiDung: '',
              })
            }
            variant='light'
            color='red'
          >
            Xóa tất cả
          </Button>
          <Button type='submit'>Thêm</Button>
        </Group>
      </form>
    </Container>
  );
};

export default UserForm;
