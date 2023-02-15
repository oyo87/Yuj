import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { searchLectures } from '../stores/lectureSlice';
import { searchTeachers } from '../stores/studioSlice';
import { useDispatch } from 'react-redux';

const HomePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //전체 검색 창으로 이동 -> keyword는 ''
  const goSearchPage = () => {
    navigate('/search', {state:{keyword:''}});
    dispatch(searchLectures(''));
    dispatch(searchTeachers(''));
  }

  return (
    <>
      <div className='flex items-center object-cover mx-40 overflow-hidden' style={{ height: 'calc(100vh - 125px)' }}>
        <div className='relative'>
          <img src='./assets/YujHomeImage.png'></img>
          <div className='absolute top-1/2 left-1/2' style={{ transform: 'translate(-50%,-50%)' }}>
            <div className='grid justify-items-center gap-5'>
              <span className='text-4xl text-center text-white whitespace-nowrap'>Enhance your yoga exprience.</span>
              <button onClick={() => goSearchPage()} className='bg-white opacity-50 text-xs px-8 py-1.5 rounded-2xl hover:bg-accent hover:opacity-75 hover:text-white'>Start Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;