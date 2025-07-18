import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../api/users";
import { myStories, likeStory, storyLikes } from "../../api/story";
import Swal from "sweetalert2";
import Header from "../components/Header";
import ParticlesBackground from "../components/Particles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const memoizedParticles = useMemo(() => <ParticlesBackground />, []);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [storyLikesCount, setStoryLikesCount] = useState({});

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    initialSlide: 0,
  };

  useEffect(() => {
    getMe()
      .then((data) => {
        console.log("User data:", data);
        setUser(data);

        return myStories();
      })
      .then((storiesData) => {
        setStories(storiesData);
        // get likes
        storiesData.forEach((story) => {
          storyLikes(story.id).then((likes) => {
            setStoryLikesCount((prev) => ({
              ...prev,
              [story.id]: likes.likes,
            }));
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "로그인 후 이용 가능합니다.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate("/story");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLike = async (storyId) => {
    try {
      await likeStory(storyId);

      const likes = await storyLikes(storyId);
      setStoryLikesCount((prev) => ({
        ...prev,
        [storyId]: likes.likes,
      }));
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return (
    <>
      {!isLoading && <Header />}
      <main className="dashboard-container">
        {memoizedParticles}
        <br />
        <br />
        <br />
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          <div>
            <h1 className="dashboard-name">{user.email || "undefined"}</h1>
            <p className="dashboard-greet">
              {user.email || "undefined"} 님, 우주 여행은 잘 하고 계신가요?
            </p>

            {stories.length > 0 && (
              <div className="story-slider-container">
                <Slider {...sliderSettings}>
                  {stories.map((story) => (
                    <div key={story.id}>
                      <div className="story-card">
                        <div className="story-content">
                          <p className="story-text">{story.content}</p>
                        </div>
                        <div className="story-footer">
                          <button
                            className="like-btn"
                            onClick={() => handleLike(story.id)}
                          >
                            ♥ {storyLikesCount[story.id] || 0}명의
                            우주여행자들이 이 별에 공감을 하고 있어요
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            <button className="write-btn" onClick={() => navigate("/story")}>
              글쓰기
            </button>
          </div>
        )}
      </main>
    </>
  );
}
