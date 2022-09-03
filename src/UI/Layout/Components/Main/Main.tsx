import { Box, Container, createStyles, Grid, Title } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';

const useStyle = createStyles((theme) => ({
  wrapper: {
    marginLeft: '345px',
    marginTop: 56,
    height: '100%',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
}));

const Main = () => {
  const { classes } = useStyle();
  return (
    <Box className={classes.wrapper}>
      <Outlet />
    </Box>
  );
};

export default Main;
