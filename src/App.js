import React, { useState } from "react";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";

const App = () => {
  const [answers, setAnswers] = useState(null);

  const handleAnswersSubmit = (answers) => {
    setAnswers(answers);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!answers ? (
        <QuestionPage onSubmit={handleAnswersSubmit} />
      ) : (
        <ResultPage answers={answers} />
      )}
    </div>
  );
};

export default App;
