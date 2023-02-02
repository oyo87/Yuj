import React, { useEffect } from 'react';
import MainFooter from '../components/mainFooter/MainFooter';
import MainHeader from '../components/mainHeader/MainHeader';
import Styles from '../pages/ComponentsTest.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignIn from './Signin';
import Vidu from '../utils/FunctionalizedVidu'

const Test = () => {
  const location = useLocation();

  useEffect(() => { 
    console.log('경로 : ', location.pathname);
  }, [location])
  return (
    // <div className={Styles.wrapper}>
    <div>
      {location.pathname !== '/vidu' ? <MainHeader /> : null}
      <div className={Styles.contentWrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/vidu' element={<Vidu />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div> 
      {location.pathname !== '/vidu' ? <MainFooter /> : null}
    </div>
  )
}

export default Test