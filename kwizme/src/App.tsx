import React,{useState} from 'react';


import {fetchQuestions} from './Api';
import {QuestionState,Difficulty} from './Api';
//components
import QuestionCard from './components/QuestionCard';

//styles

import {GlobalStyle, AppWrapper} from './styles/styles';


const TOTAL_QUESTION = 10;

export type AnswerObject = {
  question: string;
  answer : string;
  correct : boolean;
  correctAnswer : string;

}

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true); 


  


  const startTrivia = async () =>{
      setLoading(true);
      setGameOver(false);
      const newQuestions = await fetchQuestions(TOTAL_QUESTION, Difficulty.EASY);
      setScore(0);
      setQuestions(newQuestions);
      setUserAnswers([]);
      setQuestionNum(0);
      setLoading(false);
  }


  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) =>{
      if(!gameOver){
        const answer = e.currentTarget.value
        const correct = questions[questionNum].correct_answer === answer;

        if(correct) setScore(prev => prev + 1)
        const answerObj = {
          question : questions[questionNum].question,
          answer,
          correct,
          correctAnswer : questions[questionNum].correct_answer

        };
        setUserAnswers(prev => [...prev, answerObj])
      }
  }


  const nextQuestion = ()=>{
      const nextQuestion = questionNum + 1;
      if(nextQuestion === TOTAL_QUESTION){
        setGameOver(true);
      }else{
        setQuestionNum(nextQuestion);
      }
  }
  return (
    <>
    <GlobalStyle/>
    <AppWrapper>
    <div className="App">
      <h1>KWIZME!</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ?(
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ):null}
      
      {!gameOver ? <p className="score"> Score : {score}</p>:null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
          <QuestionCard
        questionNumber = {questionNum + 1}
        totalQuestion = {TOTAL_QUESTION}
        question = {questions[questionNum].question}
        options = {questions[questionNum].options}
        userAnswer = {userAnswers ? userAnswers[questionNum] : undefined}
        callback = {checkAnswer}
          />
      )}
      
      {!gameOver && !loading && userAnswers.length === questionNum + 1 && questionNum !== TOTAL_QUESTION - 1  ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
      ):null}
      
    </div>
    </AppWrapper>
    </>
  );
}

export default App;
