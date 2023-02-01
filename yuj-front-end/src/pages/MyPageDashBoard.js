import React from "react";
import MypageSidebar from "../components/MypageSidebar";
import mypageHeader from '../assets/mypage-header.png';
import './pages.css';


const MyPageDashBoard = () => {
    return (
        <>
            헤더입니다
            <div className='container'>
                <MypageSidebar />
                
                <img className='mypage-header' src={mypageHeader} alt='mypage-header' style={{width: "100%", height:"100%"}}/>
                <div>안녕하세요</div>
                <div>안녕</div>
                <p>안녕</p>
                <div>d
                    <div>d</div>
                </div>
            </div>
            푸터입니다
            

        </>
    );
}

export default MyPageDashBoard;