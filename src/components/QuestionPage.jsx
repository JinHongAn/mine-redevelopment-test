import React, { useState } from "react";
import { questionsBySection } from "../data/questions";

const QuestionPage = ({ onSubmit }) => {
  const totalQuestions = questionsBySection.flatMap(sec => sec.questions).length;
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(3));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  let globalIndex = 0;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        maxHeight: '90vh'
      }}>
        {/* 타이틀 */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          폐광부지 재생 전략 테스트
        </h1>

        {/* 섹션별 질문 */}
        {questionsBySection.map((section, secIdx) => (
          <div key={secIdx} style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2563eb',
              marginBottom: '1.5rem'
            }}>
              {section.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {section.questions.map((q, qIdx) => {
                const currentIndex = globalIndex;
                globalIndex++;
                return (
                  <div key={q.id} style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem' }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{q.text}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      {[1, 2, 3, 4, 5].map((num) => {
                        const selected = answers[currentIndex] === num;
                        return (
                          <button
                            key={num}
                            style={{
                              width: '60px',
                              height: '60px',
                              fontSize: '1.5rem',
                              margin: '0 8px',
                              borderRadius: '50%',
                              border: '2px solid',
                              borderColor: selected ? '#2563eb' : '#d1d5db',
                              backgroundColor: selected ? '#2563eb' : '#e5e7eb',
                              color: selected ? '#ffffff' : '#374151',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transform: selected ? 'scale(1.2)' : 'scale(1)',
                              transition: 'all 0.2s ease-in-out',
                            }}
                            onClick={() => handleChange(currentIndex, num)}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* 결과 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
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
