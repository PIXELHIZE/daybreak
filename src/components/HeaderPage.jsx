import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import "./header.css";
import { login, logout, register, getMe } from "../../api/auth";

export default function HeaderPage() {
  const location = useLocation();
  const [activeBubble, setActiveBubble] = useState(null); // "login" | "signup" | null
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <nav>
      <div className="left-nav"></div>
      <div className="right-nav">
        <div className="left-buttons">
          <Button type="default">대시보드</Button>
          <Button type="default">사이트 소개</Button>
        </div>

        <div className="bubble-wrapper">
          <Button
            type="outline"
            onClick={() => {
              setActiveBubble((prev) => (prev === "login" ? null : "login"));
            }}
          >
            로그인
          </Button>

          {activeBubble === "login" && (
            <div className="bubble">
              <div className="bubble-arrow" />
              <div className="bubble-content">
                <label>아이디</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bubble-login-btn"
                  onClick={async () => {
                    await login({ email, password })
                      .then((token) => {
                        console.log("로그인 성공:", token);
                        // 로그인 성공 후 처리
                      })
                      .catch((error) => {
                        console.error("로그인 실패:", error);
                        // 로그인 실패 처리
                      });
                  }}
                >
                  로그인
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bubble-wrapper">
          <Button
            type="filled"
            onClick={() =>
              setActiveBubble((prev) => (prev === "signup" ? null : "signup"))
            }
          >
            회원가입
          </Button>

          {activeBubble === "signup" && (
            <div className="bubble">
              <div className="bubble-arrow" />
              <div className="bubble-content">
                <label>아이디</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bubble-login-btn"
                  onClick={async () => {
                    await register({ email, password })
                      .then((token) => {
                        console.log("회원가입 성공:", token);
                        // 로그인 성공 후 처리
                      })
                      .catch((error) => {
                        console.error("회원가입 실패:", error);
                        // 로그인 실패 처리
                      });
                  }}
                >
                  회원가입
                </button>
                <button
                  className="bubble-login-btn"
                  onClick={async () => {
                    await getMe()
                      .then((token) => {
                        console.log("회원가입 성공:", token);
                        // 로그인 성공 후 처리
                      })
                      .catch((error) => {
                        console.error("회원가입 실패:", error);
                        // 로그인 실패 처리
                      });
                  }}
                >
                  ME
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
