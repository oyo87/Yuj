import React from 'react';
import './Component.css';
import yujLogo from '../assets/mypage-sidebar-yuj-logo.png';
import { Link, Route } from 'react-router-dom';

function MypageSidebar() {

  const sidebarMenu = [
    {
      name: "대시보드",
      path: "/mypage/dashboard",
    },
    {
      name: "내 정보",
      path: "/mypage/info",
    },
    {
      name: "수강목록",
      path: "/mypage/lecture",
    },
  ];

  return (

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-10 w-80 bg-base-100 text-base-content mypage-sidebar" >
            {/* <!-- 사이드바 세부 컨텐츠--> */}
            {sidebarMenu.map((menu) => {
              return (
                <li>
                  <Link to={menu.path} className="sidebar-menu">
                    {menu.name}
                  </Link>
                </li>
              );
            })}
            <img className='mypage-sidebar-yuj-logo' src={yujLogo} alt='yuj sidebar logo' />

          </ul>
        </div>


  );
}
export default MypageSidebar;