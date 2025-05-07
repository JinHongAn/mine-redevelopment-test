import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";
import ExamplePage from "./components/ExamplePage";

const App = () => {
  const [answers, setAnswers] = useState(null); // 사용자 답변 저장

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          {/* 시작 페이지 */}
          <Route path="/" element={<StartPage />} />

          {/* 질문 페이지 */}
          <Route path="/questions" element={<QuestionPage onSubmit={setAnswers} />} />

          {/* 결과 페이지 */}
          <Route
            path="/result"
            element={
              answers ? (
                <ResultPage answers={answers} />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "4rem",
                    fontSize: "1.25rem"
                  }}
                >
                  먼저 설문을 완료해주세요.
                </div>
              )
            }
          />

          {/* 전략 사례 페이지 */}
          <Route path="/examples" element={<ExamplePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
