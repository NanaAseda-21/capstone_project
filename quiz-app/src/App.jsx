import { useState } from "react";
import QuizSetup from "./components/QuizSetup";
import QuizInterface from "./components/QuizInterface";
import "./App.css";

function App() {
  const [quizConfig, setQuizConfig] = useState(null); // 👈 store everything here
  const [quizStart, setQuizStart] = useState(false);

  const startQuiz = (topic, difficulty, numberOfQuestions) => {
    setQuizConfig({ topic, difficulty, numberOfQuestions }); // one stable object
    setQuizStart(true);
  };

  return (
    <div>
      {quizStart && quizConfig ? (
        <QuizInterface
          topic={quizConfig.topic}
          difficulty={quizConfig.difficulty}
          numberOfQuestions={quizConfig.numberOfQuestions}
        />
      ) : (
        <QuizSetup onStartQuiz={startQuiz} />
      )}
    </div>
  );
}

export default App;
