package com.example.backend.user;

import lombok.Data;

@Data
public class UserForm {
    private String id;
    private String password;
    private String name;
    private Integer age;
    private String info;
}
