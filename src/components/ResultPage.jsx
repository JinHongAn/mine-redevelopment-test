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

// 전략별 가중치
const strategyWeights = {
  "Tourism-Oriented": [0.026, 0.047, 0.293, 0.089, 0.166, 0.378],
  "Environmental": [0.423, 0.275, 0.027, 0.058, 0.057, 0.160],
  "Economic": [0.028, 0.385, 0.039, 0.086, 0.292, 0.171],
  "Infrastructure": [0.035, 0.167, 0.254, 0.074, 0.034, 0.435]
};

// 전략별 설명
const strategyDescriptions = {
  "Tourism-Oriented":
    "문화·역사적 가치와 주변 관광 자원이 풍부하여 관광 중심의 재생이 적합합니다.",
  "Environmental":
    "환경 오염이 심각하여 생태 복원 및 환경 정화 중심의 전략이 필요합니다.",
  "Economic":
    "경제 활성화를 위해 산업 또는 창업 중심의 재생 전략이 적절합니다.",
  "Infrastructure":
    "지역 인프라 개선이 시급하여 기반 시설 확충 중심의 전략이 적합합니다.",
  "Minimal Intervention":
    "전체 점수가 낮아 적극적인 개입보다는 최소한의 유지 및 모니터링이 권장됩니다."
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

  const radarData = {
    labels: questionsBySection.map((s) => s.title),
    datasets: [
      {
        label: isMinimal ? "평가 결과" : topStrategy.strategyName,
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
      state: {
        strategy: isMinimal ? "Minimal Intervention" : topStrategy.strategyName
      }
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
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          추천 전략: {isMinimal ? "Minimal Intervention" : topStrategy.strategyName}
        </h1>

        {/* 레이더 차트 */}
        <div style={{ width: "400px", height: "400px" }}>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* 전략 점수 순위 (Minimal 제외) */}
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

        {/* 전략 해석 */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#f1f5f9",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            fontSize: "1.125rem",
            color: "#1f2937",
            minHeight: "100px"
          }}
        >
          {strategyDescriptions[
            isMinimal ? "Minimal Intervention" : topStrategy.strategyName
          ]}
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
