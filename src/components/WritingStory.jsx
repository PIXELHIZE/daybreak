import { motion } from "motion/react";
import Button from "./Button";
import "./writingStory.css";
import { useState } from "react";
import { createStory } from "../../api/story";
import Swal from "sweetalert2";

export default function WritingStory({ style, setShowWriting, introDone }) {
  const [content, setContent] = useState("");

  return (
    <div className="writing-story">
      <br />
      <div className="text-3xl font-bold">글쓰기</div>

      <textarea
        className="story-input"
        placeholder="내용을 입력해 나만의 별을 만들어보세요..."
        rows={10}
        cols={50}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          outline: "none",
          resize: "none",
          height: "55vh",
          ...style,
        }}
      />

      {/* 버튼 그룹 */}
      <motion.div
        initial={{ y: 10, opacity: 0, display: "none" }}
        animate={
          introDone
            ? { y: 0, opacity: 1, display: "flex" }
            : { y: 10, opacity: 0, display: "none" }
        }
        transition={{
          y: { type: "spring", stiffness: 80, damping: 14 },
          opacity: { duration: 0.6, delay: 0.25 },
        }}
        style={{ gap: "0.75rem", marginTop: "1.5rem" }}
      >
        <Button
          onClick={() => {
            createStory(content)
              .then(() => {
                Swal.fire({
                  toast: true,
                  position: "top-end",
                  icon: "success",
                  title: "글이 등록되었습니다.",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
              })
              .catch((error) => {
                Swal.fire({
                  toast: true,
                  position: "top-end",
                  icon: "error",
                  title: error.message,
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
              })
              .finally(() => setShowWriting(false));
          }}
        >
          저장
        </Button>

        <Button onClick={() => setShowWriting(false)}>
          <i className="fa-solid fa-xmark" />
        </Button>
      </motion.div>
    </div>
  );
}
