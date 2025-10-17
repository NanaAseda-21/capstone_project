function QuizInterface({ topic, difficulty, numberOfQuestions }) {
  return (
    <div>
      <h2>Quiz Interface</h2>
      <p>Topic: {topic}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Number of Questions: {numberOfQuestions}</p>
    </div>
  );
}

export default QuizInterface;
