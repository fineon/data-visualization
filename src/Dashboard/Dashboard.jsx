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

export default class Dashboard extends Component {
    state={
        data: [],
    }

    componentDidMount(){
        axios.get('').then(item =>{
            console.log(item);
        });

      
    }
    
    //saving doc and 2nd render did not show the chart
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
                    {chart}
                </div>

              
                
            </div>
        )
    }
}
