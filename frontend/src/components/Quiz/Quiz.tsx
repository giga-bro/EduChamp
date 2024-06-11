// @ts-nocheck

import React, { useRef, useEffect, useState } from 'react';
import './index.css';
import MicIcon from '@mui/icons-material/Mic';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import Swal from 'sweetalert2';
import {nanoid} from 'nanoid';

const questions = [
  { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 2, question: 'Solve for x: 3x + 5 = 11', options: ['1', '2', '3', '4'], correct: 1, difficulty: 2, tag: 'algebra' },
  { id: 3, question: 'What is the area of a triangle with base 4 and height 5?', options: ['10', '20', '15', '25'], correct: 0, difficulty: 2, tag: 'geometry' },
  { id: 4, question: 'What is the value of x in the equation x/2 = 4?', options: ['2', '4', '6', '8'], correct: 3, difficulty: 1, tag: 'algebra' },
  { id: 5, question: 'Find the value of y: y - 3 = 7', options: ['10', '11', '9', '8'], correct: 0, difficulty: 1, tag: 'algebra' },
  { id: 6, question: 'Simplify: 3(2x + 4) =', options: ['6x + 12', '6x + 8', '6x + 4', '6x + 6'], correct: 0, difficulty: 2, tag: 'algebra' },
  { id: 7, question: 'If the perimeter of a square is 20, what is the length of one side?', options: ['4', '5', '6', '7'], correct: 1, difficulty: 1, tag: 'geometry' },
  { id: 8, question: 'Solve for x: 2x - 4 = 10', options: ['5', '6', '7', '8'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 9, question: 'What is the circumference of a circle with radius 7?', options: ['14π', '21π', '28π', '35π'], correct: 0, difficulty: 2, tag: 'geometry' },
  { id: 10, question: 'If x + 2 = 10, what is x?', options: ['6', '7', '8', '9'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 11, question: 'What is the volume of a cube with side length 3?', options: ['9', '18', '27', '36'], correct: 2, difficulty: 2, tag: 'geometry' },
  { id: 12, question: 'What is the value of x in the equation 4x = 20?', options: ['4', '5', '6', '7'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 13, question: 'Find the area of a rectangle with length 8 and width 3.', options: ['11', '24', '27', '32'], correct: 1, difficulty: 2, tag: 'geometry' },
  { id: 14, question: 'Simplify: 5x - 3x =', options: ['2x', '3x', 'x', '5x'], correct: 0, difficulty: 1, tag: 'algebra' },
  { id: 15, question: 'Solve for y: 7y - 14 = 0', options: ['0', '1', '2', '3'], correct: 2, difficulty: 2, tag: 'algebra' },
  { id: 16, question: 'What is the area of a circle with diameter 10?', options: ['25π', '50π', '75π', '100π'], correct: 0, difficulty: 3, tag: 'geometry' },
  { id: 17, question: 'If 3x = 9, then x = ?', options: ['2', '3', '4', '5'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 18, question: 'What is the slope of the line y = 2x + 3?', options: ['1', '2', '3', '4'], correct: 1, difficulty: 2, tag: 'algebra' },
  { id: 19, question: 'Find the hypotenuse of a right triangle with legs of length 3 and 4.', options: ['5', '6', '7', '8'], correct: 0, difficulty: 2, tag: 'geometry' },
  { id: 20, question: 'Solve for x: x^2 = 16', options: ['2', '3', '4', '5'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 21, question: 'What is 5 + 7?', options: ['10', '11', '12', '13'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 22, question: 'Solve for y: 2y + 6 = 14', options: ['2', '3', '4', '5'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 23, question: 'What is the perimeter of a rectangle with length 6 and width 3?', options: ['18', '12', '15', '20'], correct: 1, difficulty: 1, tag: 'geometry' },
  { id: 24, question: 'What is the value of x in the equation x + 7 = 12?', options: ['3', '4', '5', '6'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 25, question: 'Find the value of z: z - 5 = 10', options: ['10', '12', '15', '20'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 26, question: 'Simplify: 4(2x - 3) =', options: ['8x - 12', '8x - 9', '8x - 6', '8x - 3'], correct: 0, difficulty: 2, tag: 'algebra' },
  { id: 27, question: 'If the area of a square is 36, what is the length of one side?', options: ['4', '5', '6', '7'], correct: 2, difficulty: 1, tag: 'geometry' },
  { id: 28, question: 'Solve for x: 5x - 5 = 20', options: ['3', '4', '5', '6'], correct: 3, difficulty: 1, tag: 'algebra' },
  { id: 29, question: 'What is the circumference of a circle with diameter 14?', options: ['14π', '21π', '28π', '35π'], correct: 2, difficulty: 2, tag: 'geometry' },
  { id: 30, question: 'If y + 5 = 15, what is y?', options: ['8', '9', '10', '11'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 31, question: 'What is the volume of a cylinder with radius 3 and height 5?', options: ['15π', '30π', '45π', '60π'], correct: 2, difficulty: 2, tag: 'geometry' },
  { id: 32, question: 'What is the value of x in the equation 3x = 18?', options: ['5', '6', '7', '8'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 33, question: 'Find the area of a trapezoid with bases 5 and 7, and height 4.', options: ['24', '26', '28', '30'], correct: 2, difficulty: 3, tag: 'geometry' },
  { id: 34, question: 'Simplify: 6x - 2x =', options: ['3x', '4x', '5x', '6x'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 35, question: 'Solve for y: 8y - 16 = 0', options: ['0', '1', '2', '3'], correct: 2, difficulty: 2, tag: 'algebra' },
  { id: 36, question: 'What is the area of a circle with radius 6?', options: ['36π', '12π', '24π', '48π'], correct: 0, difficulty: 3, tag: 'geometry' },
  { id: 37, question: 'If 4x = 12, then x = ?', options: ['2', '3', '4', '5'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 38, question: 'What is the slope of the line y = -3x + 2?', options: ['-1', '-2', '-3', '-4'], correct: 2, difficulty: 2, tag: 'algebra' },
  { id: 39, question: 'What is the volume of a rectangular prism with length 4, width 3, and height 2?', options: ['18', '20', '24', '28'], correct: 2, difficulty: 2, tag: 'geometry' },
  { id: 40, question: 'Solve for x: 4x - 3 = 9', options: ['2', '3', '4', '5'], correct: 2, difficulty: 1, tag: 'algebra' },
  { id: 41, question: 'What is the perimeter of a triangle with sides 5, 12, and 13?', options: ['25', '30', '35', '40'], correct: 1, difficulty: 2, tag: 'geometry' },
  { id: 42, question: 'If 2x + 3 = 11, what is x?', options: ['3', '4', '5', '6'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 43, question: 'Find the area of a parallelogram with base 8 and height 5.', options: ['30', '35', '40', '45'], correct: 2, difficulty: 2, tag: 'geometry' },
  { id: 44, question: 'Simplify: 7(3x - 2) =', options: ['21x - 14', '21x - 7', '21x + 6', '21x + 14'], correct: 0, difficulty: 2, tag: 'algebra' },
  { id: 45, question: 'What is the length of the hypotenuse of a right triangle with legs 6 and 8?', options: ['8', '10', '12', '14'], correct: 1, difficulty: 2, tag: 'geometry' },
  { id: 46, question: 'Solve for y: 5y + 10 = 35', options: ['4', '5', '6', '7'], correct: 1, difficulty: 1, tag: 'algebra' },
  { id: 47, question: 'What is the surface area of a cube with side length 4?', options: ['64', '48', '96', '128'], correct: 2, difficulty: 2, tag: 'geometry' },
  { id: 48, question: 'Simplify: (2x + 3)(x - 1) =', options: ['2x^2 + x - 3', '2x^2 - x - 3', '2x^2 + x + 3', '2x^2 - x + 3'], correct: 0, difficulty: 3, tag: 'algebra' },
];


const Quiz = () => {
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const canvasRef = useRef(null);
  const [displayPopup, setDisplayPopup] = useState(true);

  useEffect(() => {
    const constraints = {
      video: true,
      audio: true,
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam and microphone.', error);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const startQuiz = () => {
    const screenConstraints = {
      video: {
        cursor: "always"
      },
      audio: false
    };


    navigator.mediaDevices.getDisplayMedia(screenConstraints)
      .then((stream) => {
        if (screenRef.current) {
          screenRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing screen.', error);
      });

    setDisplayPopup(false);
    const testId = nanoid();
    setTestId(testId);

  };


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [attemptedQuestionsCount, setAttemptedQuestionsCount] = useState<number>(1);
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set([questions[0].id]));
  const [testId, setTestId] = useState<string>('');

  const handleAnswer = async (index: number) => {
    if(selectedIndex === -1){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an option!',
      });
      return;
    }   
    const isCorrect = index === questions[currentQuestionIndex].correct;
    setScore(score + (isCorrect ? 1 : 0));

    const newDifficulty = difficulty + (isCorrect ? 1 : -1);
    setDifficulty(Math.max(1, Math.min(newDifficulty, 3)));

    // Find a new question with the new difficulty that hasn't been asked yet
    let nextQuestionIndex = -1;
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].difficulty === newDifficulty &&
        !askedQuestions.has(questions[i].id)
      ) {
        nextQuestionIndex = i;
        break;
      }
    }

    // If no such question is found, try to find a question with the same difficulty
    if (nextQuestionIndex === -1) {
      for (let i = 0; i < questions.length; i++) {
        if (!askedQuestions.has(questions[i].id)) {
          nextQuestionIndex = i;
          break;
        }
      }
    }

    try {
      console.log(score,testId);
      const res = await axios.post('https://edu-champ-backend.vercel.app/api/results/storeResults',{ 
        username: localStorage.getItem('username'),
        testId:testId,
        score: score,
        difficulty: difficulty,
        tag: questions[currentQuestionIndex].tag,
        question: questions[currentQuestionIndex].question,
        correct: questions[currentQuestionIndex].correct,
        selected: index,
        isCorrect: isCorrect,
        options: questions[currentQuestionIndex].options,
        status : attemptedQuestionsCount === 20 ? 'completed' : 'incomplete',
        timeTaken : 15*60 - (minutes*60 + seconds),
       } ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
       } );
       console.log(res)
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      console.log(e);
    }

    if(attemptedQuestionsCount === 20){
      Swal.fire({
        icon: 'success',
        title: 'Test Submitted Successfully',
        text: `Your score is ${score}`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/dashboard';
        }
      });;
      return;
    }

    setAskedQuestions((prev) => new Set(prev).add(questions[nextQuestionIndex].id));
    setCurrentQuestionIndex(nextQuestionIndex !== -1 ? nextQuestionIndex : currentQuestionIndex);
    setSelectedIndex(-1);


    setAttemptedQuestionsCount(attemptedQuestionsCount + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const { initMinute = 0, initSeconds = 10 } = { initMinute: 15, initSeconds: 0 }
  const [minutes, setMinutes] = useState(initMinute)
  const [seconds, setSeconds] = useState(initSeconds)

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })


  const [isBlocking, setIsBlocking] = useState(true);

  const handleInputChange = (e) => {
    setIsBlocking(e.target.value.length > 0);
  };


  return (
    <>
      {displayPopup &&
        <div className='w-[90%] lg:w-[60%] absolute top-10 left-[5%] lg:top-10 shadow-custom font-montserrat rounded-2xl bg-white text-[#c266d3] lg:left-[20%] z-10 h-[90%]  flex flex-col lg:flex-row  justify-end items-center inital-popup' >
          <div className='w-[100%] h-[80%] lg:mt-auto flex flex-col justify-end items-center lg:w-[50%]  ' >
            <div className='w-[100%] h-[30%]  flex justify-center items-center ' >
              <div className='w-[150px] lg:w-[200px] lg:h-[200px] h-[150px] rounded-full overflow-hidden ' >
                <video ref={videoRef} autoPlay playsInline muted className='w-[100%] h-[100%] rounded-full '></video>
              </div>
            </div>
            <div className='w-[100%] h-[10%]  flex justify-center items-center pl-[5%] lg:pl-[2%] font-thin lg:text-2xl '>
              <MicIcon className='w-[50%] h-[100%] lg:!w-[10%] lg:!h-[40%] ' /> <p>Mic Quality : Good</p> <CheckIcon className='w-[50%] h-[100%] text-green-400 ' />
            </div>
            <div className='w-[100%] h-[60%] flex flex-col justify-start items-start text-start p-[5%] ' >
              <h4 className='lg:text-2xl font-bold ' >Rules : </h4>
              <ul className='list-disc ml-[5%] text-sm mt-[5%] lg:text-lg ' >
                <li>We will monitor your every activity.</li>
                <li>Make sure you don't have your cell phone with you.</li>
                <li>Any malpractice will result in the termination of the quiz.</li>
                <li>You can't go back to the previous question.</li>
              </ul>
            </div>
            <div className='w-[100%] h-[30%] lg:absolute lg:w-[50%] lg:h-[15%] lg:left-[25%] flex justify-center items-center ' >
              <button onClick={startQuiz} className='w-[40%] h-[50%]  rounded-full button-2' >
                Start Quiz
              </button>
            </div>

          </div>
          <div className='w-[50%] h-[100%] hidden lg:flex lg:flex-col  justify-center items-center ' >
            <img src="/images/eduChampPopUp.png" className='w-[80%] h-[60%]  ' alt="" />
          </div>
          <div className='absolute justify-center items-center w-[100%] h-[20%] top-0 flex text-center text-2xl lg:text-4xl font-bold ' >
            Welcome to EduChamp Quiz
          </div>
        </div>
      }
      <div className={`w-screen h-screen font-montserrat`} >

        <div className='w-[100%]  text-[#c266d3] h-[20%]  flex flex-col justify-center items-center text-center ' >
          <p className='text-2xl lg:text-5xl font-bold' >EduChamp Quiz</p>
          <p className='text-lg lg:text-2xl font-thin'>Give your best...!</p>
          <p className='text-lg lg:text-2xl font-semibold flex mt-[2%] '>Time Left : <div className='wrapper'>
            {minutes === 0 && seconds === 0 ? (
              <></>
            ) : (
              <React.Fragment>
                <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
              </React.Fragment>
            )}
          </div></p>
        </div>
        <div className='w-[100%]  text-[#c266d3]  h-[80%] flex flex-col justify-center items-center ' >
          <div className='w-[100%] h-[20%] flex flex-col justify-center pl-[5%] font-semibold items-start text-center text-xl lg:text-3xl'>
            <p> Q.{attemptedQuestionsCount} {currentQuestion.question}</p>
            <p className='text-sm ml-[15%] border border-[#c266d3] lg:px-[1%] lg:text-lg lg:ml-[3%] rounded-full px-[5%] ' >{currentQuestion.tag}</p>
          </div>
          <div className='w-[100%] h-[80%]   flex flex-col justify-start pl-[5%] font-semibold items-start text-center ' >
            <p className='lg:text-2xl' >Options : </p>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className='w-[90%] lg:w-[50%] h-[15%] mt-[1%] my-[2%] lg:mt-[1%] lg:mb-[0%] flex justify-center items-center rounded-full border border-[#c266d3] cursor-pointer option ' onClick={() => setSelectedIndex(index)}>
                <div className='w-[20%] h-[100%] flex justify-center items-center  '>
                  <div className={`w-[50px] h-[50px] rounded-full border border-[#c266d3] ${selectedIndex === index ? 'bg-blue-400' : ''} `}   ></div>
                </div>
                <div className='w-[80%] h-[100%] flex justify-start pl-[2%] items-center'>
                  <p>{option}</p>
                </div>
              </div>
            ))}
            <div className='w-[90%] lg:w-[50%] h-[15%] mt-[1%]   flex justify-center lg:justify-start  items-center rounded-lg ' >
              <button onClick={() =>  handleAnswer(selectedIndex) } className='w-[80%] h-[70%] lg:w-[30%]  text-center   rounded-full button-2' >
                {attemptedQuestionsCount === 20 ? 'Submit Test' : 'Next Question'}
              </button>
            </div>

            <div className='absolute bottom-0 right-0 w-[50%] h-[70%] hidden lg:flex  lg:justify-center lg:items-end ' >
              <img src={`/images/quiz-img${attemptedQuestionsCount}.png`} className='object-cover ' alt="" />
            </div>
          </div>
        </div>
      </div>


      


    </>
  );
}

export default Quiz;
