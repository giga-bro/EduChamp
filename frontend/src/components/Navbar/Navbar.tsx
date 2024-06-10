// @ts-nocheck
import React ,{useState} from 'react'
import './index.css'
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import Person2Icon from '@mui/icons-material/Person2';
import './index.css'
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const Navbar:React.FC = ({index}) => {
    const [activeIndex, setActiveIndex] = useState<number|null>(index);
    const navigate = useNavigate();


    const handleItemClick = (index:number) => {
      setActiveIndex(index);
      switch (index) {
        case 0:
          navigate('/dashboard');
          break;
        case 1:
          navigate('/results');
          break;
        case 2:
          navigate('/about-us');
          break;
        case 3:
          navigate('/profile');
          break;
        default:
          break;
      }
    };
    return (
        <>
            <div
                className={`nav-item  ${activeIndex === 0 ? 'active' : ''}`}
                onClick={() => handleItemClick(0)}
            >
                <div className="icon-wrapper">
                    <HomeIcon className="icon" />
                </div>
                <p>Home</p> 
            </div>
            <div
                className={`nav-item ${activeIndex === 1 ? 'active' : ''}`}
                onClick={() => handleItemClick(1)}
            >
                <div className="icon-wrapper">
                    <ArticleIcon className="icon" />
                </div>
                <p>Results</p>
            </div>
            <div
                className={`nav-item ${activeIndex === 2 ? 'active' : ''}`}
                onClick={() => handleItemClick(2)}
            >
                <div className="icon-wrapper">
                    <InfoIcon className="icon" />
                </div>
                <p>About US</p>
            </div>
            <div
                className={`nav-item ${activeIndex === 3 ? 'active' : ''}`}
                onClick={() => handleItemClick(3)}
            >
                <div className="icon-wrapper">
                    <Person2Icon className="icon" />
                </div>
                <p>Profile</p>
            </div>
        </>
    )
}

export default Navbar
