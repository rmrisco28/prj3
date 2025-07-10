import {
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);

  function handleTableClick(email) {}

  (useEffect(() => {
    axios
      .get("/api/member/list")
      .then((res) => {
        console.log("good");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("fail");
      })
      .finally(() => {
        console.log("always");
      });
  }),
    []);

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">회원 목록</h2>
        <div>
          <Table>
            <thead>
              <tr>
                <th>이메일</th>
                <th>별명</th>
                <th>가입일시</th>
              </tr>
            </thead>
            <tbody>
              {memberList.map((member) => (
                <tr
                  key={member.email}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleTableClick(member.email)}
                >
                  <td>{member.email}</td>
                  <td>{member.nickName}</td>
                  <td>{member.insertedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div></div>
      </Col>
    </Row>
  );
}
