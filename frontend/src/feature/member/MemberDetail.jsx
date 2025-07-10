import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export function MemberDetail() {
  const [member, setMember] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member?email=${params.get("email")}`)
      .then((res) => {
        console.log(res.data);
        setMember(res.data);
      })
      .catch((err) => {
        console.log("bad");
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  if (!member) {
    return <Spinner />;
  }

  function handleDeleteButtonClick() {
    axios
      .delete(`/api/member?email=${member.email}`)
      .then((res) => {
        console.log("good");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log("fail");
      })
      .finally(() => {
        console.log("always");
      });
  }

  return (
    <Row>
      <Col>
        <h2 className="mb-4">회원 정보</h2>
        <div>
          <FormGroup controlId="email1" className="mb-3">
            <FormLabel>이메일</FormLabel>
            <FormControl readOnly={true} value={member.email} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="nickName1" className="mb-3">
            <FormLabel>별명</FormLabel>
            <FormControl readOnly={true} value={member.nickName} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="info1" className="mb-3">
            <FormLabel>자기소개</FormLabel>
            <FormControl as="textarea" readOnly={true} value={member.info} />
          </FormGroup>
        </div>
        <div>
          <Button
            variant="outline-danger"
            size="sm"
            className="me-2"
            onClick={() => setModalShow(true)}
          >
            회원 탈퇴
          </Button>
          <Button
            variant="outline-info"
            onClick={() => navigate(`/member/edit?email=${member.email}`)}
          >
            정보 수정
          </Button>
        </div>
      </Col>

      <Modal show={modalShow}>
        <Modal.Header closeButton>
          <Modal.Title>회원 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body> {member.email}의 정보를 삭제하시겠습니까? </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteButtonClick}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
