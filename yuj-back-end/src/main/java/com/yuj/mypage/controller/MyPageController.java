package com.yuj.mypage.controller;

import com.yuj.mypage.dto.request.MyPageRequestDTO;
import com.yuj.mypage.dto.response.MyPageResponseDTO;
import com.yuj.mypage.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    private final MyPageService myPageService;



//    @Autowired
//    public MyPageController(MyPageService myPageService) {
//        this.myPageService = myPageService;
//    }
//    @GetMapping("/info/1")
//    public ResponseEntity<?> Test(){
//
//        MyPageResponseDTO dto = new MyPageResponseDTO(1L,"2","3","4","5","6");
//
//        return new ResponseEntity(dto, HttpStatus.OK);
//    }

//    @GetMapping("/test")
//    public ResponseEntity<?> Test() {
//        return new ResponseEntity<>("succedss", HttpStatus.BAD_GATEWAY);
//    }

//    @PutMapping("/info/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody MyPageRequestDTO myPageRequestDTO) {
//        myPageRequestDTO.setId(id);
//        return myPageService.updateUser(myPageRequestDTO);
//        User updatedUser = userService.updateUser(id, user);
//        return ResponseEntity.ok(updatedUser);
//    }
}
