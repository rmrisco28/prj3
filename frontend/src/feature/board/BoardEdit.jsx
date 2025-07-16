import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export function BoardEdit() {
  const [board, setBoard] = useState(null);
  const [files, setFiles] = useState([]); // 새로 추가하는 파일 목록
  const [deleteFiles, setDeleteFiles] = useState([]); // 삭제할 파일 목록
  const [searchParams] = useSearchParams();
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  // 조회는 mount 될때 하기 때문에 useEffect 사용
  useEffect(() => {
    axios
      .get(`/api/board/${searchParams.get("id")}`)
      .then((res) => {
        console.log("성공");
        setBoard(res.data);
      })
      .catch((err) => {
        console.log("실패");
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        // toast("해당 게시물이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("실패");
        setIsProcessing(false);
      });
  }, []);

  function handleSaveButtonClick() {
    setIsProcessing(true);
    axios
      .putForm(`/api/board/${searchParams.get("id")}`, {
        ...board,
        files: files,
        deleteFiles: deleteFiles,
      })
      .then((res) => {
        console.log("good");
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        console.log("bad");
        toast("게시물 수정시 오류 발생하였습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("finally");
      }, []);
  }

  // 널일 때는 스피너로 돌리기.
  if (!board) {
    return <Spinner />;
  }

  let validate = true;
  if (board.title.trim() === "") {
    validate = false;
  }
  if (board.content.trim() === "") {
    validate = false;
  }
  // if (board.author.trim() === "") {
  //   validate = false;
  // }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">{board.id}번 게시물 수정</h2>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={board.title}
              // 상태는 객체를 복사해서 만들어야함.
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="content1">
            <FormLabel>본문</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          {/*   이미 저장된 파일 목록 보기   삭제 or 유지*/}
          <ListGroup>
            {board.files.map((file) => (
              <ListGroupItem key={file.name}>
                <Stack direction="horizontal" gap={3}>
                  <FormCheck
                    type="switch"
                    value={file.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDeleteFiles([...deleteFiles, e.target.value]);
                      } else {
                        setDeleteFiles(
                          deleteFiles.filter((item) => item !== e.target.value),
                        );
                      }
                    }}
                  />
                  <Image fluid src={file.path} />
                </Stack>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>

        {/* 추가 파일 */}
        <div>
          <FormGroup className="mb-3" controlId="files1">
            <FormLabel>추가 이미지 파일</FormLabel>
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
            <FormControl
              value={board.authorNickName}
              disabled
              // value={board.author}
              // onChange={(e) => setBoard({ ...board, author: e.target.value })}
            />
          </FormGroup>
        </div>
        <div>
          <Button
            className="me-2"
            onClick={() => navigate(-1)}
            variant="outline-secondary"
          >
            취소
          </Button>
          <Button
            disabled={!validate || isProcessing}
            onClick={() => setModalShow(true)}
            variant="primary"
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </div>
      </Col>

      <Modal show={modalShow}>
        <Modal.Header closeButton>
          <Modal.Title>게시물 저장 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body> {board.id} 번 게시물을 수정하시겠습니까? </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>

          <Button
            disabled={!validate || isProcessing}
            onClick={handleSaveButtonClick}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
