package com.yuj.lecture.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureService {

    private final LectureRepository lectureRepository;


    public LectureResponseDTO getLectureById(Long lectureId) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));

        return entityToResponseDTO(lecture);
    }


    public List<LectureResponseDTO> getLecturesByUserId(Long userId) throws Exception {
        List<Lecture> list = lectureRepository.findByUser_UserId(userId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));
        List<LectureResponseDTO> returnList = new ArrayList<>();

        for(Lecture lecture : list) {
            returnList.add(entityToResponseDTO(lecture));
        }

        return returnList;
    }

    public LectureResponseDTO updateLectureActive(Long lectureId, long userId, Boolean isActive) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new Exception("강의가 존재하지 않습니다."));

        if(lecture.getUser().getUserId() != userId) {
            throw new Exception("해당 수업의 강사가 아닙니다.");
        }else{
            lecture.setActive(isActive);

            Lecture updatedLecture = lectureRepository.save(lecture);
            return entityToResponseDTO(updatedLecture);
        }
    }

    private LectureResponseDTO entityToResponseDTO(Lecture lecture) {
        User user = lecture.getUser();
        return LectureResponseDTO.builder()
                .fee(lecture.getFee())
                .lectureId(lecture.getLectureId())
                .description(lecture.getDescription())
                .endDate(lecture.getEndDate())
                .limitStudents(lecture.getLimitStudents())
                .name(lecture.getName())
                .registDate(lecture.getRegistDate())
                .startDate(lecture.getStartDate())
                .thumbnailImage(lecture.getThumbnailImage())
                .totalCount(lecture.getTotalCount())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profileImagePath(user.getProfileImagePath())
                .yoga(lecture.getYoga())
                .isActive(lecture.isActive())
                .build();
    }
}
