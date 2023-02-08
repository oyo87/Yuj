package com.yuj.mypage.controller;

import com.yuj.lecture.domain.UserLecture;
import com.yuj.mypage.dto.request.MyPageRequestDTO;
import com.yuj.mypage.dto.response.MyPageResponseDTO;
import com.yuj.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/dashboard/{id}")
    public ResponseEntity<?> getUserLecture(@PathVariable String id) {
        System.out.println(id);
        System.out.println(1);
        List<UserLecture> userLecturesById = myPageService.getUserLecturesById(id);
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기
        System.out.println(userLecturesById);

        return ResponseEntity.ok().body(userLecturesById);
//        return new ResponseEntity(userLecturesById, HttpStatus.OK);
    }


    @GetMapping("/info/1")
    public ResponseEntity<?> Test1() {

        MyPageResponseDTO dto = new MyPageResponseDTO(1L, "2", "3", "4", "5", "6");

        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<?> Test() {
        return new ResponseEntity<>("success", HttpStatus.BAD_GATEWAY);
    }

//    @PutMapping("/info/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody MyPageRequestDTO myPageRequestDTO) {
//        myPageRequestDTO.setId(id);
//        return myPageService.updateUser(myPageRequestDTO);
//        User updatedUser = userService.updateUser(id, user);
//        return ResponseEntity.ok(updatedUser);
//    }
}
