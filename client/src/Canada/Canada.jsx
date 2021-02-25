import React from 'react'
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './Canada.scss';

export default function Canada(props) {
    //for canada only
    let latestCanada = [];

    //getting provinces
    let yukon
    let sask
    let BC
    let ON
    let alberta
    let newBrun
    let NS
    let manitoba
    let newFound
    let northwest
    let princeE
    let nuvavut
    let QB

    if (props.allProvinces) {
        //for online api
        latestCanada.push(props.allProvinces.pop())

        //for offline api
        // latestCanada.push(props.allProvinces)

        console.log(latestCanada)

        console.log(latestCanada[0]
            .map(item => {
                return item.Active
            })
        );

        BC = latestCanada[0].filter(item => item.Province === 'British Columbia');
        console.log(BC);

        ON = latestCanada[0].filter(item => item.Province === 'Ontario');

        alberta = latestCanada[0].filter(item => item.Province === 'Alberta');

        sask = latestCanada[0].filter(item => item.Province === 'Saskatchewan');

        QB = latestCanada[0].filter(item => item.Province === 'Quebec');

    }

    console.log(QB);

    const allProvinces = {
        title: {
            text: 'Major Canadian Provinces - Active Cases History'
        },

        yAxis: {
            title: {
                text: 'Cases'
            }
        },

        xAxis: {
            categories: props.allProvinces && BC.map(date => new Date(date.Date).toLocaleDateString())
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [
            {
                name: 'British Columbia',
                data: props.allProvinces && BC.map(item => item.Active)
            }, {
                name: 'Alberta',
                data: props.allProvinces && alberta.map(item => item.Active)
            }, {
                name: 'Saskachewan',
                data: props.allProvinces && sask.map(item => item.Active)
            }, {
                name: 'Ontario',
                data: props.allProvinces && ON.map(item => item.Active)
            }, {
                name: 'Quebec',
                data: props.allProvinces && QB.map(item => item.Active)
            },
        ],

    }

    return (
        <div className='canada'>
            <h2 className='canada__heading'>
                Canada Statistics and Resources
            </h2>

            <h3 className='canada__title'>
                Major Canada Provinces with Daily New Cases
            </h3>
            <div className='canada__chart'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={allProvinces} />
            </div>

            <h3 className='canada__title'>
                Timeline of COVID-19 in British Columbia
            </h3>
            <div className='canada__chart'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={props.timeline}
                />
                <p className='canada__source'>source: <a href="https://www.cbc.ca/news/canada/british-columbia/covid-19-bc-timeline-1.5520943">CBC News</a></p>
            </div>
        </div>
    )
}
