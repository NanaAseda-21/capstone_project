import { useState, useEffect } from "react";

function QuizInterface({ topic, difficulty, numberOfQuestions }) {
  const [fetchQuestions, setFetchQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Only run this once per quiz start
    const fetchQuizQuestions = async () => {
      try {
        const categoryMap = {
          "General Knowledge": 9,
          Books: 10,
          Film: 11,
          Music: 12,
          "Science & Nature": 17,
          Computers: 18,
          Mathematics: 19,
          Sports: 21,
          Geography: 22,
          History: 23,
        };

        const categoryId = categoryMap[topic] || 9;

        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setFetchQuestions(data.results);
          setCurrentQuestion(0);
          setScore(0);
          setQuizFinished(false);
          setSelectedAnswer("");
        } else {
          alert("No questions found for this setup. Try again!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [topic, difficulty, numberOfQuestions]); // ✅ Runs only when setup changes

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (fetchQuestions.length === 0) {
    return <p>No questions available. Please try different settings.</p>;
  }

  const current = fetchQuestions[currentQuestion];
  const answers = [...current.incorrect_answers, current.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === current.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < fetchQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setFetchQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer("");
    setLoading(true);
  };

  if (quizFinished) {
    return (
      <div>
        <h2>🎉 Quiz Finished!</h2>
        <p>
          You scored {score} out of {fetchQuestions.length}
        </p>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-interface" >
      <h1>Quiz Time!</h1>
      <h2>
        Question {currentQuestion + 1} / {fetchQuestions.length}
      </h2>

      <p dangerouslySetInnerHTML={{ __html: current.question }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {answers.map((answer, index) => (
          <button className="options-button"
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            disabled={selectedAnswer !== ""}
            dangerouslySetInnerHTML={{ __html: answer }}
            
          />
        ))}
      </div>

      {selectedAnswer && (
        <div >
          <p>
            You selected:{" "}
            <span dangerouslySetInnerHTML={{ __html: selectedAnswer }} />
          </p>

          <p>
            {selectedAnswer === current.correct_answer ? (
              <span className="correct-button" >Correct!</span>
            ) : (
              <span className="wrong-button">
                 Wrong! Correct answer:{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: current.correct_answer,
                  }}
                />
              </span>
            )}
          </p>

          <button
            onClick={handleNextQuestion}
            className="next-button"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizInterface;
