import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "./Button";
import "./header.css";
import { login, logout, register, getMe } from "../../api/auth";
import Swal from "sweetalert2";

/**
 * @param {boolean} introDone  Story.js에서 전달: 배경 확대(인트로) 끝났는지 여부
 */
export default function Header({ introDone = true }) {
  /* ✨ 인트로가 끝나기 전에는 DOM 자체를 렌더하지 않음 */
  if (!introDone) return null;

  /* ─────────────────────────────────────────────────────────── */
  const location = useLocation();

  const [activeBubble, setActiveBubble] = useState(null); // "login" | "signup" | null
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [clicked, setClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);

  const [isLogOrSignup, setIsLogOrSignup] = useState(false);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /* 유저 정보 로드 */
  useEffect(() => {
    getMe()
      .then((userData) => {
        console.log("사용자 정보:", userData);
        setUser(userData);
      })
      .catch((error) => {
        console.error("사용자 정보 가져오기 실패:", error);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [location.pathname, isLogOrSignup]);

  /* ─────────────────────────────────────────────────────────── */
  return (
    <nav>
      {/* 로고 */}
      <Link to="/">
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            fontFamily: "OG_Renaissance_Secret-Rg",
            paddingLeft: "1rem",
          }}
        >
          스담
        </h1>
      </Link>

      {/* 우측 메뉴 */}
      {isLoading ? (
        <div className="right-nav">
          <Button type="default" disabled>
            로딩 중...
          </Button>
        </div>
      ) : user ? (
        /* 로그인 상태 */
        <>
          <div className="right-nav-left">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button type="default">대시보드</Button>
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <Button type="default">사이트 소개</Button>
            </Link>
          </div>
          <div className="right-nav-right">
            <span className="user-greeting">안녕하세요, {user.email}님!</span>
            <Button
              type="default"
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              로그아웃
            </Button>
          </div>
        </>
      ) : (
        /* 비로그인 상태 */
        <div className="right-nav">
          {/* 왼쪽 기본 메뉴 */}
          <div className="left-buttons">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button type="default">대시보드</Button>
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <Button type="default">사이트 소개</Button>
            </Link>
          </div>

          {/* 로그인 버블 */}
          <div className="bubble-wrapper">
            <Button
              type="outline"
              onClick={() => {
                setActiveBubble((prev) => (prev === "login" ? null : "login"));
                setClicked((prev) => !prev);
                setSignupClicked(false);

                setEmail("");
                setPassword("");
              }}
            >
              로그인
            </Button>
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: clicked ? 1 : 0, y: clicked ? -50 : -25 }}
              transition={{ duration: clicked ? 1 : 0, ease: "easeInOut" }}
            >
              {activeBubble === "login" && (
                <div className="bubble">
                  <div className="bubble-arrow" />
                  <div className="bubble-content">
                    <label>아이디</label>
                    <input
                      type="text"
                      placeholder="아이디를 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>비밀번호</label>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="bubble-login-btn"
                      onClick={async () => {
                        if (!email || !password) {
                          Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "아이디와 비밀번호를 입력해주세요.",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                          });
                          return;
                        }
                        await login({ email, password })
                          .then((e) => {
                            console.log("로그인 성공");
                            setIsLogOrSignup((prev) => !prev);
                            setActiveBubble(null);
                            Swal.fire({
                              toast: true,
                              position: "top-end",
                              icon: "success",
                              title: "로그인 성공!",
                              showConfirmButton: false,
                              timer: 3000,
                              timerProgressBar: true,
                            });
                          })
                          .catch((error) => {
                            console.error("로그인 실패:", error);
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
                      로그인
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* 회원가입 버블 */}
          <div className="bubble-wrapper">
            <Button
              type="filled"
              onClick={() => {
                setActiveBubble((prev) =>
                  prev === "signup" ? null : "signup"
                );
                setSignupClicked((prev) => !prev);
                setClicked(false);

                setEmail("");
                setPassword("");
              }}
            >
              회원가입
            </Button>
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{
                opacity: signupClicked ? 1 : 0,
                y: signupClicked ? -50 : -25,
              }}
              transition={{
                duration: signupClicked ? 1 : 0,
                ease: "easeInOut",
              }}
            >
              {activeBubble === "signup" && (
                <div className="bubble">
                  <div className="bubble-arrow" />
                  <div className="bubble-content">
                    <label>아이디</label>
                    <input
                      type="text"
                      placeholder="아이디를 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>비밀번호</label>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>비밀번호 확인</label>
                    <input
                      type="password"
                      placeholder="비밀번호를 다시 입력하세요"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <button
                      className="bubble-login-btn"
                      onClick={async () => {
                        if (password !== passwordConfirm) {
                          Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "비밀번호가 일치하지 않습니다.",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                          });
                          return;
                        }
                        if (!email || !password) {
                          Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "아이디와 비밀번호를 입력해주세요.",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                          });
                          return;
                        }
                        await register({ email, password })
                          .then(() => {
                            console.log("회원가입 성공");
                            setIsLogOrSignup((prev) => !prev);
                          })
                          .catch((error) => {
                            console.error("회원가입 실패:", error);
                          });
                      }}
                    >
                      회원가입
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </nav>
  );
}
