package com.yuj.lectureimage.repository;

import com.yuj.lectureimage.domain.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LectureImageRepository extends JpaRepository<ImageFile, Long> {
    ImageFile save(ImageFile imageFile);

    Optional<List<ImageFile>> findAllByLecture_LectureId(Long lectureId);
}
