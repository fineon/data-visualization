import React from 'react';
import './../Header/Header.scss';
import { Link } from 'react-router-dom';

import worldMap from './../assets/world.svg';

export default function Header(props) {
    return (
        <header className="header">
            <nav className="header__nav">
                <Link to='/' className='header__nav__link'>
                    <p className="header__nav__text">Home</p>
                </Link>
                
                <Link to='/dashboard' className='header__nav__link'>
                    <p className="header__nav__text">Your Data Dashboard</p>
                </Link>

                {/* {props.loggedIn ? null : <Link to='/signin' className='header__nav__link'>
                    <p className="header__nav__text">Log In / Sign Up</p>
                </Link>} */}

            </nav>

            <div className='header__container'>
            
            <div className='header__container--left'> 
             
            {props.username || props.loggedIn ? null : <h1 className="header__title">COVID-19 Data Dashboard At A Glance</h1>}

            {props.username ? <h1 className="header__title">Hi {props.username}, Welcome to Your Data Dashboard</h1> : null}

            {props.loggedIn ? <h1 className="header__title">Welcome {props.loggedIn}, please log in or sign up to view your local data dashboard</h1> : null}

            {props.username || props.loggedIn ? null :<p className='header__desc'>You can view the most current statistics on COVID-19 cases around the world in one page. Get a quick understanding of current situation with <span className='header__desc__phrase'>data visualization</span>, enhanced information from <span className='header__desc__phrase'>API</span> and more</p>}

            {props.username || props.loggedIn ? null : <a href="#dashboard">
            <button className='header__button'> 
                Review Now
            </button>
            </a>}
            
            </div>

            <img 
            className='header__img'
            src={worldMap} 
            alt="world map" />
            </div>

           

        </header>
    )
}
