package com.example.backend.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String content;
    private String author;

    // 자동으로 업데이트 해주는 메소드,
    // default now()로 값이 추가될 예정
    @Column(updatable = false, insertable = false)
    private LocalDateTime insertedAt;

}
