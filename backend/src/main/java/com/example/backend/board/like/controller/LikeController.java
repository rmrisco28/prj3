package com.example.backend.board.like.controller;

import com.example.backend.board.like.dto.BoardLikeDto;
import com.example.backend.board.like.dto.LikeForm;
import com.example.backend.board.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/like")
public class LikeController {

    private final LikeService likeService;

    @GetMapping("board/{boardId}")
    public BoardLikeDto get(
            @PathVariable("boardId") Integer boardId,
            Authentication authentication) {

        return likeService.get(boardId, authentication);
    }

    @PutMapping
    public void like(@RequestBody LikeForm likeForm, Authentication authentication) {

        likeService.update(likeForm, authentication);
    }
}
