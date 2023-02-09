import React, { useEffect, useState } from "react";
import MyPageSidebar from "../components/MyPageSidebar";
import Styles from "./MyPages.module.css";
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import MyPageWeeklyStudyChart from '../components/MyPageWeeklyStudyChart';
import MyPageCalendar from "../components/MyPageCalendar";
import axios from "axios";
import { Link } from 'react-router-dom';

//현재 수강중인 강의 썸네일+ 제목, 다음수업 일정 더미

//수강 완료 강의 썸네일 + 제목, 완료 수강일 더미
function CompletedLecture() {
    return (
        <div className="h-20 my-2 flex">
            <div className="h-full w-32 mx-5">
                <img src="/assets/Sample2.jpg"></img>
            </div>
            <div className="leading-loose">요가의 완성
                <div>완료 수강일 : 2023-02-08</div>
            </div>
        </div>
    )
}

const MyPageDashBoard = () => {

    //현재 수강중인 강의
    const [currentLectures, setCurrentLectures] = useState([]);
    //수강 완료한 강의
    const [CompletedLectures, setCompletedLectures] = useState([]);

    useEffect(() => {
        //현재 수강중인 강의 가져와야하는부분 현재 임시데이터
        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/posts"
        }).then(response => setCurrentLectures(response.data))
            .catch(error => {
                console.log(error.response);
            })

        //수강 완료한 강의 가져와야하는부분 현재 임시데이터
        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/posts"
        }).then(response => setCompletedLectures(response.data))
            .catch(error => {
                console.log(error.response);
            })
    })


    return (
        <>
            <MainHeader />
            <container className="flex ml-100">
                <MyPageSidebar />
                <main>
                    <div className="mx-28 mt-16 w-full">
                        <div className="text-3xl font-bold">마이 페이지 - 대시보드</div>
                        <div className="w-full flex ">
                            <div className={Styles[`dashboard-box`]}>
                                <div className="flex m-5 justify-between" >
                                    <div className={Styles[`box-font`]}>
                                        <div>현재</div>
                                        <div>수강중인</div>
                                        <div>강의</div>
                                    </div>
                                    <Link to="/mypage/lecture">전체보기 &gt;</Link>
                                </div>
                                {/* 만약 1개도 존재하지 않으면 수강중인 강의가 없습니다.
                                get으로 강의리스트 가져오고 최신3개까지만 썸네일 가져와서
                                좌측div에 강의썸네일 우측에는 강의제목, 강의예정 시간
                                url링크 걸어서 강의 스튜디오로이동해야함 */}
                                {currentLectures.slice(0, 3).map(post => (
                                    <>
                                        {/* 실제로는 studio링크가 아닌 해당 강의 스튜디오로 이동하게 짜야함. */}
                                        <Link to="/studio" className="h-20 my-2 flex">
                                            <div className="h-full w-32 mx-5">
                                                {/* 강의 thumbnail_image */}
                                                <img src="/assets/Sample.jpg"></img>
                                            </div>
                                            {/* 강의 name */}
                                            <div className="leading-loose">{post.id}
                                                {/* lecture의 start_date, end_date , lectureschedule의 start_time, day를 활용 다음 수업시작날짜, 시간 연산 필요 */}
                                                <div>수업 예정 : {post.id}</div>
                                            </div>
                                        </Link>
                                    </>
                                ))}


                            </div>
                            <div className={Styles[`dashboard-box`]}>
                                <div className="flex m-5 justify-between" >
                                    <div className={Styles[`box-font`]}>
                                        <div>수강</div>
                                        <div>완료한</div>
                                        <div>강의</div>
                                    </div>
                                    <Link to="/mypage/lecture">전체보기 &gt;</Link>
                                </div>
                                <div>
                                    {CompletedLectures.slice(0, 3).map(post => (
                                        <>
                                        {/* 실제로는 studio링크가 아닌 해당 강의 스튜디오로 이동하게 짜야함. */}
                                            <Link to="/studio" className="h-20 my-2 flex">
                                                <div className="h-full w-32 mx-5">
                                                    {/* src를 가져온 강의의 thumbnail_image로 */}
                                                    <img src="/assets/Sample2.jpg"></img>
                                                </div>
                                                    {/* 강의 name */}
                                                <div className="leading-loose">{post.id}
                                                {/* 강의 end_date */}
                                                    <div>완료 수강일 : {post.id}</div>
                                                </div>
                                            </Link>
                                        </>
                                    ))}
                                </div>
                                {/* 만약 1개도 존재하지 않으면 수강완료한 강의가 없습니다.
                                get으로 강의리스트 가져오고 최신 완료한 3개까지만 썸네일 가져와서
                                좌측div에 강의썸네일 우측에는 강의제목, 강의완료 날짜
                                url링크 걸어서 강의 스튜디오로이동해야함 */}
                            </div>
                            <div className={Styles[`dashboard-box`]}>
                                <div className={"pl-5 pt-5 " + Styles[`box-font`]}>주간 학습 달성률</div>
                                <div>
                                    <MyPageWeeklyStudyChart />
                                </div>
                                <div className="pl-5">
                                    주간 학습 : 5 / 9회 참여하였습니다.
                                </div>
                            </div>
                        </div>
                        <div className="m-14">
                            <div>학습 일정</div>
                            <div>
                                <MyPageCalendar />
                            </div>
                        </div>
                    </div>
                </main>
            </container>
            <div>
                <MainFooter />
            </div>


        </>
    );
}

export default MyPageDashBoard;