import { useState } from "react";

function QuizSetup({ onStartQuiz }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const initiate = () => {
    if (topic && difficulty && numberOfQuestions) {
      onStartQuiz(topic, difficulty, numberOfQuestions);
    } else {
      alert("Please select all options before starting!");
    }
  };

  return (
    <div className="quiz-container">
      <h2>Please select your preferred topic!</h2>
      <label htmlFor="topic">Select a topic:</label>
      <select
        id="topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      
      >
        <option value="">Choose a topic for this quiz, please</option>
       <option value="General Knowledge">General Knowledge</option>
        <option value="Books">Books</option>
        <option value="Film">Film</option>
        <option value="Music">Music</option>
        <option value="Science & Nature">Science & Nature</option>
        <option value="Computers">Computers</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Sports">Sports</option>
        <option value="Geography">Geography</option>
        <option value="History">History</option>
      </select>
      <p>Wonderful, you selected:{topic}</p>

      <div>
        <h2>Please select your preferred difficulty!</h2>
        <label htmlFor="difficulty">Select difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Choose a difficulty level for this quiz</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <h2>Please select your preferred number of questions!</h2>
        <label htmlFor="questions">Select number of questions:</label>
        <select
          id="questions"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
        >
          <option value="">Choose number of questions</option>
          <option value="5">Five questions</option>
          <option value="10">Ten questions</option>
          <option value="20">Twenty questions</option>
        </select>
      </div>

      <button onClick={initiate}>Start quiz</button>
    </div>
  );
}

export default QuizSetup;
