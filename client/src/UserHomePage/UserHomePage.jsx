import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Header from './../Header/Header';

import './UserHomePage.scss';


let allCountries = 'https://api.covid19api.com/summary';
let canada = 'https://api.covid19api.com/live/country/canada';



export default class Dashboard extends Component {
    state = {
        countries: {},
        canada: [],
        chartOptions: {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Global COVID-19 Cases'
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

    componentDidMount() {
        axios.get(allCountries).then(item => {
            console.log(item);

            this.setState({
                countries: item.data,
                chartOptions: {
                    series: [{
                        // name: item.data.Countries[0].TotalConfirmed,
                        name: 'cases',
                        data: [
                            {
                            name: 'New Confirmed',
                            y: item.data.Global.NewConfirmed
                        }, {
                            name: 'Total Confirmed',
                            y: item.data.Global.TotalConfirmed
                        },
                        {
                            name: 'New Deaths',
                            y: item.data.Global.NewDeaths
                        },
                        {
                            name: 'Total Deaths',
                            y: item.data.Global.TotalDeaths
                        },
                        {
                            name: 'New Recovered',
                            y: item.data.Global.NewRecovered
                        },
                        {
                            name: 'Total Recovered',
                            y: item.data.Global.TotalRecovered
                        }
                    ]
                    }]
                }
            });
        });


    }

    setCountry = (event) => {
        console.log(event.target.country.value)

    }


    render() {
        document.title = "User Data Dashboard"
        return (
            <section>
                <Header username='jason'/>

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


                <p>data updated as of {new Date(this.state.countries.Date).toDateString()}</p>

                <div>
                    <h2>your country here</h2>
                    <h2>Infection rate {null}</h2>
                    <h2>Recovered</h2>

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
