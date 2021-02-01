import React, { Component, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Header from './../Header/Header';

import './UserHomePage.scss';
import Footer from '../Footer/Footer';


export default function UserHomePage() {
    document.title = "User Data Dashboard"
    const testChart = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Historic World Population by Region'
        },
        subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        series: [{
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'Year 2000',
            data: [814, 841, 3714, 727, 31]
        }, {
            name: 'Year 2016',
            data: [1216, 1001, 4436, 738, 40]
        }]
    }

    const pollSubmit = (e) => {
        let pollObj ={
            option: e.target.option.value,
        }

        e.preventDefault();
        axios.post('http://localhost:8080/comment',pollObj).then(res => {
            console.log(res)
        })
    }

    return (
        <section>
            <Header username='there' />

            <h2>data dashboard</h2>

            <HighchartsReact
                highcharts={Highcharts}
                options={testChart} />

            <form action="">
                <label htmlFor="">enter data here</label>
                <input 
                type="text" 
                name='test'
                placeholder='data here' />

                <button>Submit</button>

            </form>
            
            <form 
            action="" 
            onSubmit={pollSubmit}>
                
                <input 
                type="checkbox" 
                name='option1'
                placeholder='poll here' />
                <label for='option1'>What's your favorite activity during quarantine? </label>

                <button>Submit</button>
            </form>

            <Footer />
        </section>
    )
}
