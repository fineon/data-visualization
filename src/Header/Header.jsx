import React from 'react';
import './../Header/Header.scss';
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <header className="header">
            <nav className="header__nav">
                <Link to='/'>
                    <p className="header__nav__text">Home</p>
                </Link>
                <p className="header__nav__text">Resources</p>
                <Link to='/dashboard'>
                    <p className="header__nav__text">Your Data Dashboard</p>
                </Link>
                <Link to='/signin'>
                    <p className="header__nav__text">Log In / Sign Up</p>
                </Link>
            </nav>

            {props.username ? null : <h1 className="header__title">COVID-19 Data Dashboard At A Glance</h1>}
            {props.username ? <h1 className="header__title">Hi {props.username}, Welcome to Your Data Dashboard</h1> : null}
            <img src="" alt="" />

            <button>
                Review
            </button>
        </header>
    )
}
