import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Header from './../Header/Header';

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


    componentDidUpdate() {


    }

    //onChange event not firing, no console.log when clicked
    setCountry = (event) => {
        //returns undefined, cant read prop of undefined
        // console.log(this.state.countries.Global.TotalConfirmed)

        // axios.get(`https://api.covid19api.com/live/country/${event.target.country.value}`).then(item => {
        //     console.log(item);

        //     this.setState({
        //         countries: item.data
        //     });
        // });

        console.log(event.target.country.value)

    }

    // top1 = () => {
    //     return this.state.countries.Global.TotalConfirmed / 7,800,000,000 * 100
    // }


    render() {
        document.title = "COVID-19 Data Dashboard"


        if (this.state.countries.Countries) {
            let numArr = this.state.countries.Countries.map(num => num.NewConfirmed)
            let biggestCase = Math.max(...numArr)

            //returns a number
            console.log(Math.max(...numArr))

            //returns NaN 
            console.log(Math.max(numArr))

            let topNewCaseCountry = this.state.countries.Countries.find(num => num.NewConfirmed === biggestCase)
            console.log(topNewCaseCountry)

            console.log(numArr.sort((a, b) => a - b))


        }





        //need to sort data by provinces and create a histogram + all province confirmed cases/canada

        //returns undefined
        // console.log(this.state.countries.Global.TotalConfirmed)

        //returns the API object
        // console.log(this.state.countries.Global)

        return (
            <section>
                <Header />
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
                    <p>data updated as of {new Date(this.state.countries.Date).toDateString()}</p>
                </div>

                <div>
                    <h2>World Total Cases</h2>
                    {/* <p>{this.state.countries.Global ? this.state.countries.Global.TotalConfirmed/7,800,000,000*100 : null}</p> */}
                   
                   <p>{this.state.countries.Global ? this.state.countries.Global.TotalConfirmed : null}</p>

                   {/* <p>{this.top1}</p> */}

                    <p>{(780 / 7800) * 100}</p>
                    <p>confirmed cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    {/* sort method in array? style with most red, then decrease redness by 10% */}
                    <h2>Top #1 country with most confirmed cases</h2>
                    {/* cant reach the variable */}
                    <h3>{this.topNewCaseCountry}</h3>
                    <h2>Top #2...</h2>
                    <h3>Top 3...</h3>
                </div>
                

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
