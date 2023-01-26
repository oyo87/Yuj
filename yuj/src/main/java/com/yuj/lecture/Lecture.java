package com.yuj.lecture;

import com.yuj.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Lecture {
    @Id
    @Column(name = "lecture_id")
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

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "yoga_id")
    private Yoga yoga;

    @PrePersist
    public void registDate() {
        this.registDate = LocalDate.now();
    }
}
