import React,{useState} from 'react';


import {fetchQuestions} from './Api';
import {Difficulty} from './Api';
//components
import QuestionCard from './components/QuestionCard';


const TOTAL_QUESTION = 10;

function App() {

  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNum, seQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true); 


  console.log(fetchQuestions(10,Difficulty.EASY))


  const startTrivia = async () =>{

  }

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) =>{

  }


  const nextQuestion = ()=>{

  }
  return (
    <div className="App">
      <h1>KWIZME!</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score"> Score :</p>
      <p>Loading Questions...</p>
      {/*<QuestionCard
        questionNumber = {questionNum + 1}
        totalQuestion = {TOTAL_QUESTION}
        question = {questions[questionNum].question}
        answers = {questions[questionNum].answers}
        userAnswer = {userAnswers ? userAnswers[questionNum] : undefined}
        callback = {checkAnswer}
      />*/}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
