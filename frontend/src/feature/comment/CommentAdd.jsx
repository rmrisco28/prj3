import { Button, FloatingLabel, FormControl, Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function CommentAdd({ boardId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthenticationContext);

  function handleCommentSaveClick() {
    setIsProcessing(true);
    axios
      .post("/api/comment", { boardId: boardId, comment: comment })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        setComment("");
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  let saveButtonDisabled = false;
  if (comment.trim().length === 0) {
    saveButtonDisabled = true;
  }

  return (
    <div className="position-relative">
      <FloatingLabel
        controlId="commentTextarea1"
        label={
          user === null
            ? "댓글을 작성하려면 로그인 하세요. "
            : "댓글을 작성해보세요."
        }
      >
        <FormControl
          placeholder={
            user === null
              ? "댓글을 작성하려면 로그인하세요."
              : "댓글을 작성해보세요."
          }
          as="textarea"
          style={{ height: "100px" }}
          value={comment}
          disabled={user === null}
          onChange={(e) => setComment(e.target.value)}
        />
      </FloatingLabel>
      <div className="position-absolute bottom-0 end-0 m-3">
        <Button
          disabled={isProcessing || saveButtonDisabled}
          onClick={handleCommentSaveClick}
        >
          {isProcessing && <Spinner size="sm" />}
          댓글 저장
        </Button>
      </div>
    </div>
  );
}
