import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

export function MemberDetail() {
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/member/detail=id${params.get("email")}`)
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
          <Button variant="outline-danger" size="sm" className="me-2">
            회원 탈퇴
          </Button>
          <Button variant="outline-info">정보 수정</Button>
        </div>
      </Col>
    </Row>
  );
}
