import React from 'react'
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './Canada.scss';

export default function Canada(props) {
    //for canada only
    let latestCanada = []
    let splicedDateCan = []

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

    //checking of the data has returned and exist to continue processing it
    if (props.allProvinces) {
        //for online api
        latestCanada.push(props.allProvinces.pop())

        //for offline api
        // latestCanada.push(props.allProvinces)


        //extracting a 2 level nested array to a new array with only objects
        for (let i = 0; i < latestCanada.length; i++) {
            console.log(typeof latestCanada[i])
            if (Array.isArray(latestCanada[i])) {
                for (let a = 0; a < latestCanada[i].length; a++) {
                    splicedDateCan.push({
                        date: new Date(latestCanada[i][a].Date).toLocaleDateString(),
                        province: latestCanada[i][a].Province,
                        active: latestCanada[i][a].Active,
                    })
                }
            }
        }

        console.log(splicedDateCan)

        //finding only the object that matches the correpsonding province name
        BC = splicedDateCan.filter(item => item.province === 'British Columbia')

        ON = splicedDateCan.filter(item => item.province === 'Ontario')

        alberta = splicedDateCan.filter(item => item.province === 'Alberta')

        sask = splicedDateCan.filter(item => item.province === 'Saskatchewan')

        QB = splicedDateCan.filter(item => item.province === 'Quebec')
    }

    console.log(BC)

    //declare a variable to plug in Highcharts
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
            categories: props.allProvinces && BC.map(date => date.date)
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [
            {
                name: 'British Columbia',
                data: props.allProvinces && BC.map(item => item.active)
            }, {
                name: 'Alberta',
                data: props.allProvinces && alberta.map(item => item.active)
            }, {
                name: 'Saskachewan',
                data: props.allProvinces && sask.map(item => item.active)
            }, {
                name: 'Ontario',
                data: props.allProvinces && ON.map(item => item.active)
            }, {
                name: 'Quebec',
                data: props.allProvinces && QB.map(item => item.active)
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
