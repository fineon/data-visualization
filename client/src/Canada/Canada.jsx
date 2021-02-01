import React from 'react'
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

    let currentDate = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();

    if (props.allProvinces) {
        //for online api
        // latestCanada.push(props.allProvinces.pop())

        //for offline api
        latestCanada.push(props.allProvinces)


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

        //an attempt to automate filtertering 13 provinces

        // for (let k of  [yukon,sask, BC, ON,alberta, newBrun,NS,manitoba,newFound, northwest, princeE, nuvavut, QB] ) {
        //     for (const val of ['Yukon','Saskatchewan','British Columbia','Ontario','Alberta','New Brunswick','Nova Scotia','Manitoba','Newfoundland and Labrador','Northwest Territories','Prince Edward Island','Nunavut','Quebec']) {
        //         k = splicedDateCan.filter(item => item.province === val)    
        //     }
        //     console.log(k)
        // }


        BC = splicedDateCan.filter(item => item.province === 'British Columbia')

        ON = splicedDateCan.filter(item => item.province === 'Ontario')

        alberta = splicedDateCan.filter(item => item.province === 'Alberta')

        sask = splicedDateCan.filter(item => item.province === 'Saskatchewan')

        QB = splicedDateCan.filter(item => item.province === 'Quebec')


    }

    console.log(BC)

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
        <div>
            <h2>Canada Statistics and Resources</h2>

            <h3>Major Canada Provinces with Daily New Cases</h3>
            <HighchartsReact
                highcharts={Highcharts}
                options={allProvinces} />

            <h3>Timeline of COVID-19 as it happends in British Columbia</h3>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={props.timeline}
                />
            <p>source: <a href="https://www.cbc.ca/news/canada/british-columbia/covid-19-bc-timeline-1.5520943">CBC News</a></p>
            </div>
        </div>
    )
}