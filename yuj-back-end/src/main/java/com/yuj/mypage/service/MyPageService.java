package com.yuj.mypage.service;

import com.yuj.lecture.domain.UserLecture;
import com.yuj.mypage.dto.request.MyPageRequestDTO;

import com.yuj.mypage.repository.MyPageUserLectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyPageService {

    @Autowired
    private MyPageUserLectureRepository myPageUserLectureRepository;

    public List<UserLecture> getUserLecturesById(String id){
        return myPageUserLectureRepository.findByUser_Id(id);
    }
//    private final MyPageRepository myPageRepository;
//
//    @Autowired
//    public MyPageService(MyPageRepository myPageRepository) {
//        this.myPageRepository = myPageRepository;
//    }
//
//    public updateUser(MyPageRequestDTO){
//        User user = MyPageRepository.findById(userDto.getId()).orElse(null);
//        if (user == null) {
//            throw new RuntimeException("User not found");
//        }
//
//        user.setProfileImage(userDto.getProfileImage());
//        user.setNickname(userDto.getNickname());
//        user.setPassword(userDto.getPassword());
//        user.setPhone(userDto.getPhone());
//        user.setEmail(userDto.getEmail());
//
//        return userRepository.save(user);
//    }
}
