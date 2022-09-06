import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from '@mantine/form';

import {
  Container,
  Grid,
  TextInput,
  Button,
  Alert,
  Loader,
  Group,
  Space,
  Textarea,
  NumberInput,
  Slider,
  Chip,
  Box,
  createStyles,
  Badge,
  Image,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faClock,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { MovieFormType } from '../../../../app/interface/movie/movie';
import { useHover } from '@mantine/hooks';
import CustomizedFileInput from './CustomizedFileInput';
import { DatePicker } from '@mantine/dates';
import { maNhom } from '../../../../app/apis/params';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { postMovieData } from '../../slice/movieSlice';

const useStyle = createStyles((theme) => ({
  customLabel: {
    display: 'inline-block',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 500,
    color: '#212529',
    wordBreak: 'break-word',
    cursor: 'default',
  },
  asterisk: {
    color: theme.colors.red,
  },
}));

const MovieForm = () => {
  const { classes } = useStyle();
  const [hotChip, setHotChip] = useState<boolean>(false);
  const [dangChieuChip, setDangChieuChip] = useState<boolean>(false);
  const [sapChieuChip, setSapChieuChip] = useState<boolean>(false);
  const [danhGiaValue, setDanhGiaValue] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>();

  const { hovered, ref } = useHover();
  const dateRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      trailer: '',
      tenPhim: '',
      moTa: '',
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      ngayKhoiChieu: '',
    },
    validate: {
      tenPhim: (value) => (value === '' ? 'Phải nhập tên phim' : null),
      trailer: (value) => (value === '' ? 'Phải nhập trailer' : null),
      moTa: (value) => (value === '' ? 'Chưa có mô tả phim' : null),
      ngayKhoiChieu: (value) =>
        value === '' ? 'Bạn phải chọn giờ chiếu' : null,
    },
  });

  const resetFormHandler = () => {
    form.reset();
  };

  const submitHandler = async (values: MovieFormType) => {
    const date = new Date(values.ngayKhoiChieu);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const ngayKhoiChieu = `${dd}/${mm}/${yyyy}`;

    let formData = new FormData();
    for (let key in values) {
      if (values[key as keyof typeof values] === values.ngayKhoiChieu) continue;
      formData.append(key, `${values[key as keyof typeof values]}`);
    }

    formData.append('ngayKhoiChieu', ngayKhoiChieu);
    formData.append('hinhAnh', selectedFile as Blob);
    formData.append('maNhom', maNhom);
    try {
      const result = await dispatch(postMovieData(formData)).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl as string);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Container
      sx={{
        textAlign: 'left',
      }}
    >
      <form onSubmit={form.onSubmit(submitHandler)}>
        <Grid gutter='xl'>
          <Grid.Col sm={8}>
            <Grid>
              <Grid.Col sm={6}>
                <TextInput
                  placeholder='Nhập phim'
                  label='Tên phim'
                  withAsterisk
                  {...form.getInputProps('tenPhim')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  placeholder='Youtube URL trailer'
                  label='Trailer URL'
                  withAsterisk
                  {...form.getInputProps('trailer')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <DatePicker
                  placeholder='Pick date'
                  label='Ngày chiếu'
                  withAsterisk
                  ref={dateRef}
                  {...form.getInputProps('ngayKhoiChieu')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <label className={classes.customLabel}>
                  Đánh giá
                  <span> </span>
                  <span className={classes.asterisk}>*</span>
                  <Badge ml='md' color='yellow' variant='filled'>
                    {danhGiaValue?.toFixed(1)}
                  </Badge>
                </label>
                <Space h={4} />
                <Slider
                  defaultValue={40}
                  min={0}
                  max={10}
                  step={0.1}
                  color='yellow'
                  marks={[
                    { value: 10, label: '10' },
                    { value: 0, label: '0' },
                  ]}
                  ref={ref}
                  showLabelOnHover={false}
                  label={(value) => value.toFixed(1)}
                  onChangeEnd={(value) => setDanhGiaValue(value)}
                  styles={{
                    thumb: {
                      transition: 'opacity 150ms ease',
                      opacity: hovered ? 1 : 0,
                    },

                    dragging: {
                      opacity: 1,
                    },
                  }}
                  {...form.getInputProps('danhGia')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <label className={classes.customLabel}>
                  Trạng thái
                  <span> </span>
                  <span className={classes.asterisk}>*</span>
                </label>
                <Group spacing='xs'>
                  <Chip
                    checked={hotChip}
                    onChange={() => setHotChip((prev) => !prev)}
                    variant='filled'
                    radius='sm'
                    {...form.getInputProps('hot', { type: 'checkbox' })}
                  >
                    Hot
                  </Chip>
                  <Chip
                    checked={dangChieuChip}
                    onChange={() => setDangChieuChip((prev) => !prev)}
                    variant='filled'
                    radius='sm'
                    {...form.getInputProps('dangChieu', { type: 'checkbox' })}
                  >
                    Đang chiếu
                  </Chip>
                  <Chip
                    checked={sapChieuChip}
                    onChange={() => setSapChieuChip((prev) => !prev)}
                    variant='filled'
                    radius='sm'
                    {...form.getInputProps('sapChieu', { type: 'checkbox' })}
                  >
                    Sắp chiếu
                  </Chip>
                </Group>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Textarea
                  placeholder='Viết mô tả'
                  label='Viết mô tả'
                  withAsterisk
                  minRows={3}
                  {...form.getInputProps('moTa')}
                />
              </Grid.Col>
            </Grid>
            <Grid mt={24}>
              <Grid.Col sm={12}>
                <Group position='left'>
                  <Button
                    onClick={resetFormHandler}
                    variant='light'
                    color='red'
                  >
                    Xóa tất cả
                  </Button>
                  <Button type='submit'>Thêm</Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col sm={4}>
            <CustomizedFileInput
              onChange={(payload) => setSelectedFile(payload as Blob)}
            />
            <Space h={24} />
            <Group>
              <Box>
                {preview && selectedFile && (
                  <Image width='100%' radius='md' src={preview} />
                )}
              </Box>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
      <Space h={48} />
      <Alert icon={<Loader size={24} />} color='indigo'>
        Đang tải...
      </Alert>
      <Alert
        icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
        color='red'
      >
        things...
      </Alert>
      <Alert icon={<FontAwesomeIcon icon={faCheckCircle} />} color='green'>
        things...
      </Alert>
    </Container>
  );
};

export default MovieForm;
