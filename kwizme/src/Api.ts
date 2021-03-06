import {shuffleOptions} from  "./utils";


export type Question = {
    category: string,
    difficulty:string,
    correct_answer: string,
    incorrect_answers: string[]
    question:string;
    type:string
}
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type QuestionState = Question & {
    options : string[]
}
export const fetchQuestions = async (amount:number, difficulty:Difficulty)=>{
   const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
   const data = await (await fetch(url)).json();
   return data.results.map((question:Question)=>(
       {
           ...question,
           options: shuffleOptions([...question.incorrect_answers,question.correct_answer])
       }
   ))

}