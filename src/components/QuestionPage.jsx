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
    onSubmit(answers);
    navigate("/result");
  };

  let globalIndex = 0;

  return (
    <>
      {/* ✅ 반응형 스타일 정의 */}
      <style>{`
        .score-button {
          aspect-ratio: 1 / 1;
          font-weight: bold;
          border-radius: 50%;
          border: 2px solid #d1d5db;
          background-color: #e5e7eb;
          color: #374151;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .score-button.selected {
          border-color: #2563eb;
          background-color: #2563eb;
          color: white;
          transform: scale(1.08);
        }

        @media (max-width: 480px) {
          .score-button {
            width: 36px;
          }
        }

        @media (max-width: 768px) {
          .score-button {
            width: 44px;
          }
        }

        @media (min-width: 769px) {
          .score-button {
            width: 56px;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
          padding: "1rem",
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
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "2rem",
              textAlign: "center"
            }}
          >
            Test of Waste Mine Regeneration Strategy
          </h1>

          {questionsBySection.map((section, secIdx) => (
            <div key={secIdx} style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "1.5rem"
                }}
              >
                {section.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {section.questions.map((q) => {
                  const currentIndex = globalIndex++;
                  return (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: "#f9fafb",
                        padding: "1rem",
                        borderRadius: "0.5rem"
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem"
                        }}
                      >
                        {q.text}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "0.75rem",
                          flexWrap: "wrap"
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            className={`score-button ${
                              answers[currentIndex] === num ? "selected" : ""
                            }`}
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
              View Test Result
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
