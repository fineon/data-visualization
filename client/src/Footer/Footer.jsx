import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss';

import covidlogo from './../assets/covid19api.png'
import duckgologo from './../assets/duckduckgologo.svg'

export default function Footer() {
    return (
        <footer className='footer'>
             <div className='footer__container1'>
                <h3 className='footer__container1__title'>Data Obtained From</h3>
                <div className='footer__logo-container'>
                <img className='footer__logo' src="https://www.duckduckgo.com/i/deaaa892.png" alt=""/>
                <img className='footer__logo' src={covidlogo} alt=""/>
                <img className='footer__logo' src={duckgologo} alt=""/>
                </div>
            </div>
            <div className='footer__container2'>
            <h3 className='footer__title'>Site Links</h3>
            <Link to='/' className='footer__link'>Home</Link>
            </div>
        </footer>
    )
}
