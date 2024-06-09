import React, { useEffect, useState } from 'react'
import './index.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Results: React.FC = () => {
    const navigate = useNavigate()

    const [results, setResults] = useState<object[]>([])

    const fetchRestuls = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/results/getResults', {
                username: localStorage.getItem('username')
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
                }
            })
            console.log(response.data.results)
            setResults(response.data.results)
            localStorage.setItem('results', JSON.stringify(response.data.results))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRestuls()
    }, [])




    const handleResultClick = (result: object) => {
        localStorage.setItem('result', JSON.stringify(result))
        navigate(`/result/${result.test_id}`)
    }

    return (
        <>
            <div className='h-screen w-screen  flex flex-col items-end font-montserrat'>
                <div className='w-[100%] lg:w-[40%] h-[10%]  flex justify-center items-center ' >
                    <Navbar index={1} />
                </div>
                <div className=" w-full lg:h-[90%] h-[90%] flex flex-col justify-start lg:items-start items-center overflow-y-scroll overflow-scroll">
                    <div className='w-[100%] h-[10%] flex justify-center lg:justify-start lg:text-5xl lg:pl-[2%] items-center text-center text-[#6547d4] font-bold text-2xl ' >
                        <p>Test History</p>
                    </div>
                    <div className='w-[100%] h-[90%] overflow-y-scroll flex flex-col justify-start items-center'>
                        {results && results.length > 0 ? (
                            <table className='w-[95%] my-[2%] shadow-custom rounded-xl'>
                                <thead>
                                    <tr className='bg-[#c266d3] text-white font-bold text-sm lg:text-3xl '>
                                        <th className='p-2'>Date & Time</th>
                                        <th className='p-2'>Duration</th>
                                        <th className='p-2'>Status</th>
                                        <th className='p-2'>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result, index) => {
                                        const { timeStamp, timeTaken, status, score } = result;
                                        const formattedDate = new Date(timeStamp);
                                        const hours = formattedDate.getHours() % 12 || 12;
                                        const minutes = formattedDate.getMinutes();
                                        const amPm = formattedDate.getHours() < 12 ? 'AM' : 'PM';
                                        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
                                        return (
                                            <tr key={index} className='border-b text-center text-xs lg:text-lg cursor-pointer my-[2%] table-row-hover ' onClick={() => handleResultClick(result)}  >
                                                <td className='p-2'>{formattedDate.toLocaleDateString()} {formattedTime}</td>
                                                <td className='p-2'>{timeTaken} seconds</td>
                                                <td className='p-2'>{status}</td>
                                                <td className='p-2'>{score}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <>
                                <div className='w-[100%] h-[100%]  flex flex-col lg:flex-row justify-center items-center ' >
                                    <img src="/images/no_records_found.png" className=' lg:h-[90%] lg:m-[0%]  ' alt="" />
                                    <div className='h-[20%] mt-[5%] w-[100%] lg:w-[50%] lg:h-[100%] p-[5%] flex flex-col items-center lg:justify-center lg:items-end justify-center lg:text-4xl text-lg font-thin text-[#c266d3] ' >
                                        <p>You haven't attempted any tests yet</p>
                                        <button className=' button-2 p-[5%] lg:text-lg lg:p-[2%] lg:w-[30%] lg:mt-[5%] rounded-full text-sm font-thin ' onClick={()=>navigate(`/quiz/${localStorage.getItem('username')}`)} >Start Test</button>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Results