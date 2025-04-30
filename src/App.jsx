import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";
import ExamplePage from "./components/ExamplePage";

const App = () => {
  const [answers, setAnswers] = useState(null); // 사용자 답변 저장

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          {/* 메인 질문 페이지 */}
          <Route path="/" element={<QuestionPage onSubmit={setAnswers} />} />

          {/* 결과 페이지 - answers가 없으면 안내 메시지 출력 */}
          <Route
            path="/result"
            element={
              answers ? (
                <ResultPage answers={answers} />
              ) : (
                <div style={{ textAlign: "center", marginTop: "4rem", fontSize: "1.25rem" }}>
                  먼저 설문을 완료해주세요.
                </div>
              )
            }
          />

          {/* 사례 페이지 - 전략 이름은 ResultPage에서 전달됨 */}
          <Route path="/examples" element={<ExamplePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
