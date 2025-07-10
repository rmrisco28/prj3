import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function UserAdd() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  function handleSaveButtonClick() {
    axios
      .post("/api/useradd", {
        id: id,
        password: password,
        name: name,
        age: age,
        info: info,
      })
      .then((res) => {
        console.log("good");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log("bad");
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        console.log("always");
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2>유저 가입</h2>
        <div>
          <FormGroup>
            <FormLabel>아이디</FormLabel>
            <FormControl value={id} onChange={(e) => setId(e.target.value)} />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormLabel>이름</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormLabel>나이</FormLabel>
            <FormControl value={age} onChange={(e) => setAge(e.target.value)} />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <FormLabel>자기소개</FormLabel>
            <FormControl
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </FormGroup>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button
            className="me-2"
            variant="outline-secondary"
            onClick={() => navigate("/")}
          >
            취소
          </Button>
          <Button variant="outline-primary" onClick={handleSaveButtonClick}>
            저장
          </Button>
        </div>
      </Col>
    </Row>
  );
}
