import { motion, AnimatePresence } from "motion/react";
import Button from "../components/Button";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ParticlesBackground from "../components/Particles";
import "./home.css";

function Home() {
  const words = [
    "안녕하세요, 방문자님?",
    "이곳은 당신의 마음에 쌓인 무거운 짐을 털어낼 수 있는 곳입니다",
    "당신의 사연과 고민은 별이 될 것입니다",
    "그 별은 여행자가 방문 할 수 있습니다",
    "당신은 별을 만들 수도 여행자가 될 수도 있습니다",
    "이제 우주로 떠나 볼까요?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showSuckAnimation, setShowSuckAnimation] = useState(false);
  const navigate = useNavigate();

  // ParticlesBackground를 메모이제이션하여 재렌더링 방지
  const memoizedParticles = useMemo(() => <ParticlesBackground />, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= words.length) {
          clearInterval(interval);
          setIsAnimationComplete(true);
          // 2초 대기 후 빨려들어가는 애니메이션 시작
          setTimeout(() => {
            setShowSuckAnimation(true);
            // 빨려들어가는 애니메이션 완료 후 페이지 이동
            setTimeout(() => {
              navigate("/story");
            }, 1500);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length, navigate]);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 파티클 백그라운드도 빨려들어가는 효과 적용 */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={
          showSuckAnimation
            ? {
                scale: 0,
                opacity: 0,
                rotate: 360,
              }
            : {}
        }
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
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
      <motion.div
        className="Main-text"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          showSuckAnimation
            ? {
                scale: 0,
                opacity: 0,
                rotate: 720,
                filter: "blur(10px)",
              }
            : {}
        }
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(15px)",
        }}
      >
        <AnimatePresence mode="wait">
          {!showSuckAnimation && (
            <motion.div
              key={currentIndex}
              initial={{
                y: 80,
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                y: -80,
                scale: 0.7,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                maxWidth: "100%",
                lineHeight: 1.4,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {words[currentIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 빨려들어가는 효과를 위한 중앙 점 */}
      {showSuckAnimation && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 70%, transparent 100%)",
            boxShadow:
              "0 0 50px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3)",
            zIndex: 10,
          }}
        />
      )}
    </main>
  );
}

export default Home;
