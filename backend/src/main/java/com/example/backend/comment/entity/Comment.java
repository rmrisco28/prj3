package com.example.backend.comment.entity;

import com.example.backend.board.entity.Board;
import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Table(name = "comment")
@Entity
@Getter
@Setter
@ToString
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "author")
    private Member author;

    private String comment;

    @Column(updatable = false, insertable = false)
    private LocalDateTime insertedAt;
}
