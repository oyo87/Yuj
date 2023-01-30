import React from 'react';
import './Component.css';
import yujLogo from '../../assets/mypage-sidebar-yuj-logo.png';
import { Link, Route } from 'react-router-dom';


function MypageSidebar() {

  const sidebarMenu = [
    {
      name: "대시보드",
      path: "/mypage/dashboard",
    },
    {
      name: "내 정보",
      path: "/mypage/myinfo",
    },
    {
      name: "수강목록",
      path: "/mypage/mylecture",
    },
  ];

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/*<!-- Page content here --> */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden" >사이드바 열기</label>

      </div>
      <div className="drawer-side" >
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-10 w-80 bg-base-100 text-base-content mypage-sidebar" >
          {/* <!-- 사이드바 세부 컨텐츠--> */}
          {sidebarMenu.map((menu, index) => {
            return (
              <li>
                {/* a태그바꾸면 다 사라지는중
                <Link to={menu.path} className="sidebar-menu">
                  {menu.name}
                </Link> */}
                <a className="sidebar-menu">
                  {menu.name}
                </a>
              </li>
            );
          })}
          <img className='mypage-sidebar-yuj-logo' src={yujLogo} alt='yuj sidebar logo' />
        </ul>

      </div>
    </div>
  );
}
export default MypageSidebar;