import React from "react";
import MyPageSidebar from '../components/MyPageSidebar';
import axios from "axios";
import { useState, useEffect, } from "react";
import LectureItemCard from "../components/LectureItemCard";
import { Link } from 'react-router-dom';

// backend URL
const MYPAGE_URL = "http://localhost:5000/mypage/dashboard/3";

const MyPageLecture = () => {

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

    const [lectures, setLectures] = useState([]);

    return (
        <>
            <div className="flex w-full">
                <MyPageSidebar />
                <div className="px-40 pt-20 w-full flex">
                    <div className="flex w-full">
                        {lectures.map(lecture => (
                            <div key={lecture.lectureId} className="mx-4 my-4">
                                {console.log("MyPageLecture lecture: ", lecture)}
                                
                                    <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                                    {/* <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                                    <LectureItemCard thisLecture={lecture} key={lecture.lectureId} /> */}
                                

                            </div>
                        ))}
                        {lectures.map(lecture => (
                            <div key={lecture.lectureId} className="mx-4 my-4">
                                {console.log("MyPageLecture lecture: ", lecture)}
                                <Link to="/studio">
                                    <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                                    {/* <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                                    <LectureItemCard thisLecture={lecture} key={lecture.lectureId} /> */}
                                </Link>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageLecture;