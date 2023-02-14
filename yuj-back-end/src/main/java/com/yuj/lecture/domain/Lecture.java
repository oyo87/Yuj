package com.yuj.lecture.domain;

import com.yuj.lectureimage.domain.ImageFile;
import com.yuj.user.domain.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@DynamicInsert
public class Lecture {
    @SequenceGenerator(
            name="LECTURE_SEQ_GEN",
            sequenceName = "LECTURE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @Column(name = "lecture_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LECTURE_SEQ_GEN")
    private Long lectureId;

    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private String thumbnailImage;

    private LocalDate registDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int limitStudents;
    private int fee;
    private int totalCount;
    @Builder.Default
    @ColumnDefault("0")
    private boolean isActive = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "yoga_id")
    private Yoga yoga;

    // 강의에서 이미지 파일 접근 가능하도록 참조자
    @OneToMany(
            mappedBy = "lecture",
            fetch = EAGER
    )
    @Builder.Default
    private List<ImageFile> imageFiles = new ArrayList<>();
    
    public void addLectureImage(ImageFile imageFile) {
        this.imageFiles.add(imageFile);
    }

    @PrePersist
    public void registDate() {
        this.registDate = LocalDate.now();
    }
}
