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

const strategyWeights = {
  "Tourism Development": [0.026, 0.047, 0.293, 0.089, 0.166, 0.378],
  "Environmental Restoration": [0.423, 0.275, 0.027, 0.058, 0.057, 0.16],
  "Economic Revitalization": [0.028, 0.385, 0.039, 0.086, 0.292, 0.171],
  "Community Infrastructure": [0.035, 0.167, 0.254, 0.074, 0.034, 0.435]
};

const strategyDescriptions = {
  "Tourism Development":
    "Activates the site through cultural, industrial, or eco-tourism programs that reinterpret mining heritage.\n\nStrategies\n1. Repurpose abandoned industrial facilities into artist studios or exhibition spaces.\n2. Preserve parts of mining sites and transform them into museums or cultural spaces.\n3. Build tourism infrastructure such as observation decks, cable cars, and trekking trails linked to mine tours.",
  "Environmental Restoration":
    "Focuses on ecological remediation of severely degraded lands, often prioritizing natural succession and habitat recovery.\n\nStrategies\n1. Restore vegetation and create ecological parks in former mining areas.\n2. Stabilize contaminated soils and damaged landforms for sustainable recovery.\n3. Establish education centers focused on climate change, energy, and environmental conservation.",
  "Economic Revitalization":
    "Repurposes the site to support new employment bases through industrial, entrepreneurial, or logistics uses.\n\nStrategies\n1. Introduce renewable energy industries such as wind and solar power plants.\n2. Establish future-oriented industrial infrastructure, including natural gas facilities, data centers, and digital server farms.\n3.Establish future-oriented industrial infrastructure, including natural gas facilities, data centers, and digital server farms.",
  "Community Infrastructure":
    "Converts post-mining sites into public infrastructure—parks, pathways, or civic spaces—to enhance community life.\n\nStrategies\n1. Establish community-based spaces such as community centers, village enterprise hubs, and assembly halls.\n2. Introduce public facilities to enhance resident welfare, including parks, sports areas, and playgrounds.\n3. Reinterpret industrial heritage by creating storytelling spaces and symbolic installations related to mining history.",
  "Minimal Intervention":
    "Prioritizes safety and low-impact use, allowing natural succession with minimal transformation.\n\nStrategies\n1. Preserve mining relics by maintaining original structures and installing informational signage about mining history.\n2. Create historical interpretation spaces using preserved mining facilities.\n3. Apply minimal intervention design strategies, focusing on simple spatial organization and subtle design elements."
};

const ResultPage = ({ answers }) => {
  const navigate = useNavigate();

  const sectionScores = questionsBySection.map((section) => {
    const values = section.questions.map((q) => answers[q.id - 1]);
    const avg = values.reduce((sum, score) => sum + score, 0) / values.length;
    return parseFloat(avg.toFixed(2));
  });

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
        label: isMinimal ? "Evaluation" : topStrategy.strategyName,
        data: sectionScores,
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(37, 99, 235, 1)"
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          font: { size: 12 },
          callback: function (label) {
            return label.split(" ").join("\n");
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
          Recommended Strategy: {isMinimal ? "Minimal Intervention" : topStrategy.strategyName}
        </h1>

        {/* Radar Chart */}
        <div style={{ width: "100%", maxWidth: "400px", height: "400px" }}>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* Strategy Score Ranking */}
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
              Strategy Scores:
            </h3>
            <ol>
              {sortedStrategies.map((s, idx) => (
                <li key={`strategy-${idx}`}>
                  {`${s.strategyName} - ${s.score.toFixed(3)}`}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Description */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#f1f5f9",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "left",
            fontSize: "1.125rem",
            color: "#1f2937",
            whiteSpace: "pre-wrap"
          }}
        >
          {strategyDescriptions[
            isMinimal ? "Minimal Intervention" : topStrategy.strategyName
          ]}
        </div>

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
          View Example
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
