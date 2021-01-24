import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './Dashboard.scss';


let allCountries = 'https://api.covid19api.com/summary';
let canada = 'https://api.covid19api.com/live/country/canada';


let currentDate = new Date().toISOString();



export default class Dashboard extends Component {
    state = {
        countries: {},
        canada: [],
        chartOptions: {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Total Confirmed Cases'
            },
            series: [{
                name: 'cases',
                colorByPoint: true,
                data: [{
                    name: 'Jane',
                    y: 31
                }, {
                    name: 'John',
                    y: 69
                }]
            }]
        }
    }

    //add comparison calculations to stats to emphasize impacts of COVID
    //add increments or decreasing numbers on dashboard
    //add button enabling dark mode
    //separate stats by components


    componentDidMount() {
        axios.get(allCountries).then(item => {
            console.log(item);

            this.setState({
                countries: item.data,
                chartOptions: {
                    series: [{
                        // name: item.data.Countries[0].TotalConfirmed,
                        name: item.data.Global.NewConfirmed,
                        data: [{
                            name: 'Jane',
                            y: 31
                        }, {
                            name: 'John',
                            y: 69
                        }]
                    }]
                }
            });
        });


      


    }


    componentDidUpdate() {


    }

    setCountry = (event) => {
        //returns undefined, cant read prop of undefined
        // console.log(this.state.countries.Global.TotalConfirmed)

        // axios.get(`https://api.covid19api.com/live/country/${event.target.value}`).then(item => {
        //     console.log(item);

        //     this.setState({
        //         countries: item.data
        //     });
        // });

        console.log(event.target.country.value)

    }


    render() {
        document.title = "COVID-19 Data Dashboard"

        //need to sort data by provinces and create a histogram + all province confirmed cases/canada


        return (
            <section>
                <h2>data dashboard</h2>

                <form action="">
                    <label htmlFor=""> Select your country to view cases </label>
                    <select name="countries" id="countries">

                        {this.state.countries.Countries && this.state.countries.Countries.map(country => {
                            return <option
                                key={country.ID}
                                name='country'
                                value={country.Country}
                                onChange={this.setCountry}>
                                {country.Country}
                            </option>
                        })}

                    </select>
                </form>

                <div className="test">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartOptions} />
                </div>


                <p>data updated as of {new Date(this.state.countries.Date).toLocaleDateString()}</p>

                <div>
                    <h2>your country here</h2>
                    <h2>Infection rate {null}</h2>
                    <h2>Recovered</h2>

                </div>

                <div>
                    <h2>World Total Cases</h2>
                    {/* <p>{(JSON.stringify(this.state.countries.Global.TotalConfirmed)/7,800,000,000)*100}</p> */}
                    <p>{(780 / 7800) * 100}</p>
                    <p>confirmed cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    <h2>Province details</h2>
                    <p>province 1</p>
                    <p>confirmed cases, recovered, deaths</p>
                    <p>province 2 etc.</p>
                </div>




            </section>
        )
    }
}
