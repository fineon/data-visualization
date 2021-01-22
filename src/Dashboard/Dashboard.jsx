import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';

import './Dashboard.scss';

let covidAPI = 'https://api.covid19api.com/live/country/canada';

let currentDate = new Date().toISOString();
console.log(currentDate);



export default class Dashboard extends Component {
    state={
        stats: [],
    }

    //add comparison calculations to stats to emphasize impacts of COVID
    //add increments or decreasing numbers on dashboard
    //add button enabling dark mode
    //separate stats by components


    componentDidMount(){
        axios.get(covidAPI).then(item =>{
            console.log(item);
            this.setState({
                stats: item.data
            });
            
        });

     

        document.addEventListener('DOMContentLoaded', function () {
            const chart = Highcharts.chart('test', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Fruit Consumption'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            });
        });

    }
    
    componentDidUpdate(){
            const chart = Highcharts.chart('test', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Fruit Consumption'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            });
 

    }


    render() {
        document.title="COVID-19 Data Dashboard"

        //need to sort data by provinces and create a histogram + all province confirmed cases/canada
        let test = this.state.data.filter(item => item.Date === '2021-01-20T00:00:00Z');
        console.log(test);

        return (
            <div>
                <h2>data dashboard</h2>

                <div id="test" >
                   
                </div>

                <h2>Total Cases</h2>
                <p>450 <span>confirmed</span></p>
              
                
            </div>
        )
    }
}
