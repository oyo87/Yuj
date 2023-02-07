import React, { useState } from "react";
import LectureItemCard from "../components/LectureItemCard";
import StudioLectureListTopBar from "../components/StudioLectureListTopBar";
import StudioSidebar from "../components/StudioSidebar";

const StudioLectureListPage = () => {
  //유저의 권한이 강사일 때 강의개설 버튼 생성
  const [userAuth, setUserAuth] = useState("teacher");

  return (
    <>
      <div className="flex w-full">
        <StudioSidebar />
        <div className="flex-auto px-40 pt-20">
          <p className="text-3xl font-bold text-accent mb-6 mr-3">강의 목록</p>
          <StudioLectureListTopBar userAuth={userAuth} />
          <div className="flex py-12 px-0">
            <div className="flex flex-wrap justify-start gap-9">
              <LectureItemCard />
              <LectureItemCard />
              <LectureItemCard />
              <LectureItemCard />
              <LectureItemCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioLectureListPage;
