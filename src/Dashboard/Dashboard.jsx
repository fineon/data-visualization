import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';

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

let covidAPI = 'https://api.covid19api.com/dayone/country/south-africa/status/confirmed';

export default class Dashboard extends Component {
    state={
        data: [],
    }


    componentDidMount(){
        axios.get(covidAPI).then(item =>{
            console.log(item);
            this.setState({
                data: item.data[0].Cases
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
        console.log(this.state.data);
        return (
            <div>
                <h2>data dashboard</h2>

                <p>
                    {this.state.data}
                </p>

                <div id="test" >
                    {chart}
                </div>

              
                
            </div>
        )
    }
}
