package com.yuj.lecture.repository;

import com.yuj.lecture.domain.UserLectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLectureScheduleRepository extends JpaRepository<UserLectureSchedule, Long> {

}