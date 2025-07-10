CREATE TABLE board
(
    id          INT AUTO_INCREMENT NOT NULL,
    title       VARCHAR(300)       NOT NULL,
    content     VARCHAR(10000)     NOT NULL,
    author      VARCHAR(100)       NOT NULL,
    inserted_at datetime           NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_board PRIMARY KEY (id)
);


# 회원 테이블
CREATE TABLE member
(
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    nick_name   VARCHAR(255) NOT NULL UNIQUE,
    info        VARCHAR(255) NULL,
    inserted_at datetime     NOt NULL DEFAULT NOW(),
    CONSTRAINT pk_member PRIMARY KEY (email)
);

DROP TABLE member;

# 자습 유저 테이블
CREATE TABLE user
(
    id       VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name     VARCHAR(255) NOT NULL,
    age      INT          NOT NULL,
    info     VARCHAR(255) NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);


