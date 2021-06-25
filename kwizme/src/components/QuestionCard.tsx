import React from 'react';

import {AnswerObject} from '../App';

import {QuestionWrapper, ButtonWrapper} from '../styles/styles';

type Props = {
    question: string;
    options : string[];
    callback:(e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer:AnswerObject | undefined;
    questionNumber: number;
    totalQuestion: number;
}

const QuestionCard : React.FC<Props> = ({question, 
    options, 
    callback,
    userAnswer,
    questionNumber,
    totalQuestion})=> (

    <QuestionWrapper>
        <p className="number">
            Question : {questionNumber}/{totalQuestion}
        </p>

        <p dangerouslySetInnerHTML={{__html:question}}/>
        <div>
            {options.map(answer=>(
                <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
                    <button disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </QuestionWrapper>

);

export default QuestionCard;