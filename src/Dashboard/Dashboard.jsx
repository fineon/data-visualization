import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';

import './Dashboard.scss';

let covidAPI = 'https://api.covid19api.com/dayone/country/south-africa/status/confirmed';

let currentDate = new Date().toISOString();
console.log(currentDate);

export default class Dashboard extends Component {
    state={
        data: [],
    }

    //add comparison calculations to stats to emphasize impacts of COVID

    componentDidMount(){
        axios.get(covidAPI).then(item =>{
            console.log(item);
            this.setState({
                data: item.data[0].Cases
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
        return (
            <div>
                <h2>data dashboard</h2>

                <p>
                    {this.state.data}
                </p>

                <div id="test" >
                   
                </div>

                <h2>Total Cases</h2>
                <p>450 <span>confirmed</span></p>
              
                
            </div>
        )
    }
}
