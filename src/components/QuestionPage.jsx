import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionsBySection } from "../data/questions";

const QuestionPage = ({ onSubmit }) => {
  const totalQuestions = questionsBySection.flatMap(sec => sec.questions).length;
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(3));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers); // 상태 저장
    navigate("/result"); // 결과 페이지로 이동
  };

  let globalIndex = 0;

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: "1rem",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          overflowY: "auto",
          maxHeight: "95vh"
        }}
      >
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          폐광부지 재생 전략 테스트
        </h1>

        {questionsBySection.map((section, secIdx) => (
          <div key={secIdx} style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2563eb",
              marginBottom: "1.5rem"
            }}>
              {section.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {section.questions.map((q) => {
                const currentIndex = globalIndex++;
                return (
                  <div key={q.id} style={{
                    backgroundColor: "#f9fafb",
                    padding: "1rem",
                    borderRadius: "0.5rem"
                  }}>
                    <p style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem"
                    }}>{q.text}</p>
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem"
                    }}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "1.5rem",
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: answers[currentIndex] === num ? "#2563eb" : "#d1d5db",
                            backgroundColor: answers[currentIndex] === num ? "#2563eb" : "#e5e7eb",
                            color: answers[currentIndex] === num ? "#ffffff" : "#374151",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transform: answers[currentIndex] === num ? "scale(1.1)" : "scale(1)",
                            transition: "all 0.2s ease-in-out"
                          }}
                          onClick={() => handleChange(currentIndex, num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              fontSize: "1.125rem",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer"
            }}
          >
            결과 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
