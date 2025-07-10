package com.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/useradd")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> userAdd(@RequestBody UserForm userForm) {
//        System.out.println("userFrom = " + userForm);

        try {
            userService.add(userForm);

        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "user 가입 되었습니다.")));
    }
}
