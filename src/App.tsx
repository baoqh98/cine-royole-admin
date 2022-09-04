import { Loader, Space } from '@mantine/core';
import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AppDispatch } from './app/store';
import { login } from './Modules/Auth/slice/authSlice';
import Layout from './UI/Layout/Pages/Layout';

const UserPage = React.lazy(() => import('./Modules/User/Pages/UserPage'));
const MoviesPage = React.lazy(() => import('./Modules/Movies/Pages'));

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // DUMMY ACCOUNT IN ORDER TO IMMEDIATELY ACCESS TO API
  useEffect(() => {
    dispatch(login({ taiKhoan: 'abc123', matKhau: '123456789' }));
  }, []);

  return (
    <div className='App'>
      <Suspense
        fallback={
          <>
            <Space h={160} />
            <Loader size={50} />
          </>
        }
      >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<UserPage />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/showtimes' />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
