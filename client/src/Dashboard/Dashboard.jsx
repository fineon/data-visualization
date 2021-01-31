import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Header from './../Header/Header';
import InstantAnswers from './../InstantAnswers/InstantAnswers';
import WorldCards from '../WorldCards/WorldCards';

import './Dashboard.scss';

import Footer from './../Footer/Footer';
import LocalCountry from './../LocalCountry/LocalCountry';


let allCountries = 'http://localhost:8080/allcountries';
let canada = 'http://localhost:8080/canada';
let duckDuckGo = 'http://localhost:8080/duckduckgo';

export default class Dashboard extends Component {
    state = {
        instantAnswers: {},
        countries: {},
        canada: [],

        //highcharts properties
        pieChartCases: {},
        topNewCaseCountry: {},
        //stacked chart
        // top5Countries: {},
        specificCountryChart: {},


    }

    //add comparison calculations to stats to emphasize impacts of COVID
    //add increments or decreasing numbers on dashboard
    //add button enabling dark mode


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
                    //to render a half circle
                    
                    //  plotOptions: {
                    //     pie: {
                    //       dataLabels: {
                    //         enabled: true,
                    //         distance: -50,
                    //         style: {
                    //           fontWeight: "bold",
                    //           color: "black"
                    //         }
                    //       },
                    //       startAngle: -90,
                    //       endAngle: 90,
                    //       center: ["50%", "75%"],
                    //       size: "110%"
                    //     }
                    //   },
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
                 }
             });
 
         });
 
         axios.get(duckDuckGo).then(answer => {
             console.log(answer)
             this.setState({
                 instantAnswers: answer.data,
             })
         })
         
        axios.get(canada).then(province => {
            console.log(province)
            this.setState({
                canada: province.data
            })
        })
    }

    setCountry = (e) => {
        axios.get(`http://localhost:8080/country/${e}`).then(item => {
            console.log(item);
            this.setState({
                specificCountryChart: {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: `${item.data.pop().Country} / ${item.data.pop().CountryCode} - ${new Date(item.data.pop().Date).toDateString()}`
                    },
                    series: [{
                        name: 'cases',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'Confirmed',
                                y: item.data.pop().Confirmed
                            },
                            {
                                name: 'Deaths',
                                y: item.data.pop().Deaths
                            },
                            {
                                name: 'Recovered',
                                y: item.data.pop().Recovered
                            }
                        ]
                    }]
                },
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

        if (this.state.canada) {
            console.log(this.state.canada)
            //for online api
            // latestCanada.push(this.state.canada.pop())

            //for offline api
            latestCanada.push(this.state.canada)


            for (let i = 0; i < latestCanada.length; i++) {
                console.log(typeof latestCanada[i])
                if (Array.isArray(latestCanada[i])) {
                    for (let a = 0; a < latestCanada[i].length; a++) {
                        // console.log(typeof latestCanada[i][a])

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

        //highcharts property to render
        const mostNewCaseCountry = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'U.S COVID-19 Cases'
            },
            series: [{
                name: 'cases',
                colorByPoint: true,
                data: [
                    {
                        name: 'New Confirmed',
                        y: this.state.countries.Countries && topNewCaseCountry.NewConfirmed
                    }, {
                        name: 'Total Confirmed',
                        y: this.state.countries.Countries && topNewCaseCountry.TotalConfirmed
                    },
                    {
                        name: 'New Deaths',
                        y: this.state.countries.Countries && topNewCaseCountry.NewDeaths
                    },
                    {
                        name: 'Total Deaths',
                        y: this.state.countries.Countries && topNewCaseCountry.TotalDeaths
                    },
                    {
                        name: 'New Recovered',
                        y: this.state.countries.Countries && topNewCaseCountry.NewRecovered
                    },
                    {
                        name: 'Total Recovered',
                        y: this.state.countries.Countries && topNewCaseCountry.TotalRecovered
                    }
                ]
            }],
        }

        const top5 = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Top 5 Countries with Most New Cases'
            },
            xAxis: {
                categories: this.state.countries.Countries && top5Countries.map(name => name.Country)
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cases'
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
                    data: this.state.countries.Countries && top5Countries.map(name => name.NewConfirmed)
                },
                {
                    name: 'recovered cases',
                    data: this.state.countries.Countries && top5Countries.map(name => name.NewRecovered)
                },
                {
                    name: 'death cases',
                    data: this.state.countries.Countries && top5Countries.map(name => name.NewDeaths)
                }
            ]
        }

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
                categories: this.state.canada && BC.map(date => date.date)
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            //   plotOptions: {
            //     series: {
            //       label: {
            //         connectorAllowed: false
            //       },
            //       pointStart: 2010
            //     }
            //   },

            series: [
                {
                    name: 'British Columbia',
                    data: this.state.canada && BC.map(item => item.active)
                }, {
                    name: 'Alberta',
                    data: this.state.canada && alberta.map(item => item.active)
                }, {
                    name: 'Saskachewan',
                    data: this.state.canada && sask.map(item => item.active)
                }, {
                    name: 'Ontario',
                    data: this.state.canada && ON.map(item => item.active)
                }, {
                    name: 'Quebec',
                    data: this.state.canada && QB.map(item => item.active)
                },
            ],

        }


        return (
            <section>
                <Header />
                <h2 id="dashboard" className='dashboard'>Data Dashboard</h2>

                <HighchartsReact
                    highcharts={Highcharts}
                    options={allProvinces} />

                <form >
                    <label > Select your country to view cases </label>
                    <select
                        name="countries"

                        onChange={e => this.setCountry(e.target.value)}>

                        {this.state.countries.Countries && this.state.countries.Countries.map(country => {
                            return <option
                                key={country.ID}
                                value={country.Country}>
                                {country.Country}
                            </option>
                        })}

                    </select>
                </form>

                {this.state.specificCountryChart.series !== undefined ? <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.specificCountryChart} /> : <h3>Select another country to begin</h3>}

                <div className="test">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.pieChartCases} />
                    <p>data updated as of {new Date(this.state.countries.Date).toDateString()}</p>
                </div>

                <WorldCards
                    Global={this.state.countries.Global} />

                <div>
                    <h2>{this.state.countries.Countries && topNewCaseCountry.Country} is the country with most newly confirmed cases</h2>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={mostNewCaseCountry}
                    />


                </div>

                <div>
                    <h2>Top 5 countries with most newly confirmed cases</h2>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={top5} />
                </div>

                <LocalCountry />


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

                <Footer />
            </section>
        )
    }
}
