// @ts-nocheck

import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ScoreIcon from '@mui/icons-material/Score';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import './index.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import Typewriter from 'typewriter-effect';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';

const Result: React.FC = () => {
    const result = JSON.parse(localStorage.getItem('result') || '{}')
    const { timeStamp, timeTaken, status, score } = result;
    const formattedDate = new Date(timeStamp);
    const hours = formattedDate.getHours() % 12 || 12;
    const minutes = formattedDate.getMinutes();
    const amPm = formattedDate.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
    const [loading , setLoading] = useState<boolean>(false)

    const [query, setQuery] = useState<string>('')
    const [chats, setChats] = useState<any[]>([{ isSender: false, message: 'Hello there! How can I help you ?' }])

    const handleQuery = async (e: any, query: string) => {
        e.preventDefault()
        setMobileChat(true)
        setLoading(true)
        setChats(prevChats => [...prevChats, { isSender: true, message: query }]);
        setQuery('')
        try {
            const res = await axios.post('https://edu-champ-backend.vercel.app/api/query/query', { message: query }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            if (res.status === 200) {
                setChats(prevChats => [...prevChats, { isSender: false, message: res.data.message }]);
            } else if (res.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Server Error',
                })
            } else if (res.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Unauthorized',
                })
            }
            console.log(res)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]);

    const [mobileChat, setMobileChat] = useState<boolean>(false)



    return (
        <>
            <div className='w-screen h-screen   flex flex-col justify-start items-center ' >
                <div className='w-[100%] h-[10%]   flex justify-center items-center text-center text-[#6547d4] text-2xl lg:text-5xl font-semibold ' >
                    <p>Test Result</p>
                </div>
                <div className='w-[100%] lg:h-[10%] h-[15%]   overflow-y-scroll flex  justify-between lg:justify-center items-center  text-xs lg:text-2xl text-[#c266d3] p-[2%] lg:p-[0] ' >
                    <div className='w-[50%] h-[100%] flex flex-col justify-between   items-start lg:flex-row lg:justify-center lg:items-center  ' >
                        <p className='w-[100%] h-[50%] lg:h-[100%] lg:w-[50%] flex lg:justify-center lg:items-center lg:text-center justify-start text-start items-start '> <span className='font-bold' ><ScheduleIcon className='!w-[10%] lg:!w-[10%] lg:!h-[20%] !h-[40%] mb-[3%] ' /> Date&Time : </span> {formattedDate.toLocaleDateString()} {formattedTime} </p>
                        <p className='w-[100%]  h-[50%]  lg:h-[100%] lg:w-[50%]  flex lg:justify-center lg:items-center lg:text-center justify-start text-start items-start'> <span className='font-bold ' ><TimelapseIcon className='!w-[10%] !h-[40%] lg:!w-[10%] lg:!h-[20%] mb-[3%]' /> TimeTaken : </span> {timeTaken}secs </p>
                    </div>
                    <div className='w-[45%] h-[100%] flex flex-col justify-between items-start lg:flex-row lg:justify-center lg:items-center  ' >
                        <p className='w-[100%] h-[50%] lg:h-[100%] lg:w-[50%]  flex justify-start text-start items-start lg:justify-center    lg:items-center lg:text-center' > <span className='font-bold  ' ><ScoreIcon className='!w-[10%] !h-[40%] lg:!w-[10%] lg:!h-[20%] mb-[3%] ' /> Score : </span> {score}</p>
                        <p className='w-[100%] h-[50%] lg:h-[100%] lg:w-[50%] flex justify-start text-start items-start lg:justify-center    lg:items-center lg:text-center'>  <span className='font-bold  ' ><DonutLargeIcon className='!w-[10%] !h-[40%] lg:!w-[10%] lg:!h-[20%] mb-[3%]' /> Status : </span> {status} </p>
                    </div>
                </div>
                <div className='w-[100%] h-[80%] lg:h-[80%] overflow-auto  flex flex-wrap justify-start items-center  '>
                    {result.QnA.map((qna: any, index: number) => {
                        return (
                            <>
                                <div key={index} className='w-[100%] h-[80%]  relative my-[5%] lg:my-[1%] text-[#c266d3] ' >
                                    <div className='h-[30%] text-lg w-[100%] text-start flex  flex-col justify-center item-start pl-[2%]   ' >
                                        <p className='w-[100%] h-[fit-content] lg:text-3xl ' > Q.{index + 1}.) {qna.question}</p>
                                        <div className='w-[100%] lg:w-[50%] h-[20%] flex justify-between items-center ' >
                                            <p className='text-sm ml-[1%] lg:mt-[1%] h-[100%] text-center border border-[#c266d3] lg:px-[1%] lg:text-lg lg:ml-[3%] w-[30%] lg:w-[10%] lg:h-[100%] rounded-full px-[5%] ' >{qna.tag}</p>
                                            <p className='italic underline cursor-pointer text-sm lg:text-lg text-[#FF5F00] ' onClick={(e) => handleQuery(e, qna.question)} >Explain using AI</p>
                                        </div>
                                    </div>
                                    <div className='w-[100%] h-[60%] pl-[2%] ' >
                                        {qna.options.map((option: any, index: number) => {
                                            return (
                                                <div key={index} className='w-[90%]  lg:w-[50%] h-[25%] lg:h-[20%] mt-[1%] my-[2%] lg:mt-[1%] lg:mb-[0%] flex justify-center items-center rounded-full border border-[#c266d3] cursor-pointer option '>
                                                    <div className='w-[20%] h-[100%] flex justify-center items-center  '>
                                                        <div className={`w-[40px] h-[40px] rounded-full border border-[#c266d3] ${qna.selected_answer === index && qna.correct_answer === index ? 'bg-blue-400' : qna.correct_answer === index ? 'bg-[green]' : qna.selected_answer === index ? 'bg-[red]' : ''} `}   ></div>
                                                    </div>
                                                    <div className='w-[80%] h-[100%] flex justify-start pl-[2%] items-center pr-[3%] '>
                                                        <p>{option}</p> <p className='ml-auto text-xs italic lg:text-lg ' > {qna.selected_answer === index && qna.correct_answer === index ? 'correctly answered' : qna.correct_answer === index ? 'correct answer' : qna.selected_answer === index ? 'selected answer' : ''}    </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='w-[40%] h-[80%]  z-10 fixed bottom-0 right-0 hidden lg:flex lg:justify-center lg:items-center   ' >
                    <div className='lg:w-[80%] rounded-2xl lg:h-[80%] border  bg-[#FF5F00] ml-auto flex justify-center items-center ' >
                        <div className='w-[95%] h-[95%]  rounded-2xl bg-white' >
                            <div className='w-[100%] h-[10%] flex justify-center items-center border-b border-black text-[#FF5F00] text-center text-2xl font-bold ' >
                                <p >Ask your doubts here!</p>
                            </div>
                            <div className='w-[100%] h-[80%] justify-center items-center overflow-y-scroll ' ref={chatContainerRef}  >
                                {chats.map((chat: object, index: number) => (
                                    <>
                                        {chat?.isSender ? <>
                                            <div key={index} className='w-[100%] h-[fit-content] my-[2%] ' >
                                                <div className='w-[fit-content] h-[fit-content] bubble right ml-auto  !bg-[#FF5F00] !text-white  text-sm ' >
                                                    <p>{chat?.message}</p>
                                                </div>
                                            </div>
                                        </> : <>
                                            <div key={index} className='w-[100%] h-[fit-content] my-[2%]  ' >
                                                <div className='w-[fit-content] h-[fit-content] bubble left text-sm flex justify-start items-center text-start !bg-[#FF5F00] !text-white ' >
                                                    <p>
                                                        <Typewriter
                                                            options={{
                                                                strings: [chat?.message],
                                                                autoStart: true,
                                                                loop: false,
                                                                delay: 5,
                                                                deleteSpeed: Infinity
                                                            }}
                                                        />
                                                    </p>
                                                </div>
                                            </div>

                                        </>}
                                    </>
                                ))}
                            </div>
                            <div className='w-[100%] h-[10%] justify-center items-center border-t border-black ' >
                                <form action="" onSubmit={(e) => handleQuery(e, query)} className='w-[100%] h-[100%] text-center text-lg' >
                                    <input type="text" className='w-[100%] h-[100%] text-center outline-none  ' onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} value={query} placeholder={` ${loading ? 'Bot is Typing...' : "Enter your query and hit 'Enter'" }  `} />
                                    <input type="submit" className='hidden' />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='h-[10%] w-[5%]  bg-[#FF5F00] ' >

                    </div>
                </div>
                <div className='w-[60px] h-[60px] rounded-full  z-10 fixed bottom-0 right-0 flex lg:hidden bg-[#c266d3] justify-center items-center' onClick={() => setMobileChat(!mobileChat)} >
                    <CommentIcon className='w-[100%] h-[100%] text-white ' />
                </div>
                <div className={`w-[95vw] h-[85vh] lg:hidden fixed z-10 top-5 rounded-2xl shadow-custom bg-white ${mobileChat ? 'flex flex-col lg:hidden ' : 'hidden'} `} >
                    <div className='w-[100%] h-[10%] flex justify-center items-center border-b border-black text-[#c266d3] text-center text-lg font-bold ' >
                        <p >Ask your doubts here!</p>
                    </div>
                    <div className='w-[100%] h-[80%] justify-center items-center overflow-y-scroll ' ref={chatContainerRef}  >
                        {chats.map((chat: object, index: number) => (
                            <>
                                {chat?.isSender ? <>
                                    <div key={index} className='w-[100%] h-[fit-content] my-[5%] ' >
                                        <div className='w-[fit-content] h-[fit-content] bubble right ml-auto  !bg-[#c266d3] !text-white  text-xs ' >
                                            <p>{chat?.message}</p>
                                        </div>
                                    </div>
                                </> : <>
                                    <div key={index} className='w-[100%] h-[fit-content] my-[5%]  ' >
                                        <div className='w-[fit-content] h-[fit-content] bubble left text-sm flex justify-start items-center text-start !bg-[#c266d3] !text-white ' >
                                            <p>
                                                <Typewriter
                                                    options={{
                                                        strings: [chat?.message],
                                                        autoStart: true,
                                                        loop: false,
                                                        delay: 5,
                                                        deleteSpeed: Infinity
                                                    }}
                                                />
                                            </p>
                                        </div>
                                    </div>

                                </>}
                            </>
                        ))}
                    </div>
                    <div className='w-[100%] h-[10%] justify-center items-center border-t border-black flex' >
                        <form action="" onSubmit={(e) => handleQuery(e, query)} className='w-[100%] h-[100%] !flex justify-center item-center text-center text-sm !flex-row !p-[0] ' >
                            <div className='w-[80%]  h-[100%] rounded-bl-2xl ' >
                                <input type="text" className='w-[100%]  rounded-bl-2xl h-[100%] text-center outline-none  ' onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} value={query} placeholder="Enter your query and hit 'Enter' " />
                            </div>
                            <div className='w-[20%] h-[100%] rounded-br-2xl border-l border-black ' >
                                <button
                                    type="submit"
                                    className='w-[100%] h-full  rounded-br-2xl flex items-center justify-center bg-white'
                                >
                                    <SendIcon />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Result
