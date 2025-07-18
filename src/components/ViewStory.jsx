import Button from "./Button";
import { useEffect, useState } from "react";
import { randomStory, readStory, likeStory } from "../../api/story";
import "./viewStory.css";

export default function ViewStory({ setShowViewing, style }) {
  const [story, setStory] = useState("");
  const [id, setId] = useState(null);
  const [introTime, setIntroTime] = useState(false);
  const [liked, setLiked] = useState(false);

  const fetchStory = () => {
    randomStory()
      .then((res) => {
        console.log(res);
        setStory(res.content);
        setId(res.id);

        setTimeout(() => {
          readStory(res.id).then((res) => {
            console.log("읽기 완료!");
            console.log(res);
          });
        }, 5000);
      })
      .catch((err) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <div className="view-story" style={{ overflow: "hidden" }}>
      <p
        style={{
          height: "60vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {story}
      </p>

      <br />
      <br />

      <Button
        onClick={() => {
          setShowViewing(false);
          setIntroTime(true);

          setTimeout(() => {
            fetchStory();
          }, 500);

          setTimeout(() => {
            setShowViewing(true);
          }, 1500);

          setTimeout(() => {
            setIntroTime(false);
          }, 5000);
        }}
        disabled={introTime}
      >
        다음 별을 찾아 떠나기
      </Button>
      <Button
        className="ml-2"
        onClick={() => {
          likeStory(id);
          setLiked(true);
        }}
      >
        <i
          className="fa-solid fa-heart"
          style={{ color: liked ? "#ff0000" : "#000" }}
        />
      </Button>
    </div>
  );
}
