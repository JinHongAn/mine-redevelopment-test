import React from "react";
import { useLocation } from "react-router-dom";

// 전략별 사례 정보 (이름 + 이미지 + 설명)
const strategyExamples = {
  "Tourism-Oriented": {
    title: "Tourism Development",
    case: "Fosse n°9 - 9bis",
    image: "/images/tourism.png",
    description:
      "A former coal mining site transformed into a heritage interpretation complex, featuring a mining museum, guided tours, walking trails, and public exhibitions. The project revitalizes industrial history as a regional tourism asset."
  },
  "Environmental": {
    title: "Environmental Restoration",
    case: "Wangaloa Coal Mine",
    image: "/images/environment.png",
    description:
      "Once a heavily disturbed open-cast mine, Wangaloa has been restored through ecological succession and native planting. With minimal structural interference, the site supports long-term ecological succession."
  },
  "Economic": {
    title: "Economic Revitalization",
    case: "Genesee Mine",
    image: "/images/economic.png",
    description:
      "Genesee Mine has been repurposed to serve as a regional industrial and energy transition hub. By integrating clean energy generation and industrial logistics, it supports local employment and economic stabilization."
  },
  "Infrastructure": {
    title: "Community Infrastructure",
    case: "Vintondale Colliery",
    image: "/images/infrastructure.png",
    description:
      "A former coal mine regenerated into a community park through the “AMD&ART” project, combining mine drainage treatment, public trails, wetlands, and art to restore both ecology and daily use."
  },
  "Minimal Intervention": {
    title: "Minimal Intervention",
    case: "Iizuka Coal Mine",
    image: "/images/minimal.png",
    description:
      "The Iizuka site reflects a passive preservation approach, allowing the landscape to regenerate without major redevelopment. Fencing and signage prevent intrusion while ecological succession unfolds."
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
            marginBottom: "0.5rem"
          }}
        >
          {example?.title} 전략 사례
        </h1>

        <h2
          style={{
            fontSize: "1.25rem",
            color: "#6b7280",
            marginBottom: "1.5rem"
          }}
        >
          Case Example: {example?.case}
        </h2>

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
