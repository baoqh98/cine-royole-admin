import React from 'react';
import { Alert, Loader } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

interface AlertState {
  isLoading: boolean;
  success: string;
  error: string;
}

interface Props {
  alertState: AlertState;
}

const FormAlert = ({ alertState }: Props) => {
  return (
    <>
      {alertState.isLoading && (
        <Alert
          icon={<Loader size={24} />}
          // title={userDetail ? 'Cập nhật người dùng' : 'Thêm người dùng'}
          color='indigo'
        >
          Đang tải...
        </Alert>
      )}
      {alertState.error && (
        <Alert
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
          // title={
          //   userDetail
          //     ? 'Cập nhật người dùng thất bại'
          //     : 'Thêm người dùng thất bại'
          // }
          color='red'
        >
          {alertState.error}
        </Alert>
      )}
      {alertState.success && (
        <Alert
          icon={<FontAwesomeIcon icon={faCheckCircle} />}
          // title={
          //   userDetail
          //     ? 'Cập nhật người dùng thành công'
          //     : 'Thêm người dùng thành công'
          // }
          color='green'
        >
          {alertState.success}
        </Alert>
      )}
    </>
  );
};

export default FormAlert;
