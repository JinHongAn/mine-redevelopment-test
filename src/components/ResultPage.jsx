import React from "react";
import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { questionsBySection } from "../data/questions";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const strategyWeights = {
  "Tourism Activation": [0.027, 0.047, 0.293, 0.089, 0.166, 0.378],
  "Environmental Recovery": [0.423, 0.275, 0.027, 0.058, 0.057, 0.16],
  "Economic Revitalization": [0.027, 0.385, 0.039, 0.086, 0.292, 0.171],
  "Community Space Development": [0.036, 0.167, 0.254, 0.074, 0.034, 0.435]
};

const strategyDescriptions = {
  "Tourism Activation": `Activates the site through cultural, industrial, or eco-tourism programs that reinterpret mining heritage.\n\nStrategies\n1. Repurpose abandoned industrial facilities into artist studios or exhibition spaces.\n2. Preserve parts of mining sites and transform them into museums or cultural spaces.\n3. Build tourism infrastructure such as observation decks, cable cars, and trekking trails linked to mine tours.`,
  "Environmental Recovery": `Focuses on ecological remediation of severely degraded lands, often prioritizing natural succession and habitat recovery.\n\nStrategies\n1. Restore vegetation and create ecological parks in former mining areas.\n2. Stabilize contaminated soils and damaged landforms for sustainable recovery.\n3. Establish education centers focused on climate change, energy, and environmental conservation.`,
  "Economic Revitalization": `Repurposes the site to support new employment bases through industrial, entrepreneurial, or logistics uses.\n\nStrategies\n1. Introduce renewable energy industries such as wind and solar power plants.\n2. Establish future-oriented industrial infrastructure, including natural gas facilities, data centers, and digital server farms.`,
  "Community Space Development": `Converts post-mining sites into public infrastructure—parks, pathways, or civic spaces—to enhance community life.\n\nStrategies\n1. Establish community-based spaces such as community centers, village enterprise hubs, and assembly halls.\n2. Introduce public facilities to enhance resident welfare, including parks, sports areas, and playgrounds.\n3. Reinterpret industrial heritage by creating storytelling spaces and symbolic installations related to mining history.`,
  "Low-Impact Management": `Prioritizes safety and low-impact use, allowing natural succession with minimal transformation.\n\nStrategies\n1. Preserve mining relics by maintaining original structures and installing informational signage about mining history.\n2. Create historical interpretation spaces using preserved mining facilities.\n3. Apply minimal intervention design strategies, focusing on simple spatial organization and subtle design elements.`
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

  function wrapLabel(label, maxLineLength = 10) {
    const words = label.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + word).length > maxLineLength) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });

    if (currentLine) lines.push(currentLine.trim());
    return lines;
  }

  const sortedStrategies = [...strategyResults].sort((a, b) => b.score - a.score);
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
          font: { size: 13 },
          callback: function (label) {
            return wrapLabel(label);
          }
        }
      }
    },
    plugins: {
      legend: { display: true }
    }
  };


  const fixedOrder = [
    "Tourism Activation",
    "Environmental Recovery",
    "Economic Revitalization",
    "Community Space Development"
  ];

  const barData = {
    labels: fixedOrder,
    datasets: [
      {
        label: "Score",
        data: fixedOrder.map((name) => {
          const strategy = strategyResults.find((s) => s.strategyName === name);
          return strategy ? strategy.score : 0;
        }),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",   // Blue
          "rgba(34, 197, 94, 0.7)",    // Green
          "rgba(234, 179, 8, 0.7)",    // Yellow
          "rgba(239, 68, 68, 0.7)"     // Red
        ],
        borderRadius: 5,
        barThickness: 25
      }
    ]
  };
  
  

  const barOptions = {
    indexAxis: "x",
    scales: {
      x: {
        min: 0,
        max: 5
      }
    },
    plugins: {
      legend: { display: false }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const goToExample = () => {
    navigate("/examples", {
      state: {
        strategy: isMinimal ? "Low-Impact Management" : topStrategy.strategyName
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
          maxWidth: "1000px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem"
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
          Recommended Strategy: {isMinimal ? "Low-Impact Management" : topStrategy.strategyName}
        </h1>

        <div style={{ width: "100%", maxWidth: "600px", height: "400px", margin: "0 auto" }}>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {!isMinimal && (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: 1, minWidth: "280px", height: "250px" }}>
              <Bar data={barData} options={barOptions} />
            </div>
            <div style={{ flex: 1, minWidth: "200px", backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "0.5rem" }}>
              <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Strategy Scores:</h3>
              <ol>
                {sortedStrategies.map((s, idx) => (
                  <li key={idx}>{`${s.strategyName} - ${s.score.toFixed(3)}`}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

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
          {strategyDescriptions[isMinimal ? "Low-Impact Management" : topStrategy.strategyName]}
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
            cursor: "pointer",
            alignSelf: "center"
          }}
        >
          View Example
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
