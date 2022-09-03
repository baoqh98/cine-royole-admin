import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AppDispatch } from './app/store';
import { login } from './Modules/Auth/slice/authSlice';
import Layout from './UI/Layout/Pages/Layout';

const User = React.lazy(() => import('./Modules/User/Pages/UserPage'));

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // DUMMY ACCOUNT IN ORDER TO IMMEDIATELY ACCESS TO API
  useEffect(() => {
    dispatch(login({ taiKhoan: 'abc123', matKhau: '123456789' }));
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<User />} />
          <Route path='/movies' />
          <Route path='/showtimes' />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
