import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss';

export default function Footer() {
    return (
        <footer className='footer'>
            <h3 className='footer__title'>Site Links</h3>
            <Link to='/' className='footer__link'>Home</Link>
            <div>
                <h4>data extracted from</h4>
                <img src="" alt=""/>
            </div>
        </footer>
    )
}
