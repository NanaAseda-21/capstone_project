import { useState } from "react";
import QuizSetup from "./components/QuizSetup";
import QuizInterface from "./components/QuizInterface";
function App() {
     const[topic, setTopic]= useState("");
     const[difficulty, setDifficulty]= useState("");
     const[numberOfQuestions, setNumberOfQuestions]= useState(0);
     const[quizStart, setQuizStart] = useState(false);
     
     const startQuiz=(topic, difficulty, numberOfQuestions)=>{
      setTopic(topic);
      setDifficulty(difficulty);
      setNumberOfQuestions(numberOfQuestions);
      setQuizStart(true);
     };
  return (
    <div>
      { quizStart 
       ? <QuizInterface topic ={topic} difficulty={difficulty} numberOfQuestions={numberOfQuestions} /> 
       : 
       <QuizSetup onStartQuiz={startQuiz}/>
      }
    </div>
  )
  }

export default App;
