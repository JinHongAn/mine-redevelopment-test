import React from "react";
import { useLocation } from "react-router-dom";

// 전략별 사례 이미지 + 설명 정의
const strategyExamples = {
  "Tourism-Oriented": {
    image: "/images/tourismOriented.png",
    description:
      "정선 지역의 폐광 부지를 리조트로 재탄생시킨 하이원리조트와 같이, 문화·관광 자원과 연계한 사례입니다."
  },
  "Environmental": {
    image: "/images/environment.jpg",
    description:
      "충남 논산의 폐광 지역을 생태공원으로 조성한 사례처럼, 환경 정화와 자연 복원을 중심으로 한 전략입니다."
  },
  "Economic": {
    image: "/images/economic.jpg",
    description:
      "독일 루르 산업지대의 Zollverein 탄광을 창업·문화 복합공간으로 재생한 대표적인 사례입니다."
  },
  "Infrastructure": {
    image: "/images/infrastructure.jpg",
    description:
      "낙후된 폐광 지역에 산업도로와 물류 인프라를 집중 공급한 사례로, 지역 생활 인프라 기반 확충 중심 전략입니다."
  },
  "Minimal Intervention": {
    image: "/images/minimal.jpg",
    description:
      "지속적인 개발보다 생태적 회복을 위한 최소 개입 유지 사례입니다. 탐방로만 조성하고 자연에 맡기는 방식이 대표적입니다."
  }
};

const ExamplePage = () => {
  const location = useLocation();
  const strategy = location.state?.strategy || "알 수 없음";
  const example = strategyExamples[strategy];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem"
          }}
        >
          {strategy} 전략 사례
        </h1>

        {/* 이미지 출력 */}
        {example?.image && (
          <img
            src={example.image}
            alt={`${strategy} example`}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "0.5rem",
              marginBottom: "1.5rem"
            }}
          />
        )}

        {/* 설명 출력 */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "#374151",
            lineHeight: "1.8"
          }}
        >
          {example?.description || "해당 전략에 대한 사례 설명이 없습니다."}
        </p>
      </div>
    </div>
  );
};

export default ExamplePage;
