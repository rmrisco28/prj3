package com.example.backend.board.repository;

import com.example.backend.board.dto.BoardListInfo;
import com.example.backend.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    // id 역순으로 조회하는데, entity 정보를 다 갖고 올 필요는 없습니다.
    // id, title, author, insertedAt은 필요하지만 content는 필요없으니,
    // 필요한것만 뽑아내는 projection을 써서 네개만 갖고오겠습니다.
    List<BoardListInfo> findAllByOrderByIdDesc();
}