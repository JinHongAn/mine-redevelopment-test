import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";
import ExamplePage from "./components/ExamplePage";
import ExamplePage2 from "./components/ExamplePage2";

const App = () => {
  const [answers, setAnswers] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/questions" element={<QuestionPage onSubmit={setAnswers} />} />
          <Route
            path="/result"
            element={
              answers ? (
                <ResultPage answers={answers} />
              ) : (
                <div style={{ textAlign: "center", marginTop: "4rem", fontSize: "1.25rem" }}>
                  알림을 완료해주세요.
                </div>
              )
            }
          />
          <Route path="/examples" element={<ExamplePage />} />
          <Route path="/examples2" element={<ExamplePage2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
