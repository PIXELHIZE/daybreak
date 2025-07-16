import { useState } from "react";
import { motion } from "motion/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <p>tailwind 이건 좀..</p>
        <p>이건 좀 할말이 없을지도</p>
        <motion.div
          key={count}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl my-2"
        >
          Count: {count}
        </motion.div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          이것은 버튼입니다
        </button>
      </div>
    </>
  );
}

export default App;
