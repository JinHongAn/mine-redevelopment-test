import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/questions");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem"
      }}
    ><br></br>
    <br></br>
    <br></br>
      {/* 제목 + 버튼 묶음 */}
      <div style={{ marginTop: "6rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
          MineScape Toolkit:
        </h1>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "500",
            color: "#4b5563",
            marginTop: "0.5rem",
            marginBottom: "2rem"
          }}
        >
           A Contextual Framework for<br />Post-Mining Regeneration
        </h2>
        <button
          onClick={handleStart}
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "0.5rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Start
        </button>
      </div>

      {/* 하단 이미지 */}
      <img
        src="/images/start-image.png"
        alt="Mining Site"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          maxWidth: "800px"
        }}
      />
    </div>
  );
};

export default StartPage;
