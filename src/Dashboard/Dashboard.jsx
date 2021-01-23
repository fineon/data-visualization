import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';

import './Dashboard.scss';

let allCountries = 'https://api.covid19api.com/summary';
let canada = 'https://api.covid19api.com/live/country/canada';


let currentDate = new Date().toISOString();
console.log(currentDate);



export default class Dashboard extends Component {
    state = {
        countries: {},
        canada: [],
    }

    //add comparison calculations to stats to emphasize impacts of COVID
    //add increments or decreasing numbers on dashboard
    //add button enabling dark mode
    //separate stats by components


    componentDidMount() {
        axios.get(allCountries).then(item => {
            console.log(item);

            this.setState({
                countries: item.data
            });
        });



        document.addEventListener('DOMContentLoaded', function () {
            const chart = Highcharts.chart('test', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Total Confirmed Cases'
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

    componentDidUpdate() {

        const chart = Highcharts.chart('test', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Total Confirmed Cases'
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

    setStat = () => {
        //returns undefined, cant read prop of undefined
        console.log(this.state.countries.Global.TotalConfirmed)

        // this.setState({
            
        // })
    }


    render() {
        document.title = "COVID-19 Data Dashboard"

        //need to sort data by provinces and create a histogram + all province confirmed cases/canada
        // let test = this.state.data.filter(item => item.Date === '2021-01-20T00:00:00Z');
        // console.log(test);
       

        return (
            <section>
                <h2>data dashboard</h2>

                <form action="">
                    <label htmlFor=""> Select your country to view cases </label>
                    <select name="countries" id="countries">

                        {this.state.countries.Countries && this.state.countries.Countries.map(country => {
                            return <option 
                            value={country.Country}
                            onClick={this.setStat}>
                                {country.Country}
                            </option>
                        })}

                    </select>
                </form>

                <div id="test" > </div>

                <div>
                    <h2>your country here</h2>
                    <h2>Infection rate {null}</h2>
                    <h2>Recovered</h2>

                </div>

                <div>
                <h2>World Total Cases</h2>
                {/* <p>{(JSON.stringify(this.state.countries.Global.TotalConfirmed)/7,800,000,000)*100}</p> */}
                <p>{(780/7800)*100}</p>
                <p>confirmed cases</p>
                <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a></p>
                </div>




            </section>
        )
    }
}
