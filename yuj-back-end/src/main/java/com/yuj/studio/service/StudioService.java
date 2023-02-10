package com.yuj.studio.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.UserLectureRepository;
import com.yuj.studio.domain.Studio;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.repository.StudioRepository;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudioService {

    private final StudioRepository studioRepository;
    private final LectureRepository lectureRepository;
    private final UserLectureRepository userLectureRepository;

    public StudioResponseDTO getStudio(Long studioId) throws Exception {
        Studio studio = studioRepository.findById(studioId).orElseThrow(() -> new Exception("스튜디오가 존재하지 않습니다."));

        return entityToResponseDTO(studio);
    }

    public StudioResponseDTO getStudioByUserId(Long userId) throws Exception {
        Studio studio =  studioRepository.findByUser_UserId(userId).orElseThrow(() -> new Exception("스튜디오가 존재하지 않습니다."));

        return entityToResponseDTO(studio);
    }

    private StudioResponseDTO entityToResponseDTO(Studio studio) {
        User user = studio.getUser();
        float rating = user.getRatingCnt() == 0 ? 3 : (float) user.getRatingSum() / user.getRatingCnt();
        return StudioResponseDTO.builder()
                .studioId(studio.getStudioId())
                .description(studio.getDescription())
                .bannerImage(studio.getBannerImage())
                .userId(user.getUserId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .rating(rating)
                .profileImagePath(user.getProfileImagePath())
                .build();
    }
}
