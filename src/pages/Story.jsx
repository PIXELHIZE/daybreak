import { motion } from "motion/react";
import Button from "../components/Button";
import Header from "../components/Header";
import ParticlesBackground from "../components/Particles";
import WritingStory from "../components/WritingStory";
import ViewStory from "../components/ViewStory";
import { useEffect, useState, useMemo } from "react";
import "./home.css";

function Story() {
  const [showContent, setShowContent] = useState(false);
  const [showWriting, setShowWriting] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const viewCardAnim =
    introDone && !showWriting
      ? { y: 0, visibility: "visible" }
      : { y: "100vh", visibility: "hidden" };
  const PANEL_H = "66vh";
  const RADIUS = "24px";

  const writingCardAnim =
    introDone && showWriting
      ? { y: 0, visibility: "visible" }
      : { y: "-100vh", visibility: "hidden" };

  const INTRO_DURATION = 1500;

  const memoizedParticles = useMemo(() => <ParticlesBackground />, []);

  useEffect(() => {
    const t0 = setTimeout(() => setShowContent(true), 100); // 기존 코드
    const t1 = setTimeout(() => setIntroDone(true), INTRO_DURATION);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  }, []);
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
      }}
    >
      {/* particle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: showContent ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {memoizedParticles}
      </motion.div>

      {/* centre */}
      {!showContent && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 0 50px rgba(255,255,255,0.5)",
            zIndex: 10,
          }}
        />
      )}

      {/* 메인 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: showContent ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",

          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(15px)",
        }}
      >
        <Header />

        <div
          className="p-8"
          style={{
            margin: "20px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#ffffff",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Story Page
          </h1> */}

          <motion.div
            initial={{ y: "-100vh", visibility: "hidden" }}
            animate={writingCardAnim}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              margin: "0 auto",
            }}
          >
            <WritingStory setShowWriting={setShowWriting} />
          </motion.div>
          <motion.div
            initial={{ y: "100vh", visibility: "hidden" }}
            animate={viewCardAnim}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              margin: "0 auto",
            }}
          >
            <ViewStory />
          </motion.div>
          {/* <p
            style={{
              fontSize: "1.125rem",
              textAlign: "center",
              color: "#ffffff",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            당신의 이야기를 들려주세요
          </p> */}
        </div>

        <motion.div
          initial={{ scale: 1, opacity: showWriting ? 0 : 1 }}
          animate={{ scale: 1, opacity: showWriting ? 0 : 1 }}
          transition={{ default: { duration: 3 }, scale: { duration: 0 } }}
        >
          <div className="bottom-button-container">
            <Button
              type="secondary"
              style={{
                borderRadius: "3.125rem",
                background: "rgba(255, 255, 255, 0.30)",
                width: "50px",
                height: "50px",
              }}
              onClick={() => {
                setShowWriting(!showWriting);
              }}
            >
              <i className="fa-solid fa-pen" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default Story;
