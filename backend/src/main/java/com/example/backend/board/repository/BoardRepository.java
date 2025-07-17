package com.example.backend.board.repository;

import com.example.backend.board.dto.BoardDto;
import com.example.backend.board.dto.BoardListDto;
import com.example.backend.board.dto.BoardListInfo;
import com.example.backend.board.entity.Board;
import com.example.backend.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    // id 역순으로 조회하는데, entity 정보를 다 갖고 올 필요는 없습니다.
    // id, title, author, insertedAt은 필요하지만 content는 필요없으니,
    // 필요한것만 뽑아내는 projection을 써서 네개만 갖고오겠습니다.
    List<BoardListInfo> findAllByOrderByIdDesc();


    @Query(value = """
            SELECT new com.example.backend.board.dto.BoardListDto(
                        b.id,
                        b.title,
                        m.nickName,
                        b.insertedAt,
                        COUNT(DistINCT c),
                        Count(DistINCT l),
                                    COUNT(DISTINCT f))
            FROM Board b JOIN Member m
                        ON b.author.email = m.email
                        LEFT JOIN Comment c
                        ON b.id = c.board.id
                        LEFT JOIN BoardLike l
                        On b.id = l.board.id
                        LEFT JOIN BoardFile f
                        ON b.id = f.board.id
            WHERE b.title LIKE %:keyword%
            OR b.content LIKE %:keyword%
            OR m.nickName LIKE %:keyword%
            GROUP BY b.id
            ORDER BY b.id DESC
            """)
    Page<BoardListDto> findAllBy(String keyword, PageRequest pageRequest);

    // jpql로 변경하겠습니다.
    @Query(value = """
            SELECT
            new com.example.backend.board.dto.BoardDto(
            b.id,
            b.title,
            b.content,
            m.email,
            m.nickName,
            b.insertedAt)
            FROM Board b JOIN Member m
            On b.author.email = m.email
            
            WHERE b.id = :id
            """)
    BoardDto findBoardById(Integer id);

    void deleteByAuthor(Member author);

    List<Board> findByAuthor(Member db);

    @Query("""
            SELECT b.id
            FROM Board b 
            WHERE b.author = :author
            """)
    List<Integer> listBoardIdByAuthor(Member author);
}
