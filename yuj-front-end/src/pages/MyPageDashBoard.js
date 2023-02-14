import React, { useEffect, useState } from "react";
import MyPageSidebar from "../components/MyPageSidebar";
import Styles from "./MyPages.module.css";
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import MyPageWeeklyStudyChart from '../components/MyPageWeeklyStudyChart';
import MyPageCalendar from "../components/MyPageCalendar";
import axios from "axios";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const LOCAL_URL = "http://localhost:5000";
const URL = LOCAL_URL;

const MyPageDashBoard = () => {

    // HH:MM:SS 시간 표시를 HH:MM으로 표시하는 함수
    function convertToHM(time) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        let [hours, minutes, _] = time.split(":");
        return `${hours}:${minutes}`;
    }

    // backend URL
    const MYPAGE_URL = `${URL}/mypage/dashboard/3` //뒤에 유저Id입력
    const LECTURE_SCHEDULE_URL = `${URL}/mypage/dashboard/lectureSchedule/3` //이 뒤에 lectureId입력

    //현재 수강중인 강의
    const [currentLectures, setCurrentLectures] = useState([]);
    //수강 완료한 강의
    const [completedLectures, setCompletedLectures] = useState([]);
    //강의 시간 정보
    const [lectureSchedule, setLectureSchedule] = useState([]);
    //강의 일정 배열(1일 단위)
    const [lectureEvents, setLectureEvents] = useState([]);



    useEffect(() => {
        if(currentLectures.length != 0) {
            //강의 일정 만들기
            makeLectureEvents();
        }
    }, [currentLectures])


    //현재 수강중인 모든 강의 일정을 계산해 합치는 함수
    const makeLectureEvents = async() => {
        let events = [];
        for(const lecture of currentLectures){
            const schedules = await getLectureScheduleByLectureId(lecture.lectureId);
            const { calcEvents, calcEventCloseTime } = calcEventsWithUserLectureAndSchedules(lecture, schedules);
            events = events.concat(calcEvents);
            lecture.closeTime = calcEventCloseTime;
            console.log("foreach lecture res: ",lecture)
        }
        setLectureEvents(events);
    }

    //특정 강의와 스케줄을 가지고 일정을 생성하는 함수
    const calcEventsWithUserLectureAndSchedules = (userLecture, schedules) => {
        console.log("calcEventsWithUserLectureAndSchedules : ",userLecture, schedules)
        const calcEvents = [];
        let calcEventCloseTime = '';


        //시작날, 끝날, 수업요일 저장하기
        let { endDate, startDate, name } = userLecture;
        const days = schedules.map(schedule => schedule.day - 1);
        console.log('days : ',days)

        endDate = dayjs(endDate);
        startDate = dayjs(startDate);

        //시작날부터 끝날까지 날짜를 1씩 추가하며 해당날짜가 수업하는 요일일 경우 배열에 집어넣기
        while(!startDate.isAfter(endDate)) {
            startDate = startDate.add(1, "d");
            schedules.map(schedule => {

                if(schedule.day-1 == startDate.get("day")){
                    calcEvents.push({
                        title: name,
                        date: startDate.format("YYYY-MM-DD"),
                    })

                    if(!calcEventCloseTime) {
                        let getEventDateTime = startDate.format("YYYY-MM-DD") + schedule.startTime;
                        calcEventCloseTime = elapsedTime(getEventDateTime);
                    }
                }
            })
        }
        return { calcEvents, calcEventCloseTime };
    }

    //~분전, ~일전 계산하는 함수
    function elapsedTime(date) {
        const start = dayjs();
        const end = dayjs(date);
        
        const diff = end.diff(start) / 1000;
        
        const times = [
          { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
          { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
          { name: '일', milliSeconds: 60 * 60 * 24 },
          { name: '시간', milliSeconds: 60 * 60 },
          { name: '분', milliSeconds: 60 },
        ];
      
        for (const value of times) {
          const betweenTime = Math.floor(diff / value.milliSeconds);
      
          if (betweenTime > 0) {
            return `${betweenTime}${value.name} 후`;
          }
        }
        return '잠시 후';
      }


    useEffect(() => {
        //현재 수강중인 강의 가져와야하는부분 현재 임시데이터
        axios({
            method: "GET",
            url: MYPAGE_URL
        }).then(response => {
            setCurrentLectures(response.data)
        })
            .catch(error => {
                console.log(error.response);
            })

        //수강 완료한 강의 가져와야하는부분 현재 임시데이터
        axios({
            method: "GET",
            url: MYPAGE_URL
        }).then(response => {
            setCompletedLectures(response.data)
        })
            .catch(error => {
                console.log(error.response);
            })

        // 강의 시작 정보 구하기 위한것
        axios({
            method: "GET",
            url: LECTURE_SCHEDULE_URL
        }).then(response => {
            setLectureSchedule(response.data);
        })
            .catch(e => {
                console.log(e.response);
            })
    }, [])

    const getLectureScheduleByLectureId = (lectureId) => {
        return axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/mypage/dashboard/lectureSchedule/${lectureId}`
            })
            .then(response => {
                return response.data;
            })
            .catch(e => {
                console.log(e.response);
            })
    }


    return (
        <>
            <container className="flex ml-100 w-full">
                <MyPageSidebar />
                <main>
                    <div className="mx-28 mt-16 w-full">
                        <div className="text-3xl font-bold">마이 페이지 - 대시보드</div>
                        <div className="w-full flex ">
                            <div className={Styles[`dashboard-box`]}>
                                <div className="flex m-5 justify-between" >
                                    <div className={Styles[`box-font`]}>
                                        <div>수강중</div>
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
                                        {/* post 내부에 있는 post.lecture.lectureId를 이용해서 lectureSchdule 데이터 findby해오고
                                        그안의 Day, startTime 이용해야함  */}
                                        {/* {console.log("현재 수강중인강의 ")} */}
                                        {/* {console.log(post)} */}
                                        <Link to="/studio" className="h-20 my-2 flex">
                                            <div className="h-full w-32 mx-5">
                                                {/* 강의 thumbnail_image */}
                                                <img src={post.thumbnailImage}></img>
                                            </div>
                                            {/* 강의 name */}
                                            <div className="leading-loose truncate">{post.name}
                                            {/* {console.log(lectureSchedule)} */}
                                                {/* lecture의 start_date, end_date , lectureschedule의 start_time, day를 활용 다음 수업시작날짜, 시간 연산 필요 */}
                                                {/* <div className="break-keep">예정 : {post.startDate} {convertToHM(lectureSchedule[0].startTime)} </div> */}
                                                <div className="break-keep">예정 : {post.closeTime? post.closeTime: null} </div>
                                            </div>
                                        </Link>
                                    </>
                                ))}


                            </div>
                            <div className={Styles[`dashboard-box`]}>
                                <div className="flex m-5 justify-between" >
                                    <div className={Styles[`box-font`]}>
                                        <div>수강 완료</div>
                                    </div>
                                    <Link to="/mypage/lecture">전체보기 &gt;</Link>
                                </div>
                                <div>
                                    {
                                        completedLectures
                                            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))  //가장 최근 수강완료된것부터 정렬
                                            .slice(0, 3)
                                            .map(post => (
                                                <>
                                                {/* {console.log("수강완료한강의 post ")}
                                                {console.log(post)} */}
                                                    {/* 실제로는 studio링크가 아닌 해당 강의 스튜디오로 이동하게 짜야함. */}
                                                    <Link to="/studio" className="h-20 my-2 flex">
                                                        <div className="h-full w-32 mx-5">
                                                            {/* src를 가져온 강의의 thumbnail_image로 */}
                                                            <img src="/assets/Sample2.jpg" alt="Lecture thumbnail" />
                                                        </div>
                                                        {/* 강의 name */}
                                                        <div className="leading-loose truncate">
                                                            {post.name}
                                                            {/* 강의 end_date */}
                                                            <div>완료일 : {post.endDate}</div>
                                                        </div>
                                                    </Link>
                                                </>
                                            ))
                                    }
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
                                    5 / 9회 참여하였습니다.
                                </div>
                            </div>
                        </div>
                        <div className="m-14">
                            <div>학습 일정</div>
                            <div>
                                <MyPageCalendar lectureEvents={lectureEvents} />
                            </div>
                        </div>
                    </div>
                </main>
            </container>
        </>
    );
}

export default MyPageDashBoard;