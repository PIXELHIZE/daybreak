import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
// import { motion } from "motion/react";
import Button from "./Button";
import "./header.css";

export default function HeaderPage() {
  const location = useLocation();
  return (
    <nav>
      <div className="left-nav"></div>
      <div className="right-nav">
        <div className="left-buttons">
          <Button type="default">대시보드</Button>
          <Button type="default">사이트 소개</Button>
        </div>
        <Button type="outline">로그인</Button>
        <Button type="filled">회원가입</Button>
      </div>
      {showBubble && (
        <div className="bubble">
          {/*로그인 폼 넣기*/}
          <h3>Login</h3>
          <form>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <button type="submit">확인</button>
          </form>
        </div>
      )}
    </nav>
  );
}
