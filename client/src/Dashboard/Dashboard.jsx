import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Header from './../Header/Header';
import InstantAnswers from './../InstantAnswers/InstantAnswers';

import './Dashboard.scss';


let allCountries = 'https://api.covid19api.com/summary';
let canada = 'https://api.covid19api.com/live/country/canada';
let duckDuckGo = 'http://localhost:8080/duckduckgo';

export default class Dashboard extends Component {
    state = {
        instantAnswers: {},
        countries: {},
        canada: [],
        pieChartCases: {},
        topNewCaseCountry: {},
        top5Countries: {},
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
                pieChartCases: {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: 'Global COVID-19 Cases'
                    },
                    series: [{
                        name: 'cases',
                        colorByPoint: true,
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
                },
            });


        });

        // got CORS error, may need to set up an express server
        //resolved using a code snippet
        axios.get(duckDuckGo).then(answer => {
            console.log(answer)
            this.setState({
                instantAnswers: answer.data,
            })
        })

        this.setState({
            // topNewCaseCountry: {
            //     chart: {
            //         type: 'pie'
            //     },
            //     title: {
            //         text: 'United States COVID-19 Cases'
            //     },
            //     series: [{
            //         name: 'cases',
            //         colorByPoint: true,
            //         data: [
            //             {
            //                 name: 'New Confirmed',
            //                 y: item.data.Global.NewConfirmed
            //             }, {
            //                 name: 'Total Confirmed',
            //                 y: item.data.Global.TotalConfirmed
            //             },
            //             {
            //                 name: 'New Deaths',
            //                 y: item.data.Global.NewDeaths
            //             },
            //             {
            //                 name: 'Total Deaths',
            //                 y: item.data.Global.TotalDeaths
            //             },
            //             {
            //                 name: 'New Recovered',
            //                 y: item.data.Global.NewRecovered
            //             },
            //             {
            //                 name: 'Total Recovered',
            //                 y: item.data.Global.TotalRecovered
            //             }
            //         ]
            //     }]
            // },
            top5Countries: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top 5 Countries with Most New Cases'
                },
                xAxis: {
                    categories: [
                        1,
                        2,
                        3,
                        4,
                        5
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'New Cases'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [
                    {
                        name: 'confirmed cases',
                        data: [3, 3, 3]
                    },
                    {
                        name: 'recovered cases',
                        data: [3, 5, 1]
                    },
                    {
                        name: 'death cases',
                        data: [9, 5, 1]
                    }
                ]
            },
        })




    }


    componentDidUpdate() {

    }

    //onChange event not firing, no console.log when clicked
    // setCountry = (e) => {
    //     axios.get(`https://api.covid19api.com/live/country/${e.target.countries.value}`).then(item => {
    //         console.log(item);
    //         this.setState({
    //             countries: item.data
    //         });
    //     });

    // }

    leftClick=(e) => {
        axios.get(`https://api.covid19api.com/live/country/${e}`).then(item => {
            console.log(item);
            this.setState({
                countries: item.data
            });
        });
    }

    searchQuery = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:8080/duckduckgo/${e.target.query.value}`).then(res => {
            console.log(res)
            this.setState({
                instantAnswers: res.data,
            })
        })
    }


    render() {
        document.title = "COVID-19 Data Dashboard"

        if (this.state.instantAnswers.Infobox) {
            //remove the last nested object for proper mapping JSX
            let popped = this.state.instantAnswers.Infobox.content.pop()
        }

        let numArr = []
        let biggestCase
        let topNewCaseCountry
        let rankedCases
        let cutRanked
        let top5Countries = []


        if (this.state.countries.Countries) {
            // renders an array only with numbers of new cases
            numArr = this.state.countries.Countries.map(num => num.NewConfirmed)

            // find the largest number
            biggestCase = Math.max(...numArr)
            console.log(biggestCase)
            // find the country with most new cases
            topNewCaseCountry = this.state.countries.Countries.find(num => num.NewConfirmed === biggestCase)
            console.log(topNewCaseCountry)

            // sort by lowest to highest cases
            rankedCases = numArr.sort((a, b) => a - b)
            console.log(rankedCases)

            // get the top 5 highest number of cases
            cutRanked = rankedCases.splice(184, 5)
            console.log(cutRanked)

            // search for top 5 countries with most confirmed cases

            for (let i = 0; i < cutRanked.length; i++) {
                top5Countries.push(this.state.countries.Countries.find(obj => obj.NewConfirmed === cutRanked[i]))
            }

            console.log(top5Countries)
        }

       
        return (
            <section>
                <Header />
                <h2 id="dashboard">Data Dashboard</h2>

                <form >
                    <label > Select your country to view cases </label>
                    <select
                        name="countries"

                        // can't read value
                        // value={'need value from the country object'}
                        
                        onChange={e => this.leftClick(e.target.value)}>

                        {this.state.countries.Countries && this.state.countries.Countries.map(country => {
                            return <option
                                key={country.ID}
                                value={country.Country}>
                                {country.Country}
                            </option>
                        })}

                    </select>
                </form>

                <div className="test">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.pieChartCases} />
                    <p>data updated as of {new Date(this.state.countries.Date).toDateString()}</p>
                </div>

                <div>
                    <h2>World Total Confirmed Cases</h2>
                    <p>
                        {this.state.countries.Global ? (this.state.countries.Global.TotalConfirmed / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p>confirmed cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    <h2>World Total Death Cases</h2>
                    <p>
                        {this.state.countries.Global ? (this.state.countries.Global.TotalDeaths / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p>death cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    <h2>World Total Recovered Cases</h2>
                    <p>
                        {this.state.countries.Global ? (this.state.countries.Global.TotalRecovered / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p>recovered cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    {/* cant reach the variable */}
                    <h2>{this.state.countries.Countries && topNewCaseCountry.Country} is the country with most newly confirmed cases</h2>

                    <h2>top new cases in country</h2>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.pieChartCases} />

                </div>

                <div>
                    <h2>Top 5 countries with most newly confirmed cases</h2>

                    {/* need to pass the processed variable */}
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.top5Countries} />
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

                <InstantAnswers
                    Heading={this.state.instantAnswers.Heading}

                    Image={this.state.instantAnswers.Image}

                    Abstract={this.state.instantAnswers.Abstract}

                    AbstractURL={this.state.instantAnswers.AbstractURL}

                    Infobox={this.state.instantAnswers.Infobox}

                    searchQuery={this.searchQuery}
                />



                <div>
                    <h2>And More Data Awaits After Signing Up (Location-based data, export as PDF, CSV and social media sharing)</h2>
                    <Link to='/signin'>
                        <button>Sign In</button>
                    </Link>
                </div>

            </section>
        )
    }
}
