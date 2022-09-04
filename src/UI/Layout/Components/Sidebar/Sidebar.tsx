import { useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightArrowLeft,
  faCalendar,
  faTheaterMasks,
  faUserGroup,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '240px',
      height: '100vh',
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      fontSize: theme.fontSizes.md,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: '/', label: 'Quản lý người dùng', icon: faUserGroup },
  { link: '/movies', label: 'Quản lý phim', icon: faTheaterMasks },
  { link: '/showtimes', label: 'Quản lý lịch chiếu', icon: faCalendar },
];

export default function SideBar() {
  const { classes, cx } = useStyles();

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      key={item.label}
      className={({ isActive }) =>
        cx(classes.link, { [classes.linkActive]: isActive })
      }
    >
      <FontAwesomeIcon className={classes.linkIcon} icon={item.icon} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar className={classes.sidebar} p='md'>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          {/* <MantineLogo size={28} /> */}
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href='/'
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <FontAwesomeIcon
            className={classes.linkIcon}
            icon={faArrowRightArrowLeft}
          />

          <span>Change account</span>
        </a>

        <a
          href='/'
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <FontAwesomeIcon
            className={classes.linkIcon}
            icon={faRightFromBracket}
          />

          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
