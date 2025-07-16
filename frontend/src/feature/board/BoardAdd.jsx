import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { AuthenticationContext } from "../../Common/AuthenticationContextProvider.jsx";

export function BoardAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function handleSaveButtonClick() {
    // 저장 버튼을 클릭하자마자 실행 할 수 있도록
    setIsProcessing(true);

    axios
      .postForm("/api/board/add", {
        title: title,
        content: content,
        files: files,
        // JSON 에는 post 형식이 없기 대문에 multipart form-data로 보내야 한다.
      })
      .then((res) => {
        // 컨트롤러에서 return 받은 데이터 넣기
        const message = res.data.message;
        if (message) {
          // toast 띄우기
          toast(message.text, { type: message.type });
        }
        // "/" 로 이동
        // useNavigate 사용 할 것. 위로 올라가서
        navigate("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }

        console.log("잘 안되면 실행되는 코드");
      })
      .finally(() => {
        console.log("항상 실행되는 코드");
        setIsProcessing(false);
      });
  }

  // 작성자, 제목, 본문 썼는지
  let validate = true;
  if (title.trim() === "") {
    validate = false;
  }
  if (content.trim() === "") {
    validate = false;
  }

  return (
    // 가운데 정렬
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">글 작성</h2>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="content1">
            <FormLabel>본문</FormLabel>
            <FormControl
              as="textarea"
              row={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3" controlId="files1">
            <FormLabel>이미지 파일</FormLabel>
            <FormControl
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>작성자</FormLabel>
            <FormControl value={user.email} disabled />
          </FormGroup>
        </div>
        <div className="mb-3">
          <Button
            onClick={handleSaveButtonClick}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
