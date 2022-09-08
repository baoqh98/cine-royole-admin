import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    left: '240px',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: theme.colors.blue,
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string; icon?: any }[];
}

const HeaderData: HeaderSearchProps = {
  links: [
    { link: 'https://cineroyole.vercel.app/', label: 'Go to CineRoyole App' },
    {
      link: 'https://github.com/hoquocbaoproton/cineroyole',
      label: 'GitHub CineRoyole',
    },
    {
      link: 'https://github.com/hoquocbaoproton/cine-royole-admin',
      label: 'GitHub CineRoyole Admin',
    },
    {
      link: 'https://github.com/hoquocbaoproton/cineroyole',
      label: 'My Portfolio',
    },
  ],
};

export default function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = HeaderData.links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      {link.label}
      {link.icon}
    </a>
  ));

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size='sm' />
          {/* <MantineLogo size={28} /> */}
          <Title className={classes.title} order={2}>
            Cine Royole Adminstration
          </Title>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          {/* <Autocomplete
            className={classes.search}
            placeholder='Search'
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            data={[
              'React',
              'Angular',
              'Vue',
              'Next.js',
              'Riot.js',
              'Svelte',
              'Blitz.js',
            ]}
          /> */}
        </Group>
      </div>
    </Header>
  );
}
