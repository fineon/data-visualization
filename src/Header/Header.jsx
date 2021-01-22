import React from 'react';
import './../Header/Header.scss';

export default function Header() {
    return (
        <header className="header">
            <nav className="header__nav">
                <p className="header__nav__text">Resources</p>
                <p className="header__nav__text">About</p>
                <p className="header__nav__text">Contact</p>
            </nav>

            <h1 className="header__title">COVID-19 Data Dashboard At A Glance</h1>
            <img src="" alt="" />

            <button>
                Review
            </button>
        </header>
    )
}
