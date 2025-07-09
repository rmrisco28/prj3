package com.example.backend.board.service;

import com.example.backend.board.dto.BoardListInfo;
import com.example.backend.board.entity.Board;
import com.example.backend.board.repository.BoardRepository;
import com.example.backend.board.dto.BoardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;

    public void add(BoardDto dto) {
        // entity에 dto의 값들 옮겨 닮고,
        // entity 만들때 테이블이다 생각하고 만들기
        Board board = new Board();
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setAuthor(dto.getAuthor());

        // repository에 save 실행
        boardRepository.save(board);

    }

    public boolean validate(BoardDto dto) {
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }
        if (dto.getContent() == null || dto.getContent().trim().isBlank()) {
            return false;
        }
        if (dto.getAuthor() == null || dto.getAuthor().trim().isBlank()) {
            return false;
        }

        return true;
    }

    public List<BoardListInfo> list() {
        return boardRepository.findAllByOrderByIdDesc();
    }

    public BoardDto getBoardById(Integer id) {
        Optional<Board> board = boardRepository.findById(id);
        BoardDto boardDto = new BoardDto();
        boardDto.setId(board.get().getId());
        boardDto.setTitle(board.get().getTitle());
        boardDto.setContent(board.get().getContent());
        boardDto.setAuthor(board.get().getAuthor());
        boardDto.setInsertedAt(board.get().getInsertedAt());
        return boardDto;
    }

    public void deleteById(Integer id) {
        boardRepository.deleteById(id);
    }

    public void update(BoardDto boardDto) {
        // 조회는 조심히, 조회 후 수정 해야함.
        Board db = boardRepository.findById(boardDto.getId()).get();

        // 변경
        db.setTitle(boardDto.getTitle());
        db.setContent(boardDto.getContent());
        db.setAuthor(boardDto.getAuthor());

        // 저장
        boardRepository.save(db);
    }
}
