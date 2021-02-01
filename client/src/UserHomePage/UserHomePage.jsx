import React, { Component, useContext,useState,useEffect } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Header from './../Header/Header';

import './UserHomePage.scss';
import Footer from '../Footer/Footer';


export default function UserHomePage(){
        document.title = "User Data Dashboard"

        return (
            <section>
                <Header username='there!'/>

                <h2>data dashboard</h2>

                <form action="">
                  <input type="text" placeholder='data here'/>
                  
                </form>
                <form action="">
                    <input type="text" placeholder='poll here'/>
                </form>
            <Footer/>
            </section>
        )
}
