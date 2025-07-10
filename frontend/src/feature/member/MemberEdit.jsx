import {
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

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    axios
      .get(`api/member/edit?email=${email}`)
      .then((res) => {
        console.log("성공");
      })
      .catch((err) => {
        console.log("실패");
      })
      .finally(() => {
        console.log("항상");
      });
  }, []);

  // 조회

  if (!member) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">회원 정보 수정</h2>
        {/*<div>*/}
        {/*  <FormGroup>*/}
        {/*    <FormLabel>이메일</FormLabel>*/}
        {/*    <FormControl value={member.email} />*/}
        {/*  </FormGroup>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <FormGroup>*/}
        {/*    <FormLabel>별명</FormLabel>*/}
        {/*    <FormControl value={member.nickName} />*/}
        {/*  </FormGroup>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <FormGroup>*/}
        {/*    <FormLabel>비밀번호</FormLabel>*/}
        {/*    <FormControl value={member.password} />*/}
        {/*  </FormGroup>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <FormGroup>*/}
        {/*    <FormLabel>자기소개</FormLabel>*/}
        {/*    <FormControl value={member.info} />*/}
        {/*  </FormGroup>*/}
        {/*</div>*/}
      </Col>
    </Row>
  );
}
