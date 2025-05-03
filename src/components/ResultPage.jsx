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
    layout: {
      padding: 10
    },
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
            return label.length > 10
              ? label.match(/.{1,10}/g).join("\n")
              : label;
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-center">
          Recommended Strategy: {isMinimal ? "Minimal Intervention" : topStrategy.strategyName}
        </h1>

        {/* Radar Chart */}
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg h-[300px] sm:h-[350px] md:h-[400px]">
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* Strategy Score Ranking */}
        {!isMinimal && (
          <div className="w-full bg-gray-100 p-4 rounded text-gray-700 text-base leading-7">
            <h3 className="font-bold mb-2">Strategy Scores:</h3>
            <ol>
              {sortedStrategies.map((s, idx) => (
                <li key={`strategy-${idx}`}>
                  {`${idx + 1}. ${s.strategyName} - ${s.score.toFixed(3)}`}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Description */}
        <div className="w-full bg-blue-50 p-4 rounded text-gray-800 whitespace-pre-wrap text-base">
          {strategyDescriptions[
            isMinimal ? "Minimal Intervention" : topStrategy.strategyName
          ]}
        </div>

        <button
          onClick={goToExample}
          className="bg-emerald-500 text-white px-6 py-2 rounded-full text-base font-semibold"
        >
          View Example
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
