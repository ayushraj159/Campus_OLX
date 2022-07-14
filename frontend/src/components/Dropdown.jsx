import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import { CategoryData } from '../CategoryData';

export default function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {CategoryData.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className="dropdown-link"
                to={item.path}
                onClick={() => setClick(false)}
                state={{ cat: item.title }}
              >
                <span className='category-icon'>{item.icon}</span>{item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
