import { Container } from '@mantine/core';
import HeaderSearch from '../Components/HeaderSearch';
import Main from '../Components/Main';
import Sidebar from '../Components/Sidebar';

const Layout = () => {
  return (
    <Container fluid>
      <Sidebar />
      <HeaderSearch />
      <Main />
    </Container>
  );
};

export default Layout;
