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
          color='indigo'
        >
          Đang tải...
        </Alert>
      )}
      {alertState.error && (
        <Alert
          icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
          color='red'
        >
          {alertState.error}
        </Alert>
      )}
      {alertState.success && (
        <Alert
          icon={<FontAwesomeIcon icon={faCheckCircle} />}
          color='green'
        >
          {alertState.success}
        </Alert>
      )}
    </>
  );
};

export default FormAlert;
