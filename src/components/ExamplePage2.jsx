import React from "react";
import { useLocation } from "react-router-dom";

// 전략별 사례 정보 (이름 + 이미지 + 설명)
const strategyExamples = {
  "Tourism Activation": {
    title: "Tourism Activation",
    case: "Zollverein",
    image: "/images/tourism2.png",
    description:
      "Zollverein, located in Essen, Germany, is one of the most emblematic examples of post-industrial landscape regeneration. Following its closure in 1986, the former coal mine complex was transformed into a vibrant cultural and artistic hub, skillfully balancing industrial heritage preservation with contemporary reuse. In 2001, it was designated a UNESCO World Heritage Site in recognition of its historical and architectural significance."
  },
  "Environmental Recovery": {
    title: "Environmental Recovery",
    case: "The Jennings Environmental Education Center",
    image: "/images/environment2.png",
    description:
      "The Jennings Environmental Education Center, located in Slippery Rock, Pennsylvania, is a notable example of post-mining landscape regeneration. Once degraded by coal extraction, the site has been transformed into a nature-based public space centered on ecological conservation and environmental education."
  },
  "Economic Revitalization": {
    title: "Economic Revitalization",
    case: "The Dave Johnston mine",
    image: "/images/economic2.png",
    description:
      "The Dave Johnston mine and power plant site near Glenrock, Wyoming, exemplifies an economic revitalization strategy through energy transition and industrial repurposing. The reclaimed land was converted into the Glenrock and Rolling Hills Wind Farms, leveraging the existing industrial footprint and open landscape to establish a new renewable energy economy. "
  },
  "Community Space Development": {
    title: "Community Space Development",
    case: "Zeche Friedrich Thyssen",
    image: "/images/infrastructure2.png",
    description:
      "Zeche Friedrich Thyssen, located in northern Duisburg, Germany, is a representative example of post-mining urban regeneration that transformed a former coal site into community-oriented green infrastructure."
  },
  "Low-Impact Management": {
    title: "Low-Impact Management",
    case: "Puits Arthur-de-Buyer",
    image: "/images/minimal2.png",
    description:
      "Puits Arthur-de-Buyer, located in the Bourgogne-Franche-Comté region of France, is a representative example of a former coal mining site where only minimal intervention has taken place. The site is occasionally visited informally by hikers, urban explorers, and local residents, despite the absence of official access or public programming. "
  }
};

const ExamplePage = () => {
  const location = useLocation();
  const strategy = location.state?.strategy || "Unknown";
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
          {example?.title}
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
          {example?.description || "There is no case description for this strategy."}
        </p>
      </div>
    </div>
  );
};

export default ExamplePage;