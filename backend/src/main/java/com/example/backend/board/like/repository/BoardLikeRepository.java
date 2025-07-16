package com.example.backend.board.like.repository;

import com.example.backend.board.entity.Board;
import com.example.backend.board.like.entity.BoardLike;
import com.example.backend.board.like.entity.BoardLikeId;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Objects;
import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, BoardLikeId> {
    Optional<BoardLike> findByBoardIdAndMemberEmail(Integer boardId, String name);

    Long countByBoardId(Integer boardId);

    void deleteByBoard(Board board);

    void deleteByMember(Member db);
}