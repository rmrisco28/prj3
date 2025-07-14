import { Button, FormControl, Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function CommentContainer({ boardId }) {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  function handleCommentSaveClick() {
    axios
      .post("/api/comment", { boardId: boardId, comment: comment })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        setComment("");
        navigate("/");
      })
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <div>
      <h3 className="mb-3">댓글창</h3>
      <FormControl
        className="mb-3"
        as="textarea"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button className="mb-3" onClick={handleCommentSaveClick}>
        저장
      </Button>
    </div>
  );
}
