import React, { useEffect, useState } from 'react';
import { FileInput, FileInputProps, Group, Center } from '@mantine/core';
import { faFile, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  file: File | null;
}

function Value({ file }: Props) {
  return (
    <Center
      inline
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        fontSize: theme.fontSizes.xs,
        padding: '3px 7px',
        borderRadius: theme.radius.sm,
      })}
    >
      <FontAwesomeIcon icon={faFile} />
      <span
        style={{
          marginLeft: '8px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          maxWidth: 100,
          display: 'inline-block',
        }}
      >
        {file?.name}
      </span>
    </Center>
  );
}

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  return <Value file={value as File | null} />;
};

export default function CustomizedFileInput({ onChange }: FileInputProps) {
  return (
    <FileInput
      sx={{
        overflow: 'hidden',
      }}
      onChange={onChange}
      label='Poster'
      placeholder='Tải lên poster'
      valueComponent={ValueComponent}
      icon={<FontAwesomeIcon icon={faUpload} />}
      withAsterisk
    />
  );
}
