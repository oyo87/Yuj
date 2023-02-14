package com.yuj.mypage.controller;

import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.mypage.dto.request.MyPageUserInfoRequestDTO;
import com.yuj.mypage.dto.response.MyPageLectureScheduleResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureResponseDTO;
import com.yuj.mypage.service.MyPageService;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<?> getUserLecture(@PathVariable Long userId) {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getUserLecturesById(userId);
        System.out.println("마이페이지 컨트롤러진입후 할당");

        if (userLecturesById != null) {
            System.out.println("마이페이지 컨트롤러정상반환");
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            System.out.println("마이페이지 컨트롤러널");
            return ResponseEntity.ok().body("수강중인 강의가 없습니다.");
        }
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기

        System.out.println("마이페이지 컨트롤러 뭔가 오류");
        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");

//        return new ResponseEntity(userLecturesById, HttpStatus.OK);
    }

    @GetMapping("/dashboard/lectureSchedule/{lectureId}")
    public ResponseEntity<?> getLectureSchedule(@PathVariable Long lectureId) {
        List<MyPageLectureScheduleResponseDTO> lectureScheduleByLectureId = myPageService.getLectureScheduleByLectureId(lectureId);

        System.out.println("lectureScheduleByLectureId = " + lectureScheduleByLectureId);

        if (lectureScheduleByLectureId != null) {
            return ResponseEntity.ok().body(lectureScheduleByLectureId);
        } else if (lectureScheduleByLectureId == null) {
            return ResponseEntity.ok().body("강의 정보가 없습니다.");
        }

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }

    //    유저정보수정
    @PatchMapping("/info/{userId}")
    public ResponseEntity<User> userUpdate(@RequestBody MyPageUserInfoRequestDTO myPageUserInfoRequestDTO, @PathVariable Long userId) {
        Optional<User> user = this.myPageService.updateUser(userId, myPageUserInfoRequestDTO);
        System.out.println("userUpdate 컨트롤러에 도착");
        System.out.println(user);

        return new ResponseEntity(user, HttpStatus.OK);
    }

}
