import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

function About() {
  const words = [
    "안녕하세요, 방문자님?",
    "이곳은 당신의 마음에 쌓인 무거운 짐을 털어낼 수 있는 곳입니다",
    "당신의 사연과 고민은 별이 될 것입니다",
    "그 별은 여행자가 방문 할 수 있습니다",
    "당신은 별을 만들 수도 여행자가 될 수도 있습니다",
    "이제 우주로 떠나 볼까요?",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < words.length) setIndex(index + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 600 }}
        animate={{ opacity: 1, y: 300 }}
        transition={{
          duration: 2,
          type: "tween",
          repeat: 1,
          repeatType: "mirror",
          repeatDelay: 2,
        }}
        className="p-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8">{words[index]}</h1>
      </motion.div>
    </AnimatePresence>
  );
}

export default About;
