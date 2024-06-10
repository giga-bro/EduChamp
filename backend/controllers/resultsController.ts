// @ts-nocheck
import Results from "../models/Results";
import { Request, Response } from 'express';

export const storeResults = async (req: Request, res: Response) => {
  try {
    console.log('camed',req.body)
    const { username, testId, score, difficulty, tag, question, correct, selected, isCorrect, options, status, timeTaken } = req.body;
    const result = await Results.findOne({ username });
    if (result) {
      const testIndex = (result as any).tests.findIndex((test: any) => test.test_id === testId);
      if (testIndex !== -1) {
        (result as any).tests[testIndex].score = score;
        (result as any).tests[testIndex].status = status;
        (result as any).tests[testIndex].timeTaken = timeTaken;
        (result as any).tests[testIndex].QnA.push({ question, tag, difficulty, selected_answer: selected, correct_answer: correct, is_correct: isCorrect, options });
      } else {
        (result as any).tests.push({ test_id: testId, score, status, timeTaken, QnA: [{ question, tag, difficulty, selected_answer: selected, correct_answer: correct, is_correct: isCorrect, options }] });
      }
      await result.save();
      res.json({ message: "Results updated" });
    } else {
      const newResult = new Results({
        username,
        tests: [{ test_id: testId, score, status, timeTaken, QnA: [{ question, tag, difficulty, selected_answer: selected, correct_answer: correct, is_correct: isCorrect, options }] }],
      });
      await newResult.save();
      res.json({ message: "Results stored" });
    }



  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};


export const getResults = async (req: Request, res: Response) => {
  try{
    const { username } = req.body;
    const result = await Results.findOne ({ username });
    if(result){
      res.json({ results: (result as any).tests });
    }else{
      res.json({ message: "No results found" });
    }
  }catch(error: any){
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
}
