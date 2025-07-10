package com.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void add(UserForm userForm) {

        if (this.validate(userForm)) {

            User user = new User();

            user.setId(userForm.getId());
            user.setPassword(userForm.getPassword());
            user.setName(userForm.getName());
            user.setAge(userForm.getAge());
            user.setInfo(userForm.getInfo());

            userRepository.save(user);
        }

    }

    private boolean validate(UserForm userForm) {
        // 아이디 중복 확인
        Optional<User> byId = userRepository.findById(userForm.getId());
        if (byId.isPresent()) {
            throw new RuntimeException("이미 사용중인 아이디 입니다.");
        }

        return true;
    }
}
