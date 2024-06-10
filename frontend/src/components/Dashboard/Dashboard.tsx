// @ts-nocheck
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './index.css'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const handleQuizStart = () => {
    navigate(`/quiz/${localStorage.getItem('username')}`)
  }



  return (
    <>
      <div className='h-screen w-screen  flex flex-col items-end font-montserrat '>
        <div className='w-[100%] lg:w-[40%] h-[10%]  flex justify-center items-center ' >
          <Navbar index={0} />
        </div>
        <div className="border w-full lg:h-[80%] h-[90%] flex flex-col justify-start lg:items-start items-center overflow-y-scroll overflow-scroll">
          <div className="border w-full h-[30%] min-h-[30%] flex flex-col lg:items-start lg:pl-[5%] lg:text-7xl justify-center items-center text-center text-2xl text-[#c266d3] font-bold">
            <p className='text-[#6547d4]' >Welcome to EduChamp</p>
            <p className="text-sm lg:text-2xl mt-[1%] font-thin">Empowering Students with Personalized Learning through Adaptive Quizzes</p>
          </div>
          <div className="w-full h-[70%] min-h-[30%] lg:h-[70%] ml-[2%] lg:ml-0  flex flex-col lg:flex lg:flex-row justify-start lg:items-start lg:pl-[5%] items-center  ">
            <img src="/images/dashboard.png" alt="Dashboard" className="w-[90%] h-[70%] lg:h-[100%] lg:w-[40%]" />
            <div className='w-[100%] lg:w-[50%] lg:h-[100%] lg:justify-start lg:pr-[5%] lg:pt-[5%] h-[50%] lg:items-end lg:text-end lg:text-3xl  ml-auto flex flex-col justify-center items-center text-center font-thin text-lg ' >
              <p className='text-[#c266d3]' >With a set of 20 carefully selected mathematics MCQs, we aim to enhance learning and adapt to each student's unique needs</p>
              <button className='w-[40%] lg:w-[30%] lg:h-[15%] h-[20%] mt-[5%] rounded-full border-none button-2 ' onClick={handleQuizStart} >Start Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[100vw] h-[50vh] bg-black ' >
        <Footer/>
      </div>
    </>
  )
}

export default Dashboard
