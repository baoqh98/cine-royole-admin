import { Loader, Space } from '@mantine/core';
import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AppDispatch } from './app/store';
import { login } from './Modules/Auth/slice/authSlice';
import Showtime404 from './Modules/Showtime/Components/Showtime404';
import Layout from './UI/Layout/Pages/Layout';

const UserPage = React.lazy(() => import('./Modules/User/Pages/UserPage'));
const MoviesPage = React.lazy(() => import('./Modules/Movies/Pages'));
const Showtime = React.lazy(() => import('./Modules/Showtime/Pages'));

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // DUMMY ACCOUNT IN ORDER TO IMMEDIATELY ACCESS TO API
  useEffect(() => {
    dispatch(login({ taiKhoan: 'nguyendai123', matKhau: 'npd123' }));
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
            <Route path='/showtime'>
              <Route path='' element={<Showtime404 />} />
              <Route path=':movieId' element={<Showtime />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
