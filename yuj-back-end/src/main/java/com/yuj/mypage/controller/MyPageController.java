package com.yuj.mypage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage")
public class MyPageController {

    @GetMapping("/test")
    public ResponseEntity<?> Test() {
        return new ResponseEntity<>("succedss", HttpStatus.BAD_GATEWAY);
    }

}
