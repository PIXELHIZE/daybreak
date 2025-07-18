import { motion, AnimatePresence } from "motion/react";
import Button from "../components/Button";
import Header from "../components/Header";
import ParticlesBackground from "../components/Particles";
import "./home.css";

function Home() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
      }}
    >
      <ParticlesBackground />
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8"
        style={{
          margin: "20px",
        }}
      >
        <h1
          className="text-4xl font-bold text-center mb-8"
          style={{
            color: "#ffffff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          Home Page
        </h1>
        <p
          className="text-lg text-center"
          style={{
            color: "#ffffff",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
          }}
        >
          Welcome to the home page!
        </p>
      </motion.div>

      <div className="bottom-button-container">
        <Button
          type="secondary"
          style={{
            borderRadius: "3.125rem",
            background: "rgba(255, 255, 255, 0.30)",
          }}
        >
          글쓰기
        </Button>
      </div>
    </main>
  );
  // background: {
  //   color: {
  //     value: "#0d47a1",
  //   },
  // },
  // fpsLimit: 120,
  // interactivity: {
  //   events: {
  //     onClick: {
  //       enable: true,
  //       mode: "push",
  //     },
  //     onHover: {
  //       enable: true,
  //       mode: "repulse",
  //     },
  //     resize: true,
  //   },
  //   modes: {
  //     push: {
  //       quantity: 4,
  //     },
  //     repulse: {
  //       distance: 200,
  //       duration: 0.4,
  //     },
  //   },
  // },
  // particles: {
  //   color: {
  //     value: "#ffffff",
  //   },
  //   links: {
  //     color: "#ffffff",
  //     distance: 150,
  //     enable: true,
  //     opacity: 0.5,
  //     width: 1,
  //   },
  //   move: {
  //     direction: "none",
  //     enable: true,
  //     outModes: {
  //       default: "bounce",
  //     },
  //     random: false,
  //     speed: 6,
  //     straight: false,
  //   },
  //   number: {
  //     density: {
  //       enable: true,
  //       area: 800,
  //     },
  //     value: 80,
  //   },
  //   opacity: {
  //     value: 0.5,
  //   },
  //   shape: {
  //     type: "circle",
  //   },
  //   size: {
  //     value: { min: 1, max: 5 },
  //   },
  // },
  // detectRetina: true,

  // <main>
  //   <Header />
  //   <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     transition={{ duration: 0.5 }}
  //     className="p-8"
  //   >
  //     <h1 className="text-4xl font-bold text-center mb-8">Home Page</h1>
  //     <p className="text-lg text-center text-gray-600">
  //       Welcome to the home page!
  //     </p>
  //   </motion.div>

  //   <div className="bottom-button-container">
  //     <Button
  //       type="secondary"
  //       style={{
  //         borderRadius: "3.125rem",
  //         background: "rgba(255, 255, 255, 0.30)",
  //       }}
  //     >
  //       글쓰기
  //     </Button>
  //   </div>
  // </main>
}

export default Home;
