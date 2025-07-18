import Button from "./Button";
import "./writingStory.css";
import { createStory } from "../../api/story";
import Swal from "sweetalert2";

export default function WritingStory({ style, setShowWriting }) {
  return (
    <div className="writing-story">
      <br />
      <div className="text-3xl font-bold">글쓰기</div>
      <textarea
        className="story-input"
        placeholder="내용을 입력해 나만의 별을 만들어보세요..."
        rows={10}
        cols={50}
        style={{
          width: "100%",
          outline: "none",
          resize: "none",
          height: "55vh",
          ...style,
        }}
      />
      <br />
      <br />
      <Button
        onClick={() => {
          createStory("hihi")
            .then((e) => {
              console.log(e);
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
            });
        }}
      >
        저장
      </Button>
      <Button className="ml-2" onClick={() => setShowWriting(false)}>
        <i className="fa-solid fa-xmark" />
      </Button>
    </div>
  );
}
