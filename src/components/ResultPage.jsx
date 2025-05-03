import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { questionsBySection } from "../data/questions";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// 전략별 AHP 가중치
const strategyWeights = {
  "Tourism-Oriented": [0.026, 0.047, 0.293, 0.089, 0.166, 0.378],
  "Environmental": [0.423, 0.275, 0.027, 0.058, 0.057, 0.160],
  "Economic": [0.028, 0.385, 0.039, 0.086, 0.292, 0.171],
  "Infrastructure": [0.035, 0.167, 0.254, 0.074, 0.034, 0.435]
};

// 전략별 상세 설명 및 예시
const strategyDetails = {
  "Tourism-Oriented": {
    title: "Tourism Development",
    description:
      "Activates the site through cultural, industrial, or eco-tourism programs that reinterpret mining heritage.",
    strategies: [
      "Repurpose abandoned industrial facilities into artist studios or exhibition spaces.",
      "Preserve parts of mining sites and transform them into museums or cultural spaces.",
      "Build tourism infrastructure such as observation decks, cable cars, and trekking trails linked to mine tours."
    ]
  },
  "Environmental": {
    title: "Environmental Restoration",
    description:
      "Focuses on ecological remediation of severely degraded lands, often prioritizing natural succession and habitat recovery.",
    strategies: [
      "Restore vegetation and create ecological parks in former mining areas.",
      "Stabilize contaminated soils and damaged landforms for sustainable recovery.",
      "Establish education centers focused on climate change, energy, and environmental conservation."
    ]
  },
  "Economic": {
    title: "Economic Revitalization",
    description:
      "Repurposes the site to support new employment bases through industrial, entrepreneurial, or logistics uses.",
    strategies: [
      "Introduce renewable energy industries such as wind and solar power plants.",
      "Establish future-oriented industrial infrastructure, including natural gas facilities, data centers, and digital server farms.",
      "Support startup clusters and logistics hubs to attract economic activity."
    ]
  },
  "Infrastructure": {
    title: "Community Infrastructure",
    description:
      "Converts post-mining sites into public infrastructure—parks, pathways, or civic spaces—to enhance community life.",
    strategies: [
      "Establish community-based spaces such as community centers, village enterprise hubs, and assembly halls.",
      "Introduce public facilities to enhance resident welfare, including parks, sports areas, and playgrounds.",
      "Reinterpret industrial heritage by creating storytelling spaces and symbolic installations related to mining history."
    ]
  },
  "Minimal Intervention": {
    title: "Minimal Intervention",
    description:
      "Prioritizes safety and low-impact use, allowing natural succession with minimal transformation.",
    strategies: [
      "Preserve mining relics by maintaining original structures and installing informational signage about mining history.",
      "Create historical interpretation spaces using preserved mining facilities.",
      "Apply minimal intervention design strategies, focusing on simple spatial organization and subtle design elements."
    ]
  }
};

const ResultPage = ({ answers }) => {
  const navigate = useNavigate();

  // 분야별 평균 점수 계산
  const sectionScores = questionsBySection.map((section) => {
    const values = section.questions.map((q) => answers[q.id - 1]);
    const avg =
      values.reduce((sum, score) => sum + score, 0) / values.length;
    return parseFloat(avg.toFixed(2));
  });

  // 전략별 점수 계산
  const strategyResults = Object.entries(strategyWeights).map(
    ([strategyName, weights]) => {
      const total = weights.reduce(
        (sum, weight, i) => sum + weight * sectionScores[i],
        0
      );
      return { strategyName, score: parseFloat(total.toFixed(3)) };
    }
  );

  const sortedStrategies = [...strategyResults].sort(
    (a, b) => b.score - a.score
  );
  const topStrategy = sortedStrategies[0];
  const isMinimal = topStrategy.score < 3.0;
  const strategyKey = isMinimal ? "Minimal Intervention" : topStrategy.strategyName;

  // 레이더 차트 데이터
  const radarData = {
    labels: questionsBySection.map((s) => s.title),
    datasets: [
      {
        label: strategyDetails[strategyKey].title,
        data: sectionScores,
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(37, 99, 235, 1)"
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: "transparent"
        },
        pointLabels: {
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: { display: true }
    }
  };

  const goToExample = () => {
    navigate("/examples", {
      state: { strategy: strategyKey }
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: "2rem"
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem"
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
          추천 전략: {strategyDetails[strategyKey].title}
        </h1>

        {/* 레이더 차트 */}
        <div style={{ width: "100%", maxWidth: "400px", height: "400px" }}>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* 전략 점수 순위 */}
        {!isMinimal && (
          <div
            style={{
              width: "100%",
              backgroundColor: "#f9fafb",
              padding: "1rem",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              color: "#374151",
              lineHeight: 1.8
            }}
          >
            <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              전략 점수 순위:
            </h3>
            <ol>
              {sortedStrategies.map((s, idx) => (
                <li key={`strategy-${idx}`}>
                  {s.strategyName} - {s.score.toFixed(3)}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 전략 설명 + 예시 */}
        <div style={{ width: "100%", textAlign: "left" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            {strategyDetails[strategyKey].title}
          </h2>
          <p style={{ marginBottom: "0.75rem", lineHeight: 1.6 }}>
            {strategyDetails[strategyKey].description}
          </p>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", lineHeight: 1.7 }}>
            {strategyDetails[strategyKey].strategies.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>

        {/* 사례 보기 버튼 */}
        <button
          onClick={goToExample}
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer"
          }}
        >
          사례 보기
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
