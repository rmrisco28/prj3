package com.example.backend.board.like.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "member", schema = "prj3")
public class Member1 {
    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nick_name", nullable = false)
    private String nickName;

    @Column(name = "info")
    private String info;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "inserted_at", nullable = false)
    private LocalDateTime insertedAt;

}