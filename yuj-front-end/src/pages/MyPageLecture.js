import React from "react";
import MyPageSidebar from '../components/MyPageSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import axios from "axios";
import { useState, useEffect, } from "react";
import { useSelector } from "react-redux";
import LectureItemCard from "../components/LectureItemCard";

// backend URL
const MYPAGE_URL = "http://localhost:5000/mypage/dashboard/3";

const MyPageLecture = () => {

    const [lectures, setLectures] = useState([]);

    let lectureList = useSelector(state => state.studio.studioLectureList);
    useEffect(() => {
        axios({
            method: "GET",
            url: MYPAGE_URL
        }).then(res => {
            setLectures(res.data);
        })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <>
            <div className="flex w-full">
                <MyPageSidebar />
                <div>
                    <div>수강목록</div>
                    <div>작업예정. 스튜디오에 만들어져있는 리스트 모양 가져오기</div>
                    <div>
                        {lectures.map(lecture => (
                            <>
                                {console.log("lecture: ", lecture)}
                                <div to="/studio" className="h-20 my-2 flex">
                                    <div className="h-full w-32 mx-5">
                                        <img src="/assets/Sample2.jpg"></img>
                                    </div>
                                    <div className="leading-loose truncate">{lecture.name}
                                        <div>완료 수강일 : {lecture.endDate}
                                        </div>
                                    </div>
                                </div>
                                {lectureList.map((lecture) => (
                                    <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                                ))}

                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageLecture;