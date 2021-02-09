import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import timelineChart from 'highcharts/modules/timeline';

import Header from './../Header/Header';
import InstantAnswers from './../InstantAnswers/InstantAnswers';
import WorldCards from '../WorldCards/WorldCards';

import './Dashboard.scss';

import Footer from './../Footer/Footer';
import Canada from '../Canada/Canada';

timelineChart(Highcharts);

const API_URL = process.env.NODE_ENV === "production"
  ? 'https://whispering-springs-73013.herokuapp.com'
  : 'http://localhost:5000';

let allCountries = `${API_URL}/allcountries`;
let canada = `${API_URL}/canada`;
let duckDuckGo = `${API_URL}/duckduckgo`;



export default class Dashboard extends Component {
    state = {
        instantAnswers: {},
        countries: {},
        canada: [],
        timeline: {
            chart: {
                type: 'timeline'
            },
            accessibility: {
                screenReaderSection: {
                    beforeChartFormat: '<h5>{chartTitle}</h5>' +
                        '<div>{typeDescription}</div>' +
                        '<div>{chartSubtitle}</div>' +
                        '<div>{chartLongdesc}</div>' +
                        '<div>{viewTableButton}</div>'
                },
                point: {
                    valueDescriptionFormat: '{index}. {point.label}. {point.description}.'
                }
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                visible: false
            },
            title: {
                text: 'Timeline of COVID-19 in Canada'
            },
            colors: [
                '#4185F3',
                '#427CDD',
                '#406AB2',
                '#3E5A8E',
                '#3B4A68',
                '#363C46'
            ],
            series: [{
                data: [{
                    name: 'First Outbreak',
                    label: 'Dec.19: First Outbreak',
                    description: 'December 2019: A new, infectious coronavirus, from the same family of viruses causing the common cold, is first identified in the City of Wuhan in China’s Hubei province. It starts spreading from person to person, beginning the outbreak.'
                }, {
                    name: 'First Case in B.C',
                    label: 'Jan.2020: First Case in B.C',
                    description: 'Jan.28,2020: Health officials announce the first presumptive case of novel coronavirus in B.C. The patient had recently been in Wuhan, China, on a business trip and tested positive after returning to his home in the Vancouver Coastal Health region. A second test at the National Microbiology Laboratory in Winnipeg later confirms the diagnosis.'
                }, {
                    name: 'Physical Distancing',
                    label: 'March,2020: Start of Physical Distancing',
                    description: 'March.16,2020: Many British Columbians begin the work week from home, following directives from public health officials to stay home if they are able.Gatherings of more than 50 people are banned in B.C., including sporting events, meetings, conferences, concerts and religious gatherings. Any businesses that cannot avoid large groups of people, like restaurants, bars and casinos, are ordered to shut down. Many restaurants move to take-out service only.Visits to long-term care homes are restricted to essential visitors only.'
                }, {
                    name: 'Public Health Emergency Declared',
                    label: 'March, 2020: Public Health Emergency Declared',
                    description: 'March.17,2020: Provincial Health Officer Dr. Bonnie Henry declares a public health emergency in B.C., giving herself power to make verbal orders to the public that are immediately enforceable. Classes and Flights are cancelled. Repatriation flights are announced'
                },
                ]
            }]
        },


        //highcharts properties
        pieChartCases: {},
        topNewCaseCountry: {},
        //stacked chart
        specificCountryChart: {},


    }

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
        axios.get(`${API_URL}/country/${e}`).then(item => {
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
        axios.get(`${API_URL}/duckduckgo/${e.target.query.value}`).then(res => {
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
            // cutRanked = rankedCases.splice(184, 5)
            cutRanked = rankedCases.splice(rankedCases.length - 5, 5)
            console.log(cutRanked)

            // search for top 5 countries with most confirmed cases

            for (let i = 0; i < cutRanked.length; i++) {
                top5Countries.push(this.state.countries.Countries.find(obj => obj.NewConfirmed === cutRanked[i]))
            }

            console.log(top5Countries)
        }


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



        return (
            <section className='dashboard'>
                <Header />
                <h2 id="dashboard" className='dashboard__title' >Data Dashboard</h2>

                <form className='dashboard__global-form'>
                    <label className='dashboard__global-form__label'> Select your country to view cases </label>
                    <select
                        name="countries"

                        onChange={e => this.setCountry(e.target.value)}>

                        {this.state.countries.Countries && this.state.countries.Countries.map(country => {
                            return <option
                            className='dashboard__global-form__option'
                                key={country.ID}
                                value={country.Country}>
                                {country.Country}
                            </option>
                        })}

                    </select>
                </form>

                <div className='dashboard__global-chart-container'>
                    <div className='dashboard__global-chart'>
                        {this.state.specificCountryChart.series !== undefined ? <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.specificCountryChart} /> : <h3 className='dashboard__global-chart__title'>Select another country to begin</h3>}
                    </div>
                    <div className="dashboard__global-chart">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.pieChartCases} />
                        
                    </div>
                </div>
                <p className='dashboard__source'>
                    Data Updated As Of {new Date(this.state.countries.Date).toDateString()}
                </p>

                <WorldCards
                    Global={this.state.countries.Global} />

                <div className='dashboard__most-new-cases-container'>
                    <h2 className='dashboard__most-new-cases-container__title'>
                        {this.state.countries.Countries && topNewCaseCountry.Country} is the country with most newly confirmed cases
                    </h2>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={mostNewCaseCountry}
                    />


                </div>

                <div className='dashboard__top5-container'>
                    <h2 className='dashboard__top5-container__title'>Top 5 countries with most newly confirmed cases</h2>
                    <div className='dashboard__top5-container__chart'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={top5} />
                    </div>
                </div>

                <Canada
                    allProvinces={this.state.canada}
                    timeline={this.state.timeline}
                />

                <InstantAnswers
                    Heading={this.state.instantAnswers.Heading}

                    Image={this.state.instantAnswers.Image}

                    Abstract={this.state.instantAnswers.Abstract}

                    AbstractURL={this.state.instantAnswers.AbstractURL}

                    Infobox={this.state.instantAnswers.Infobox}

                    searchQuery={this.searchQuery}
                />

                <div className='dashboard__banner'>
                    <h2 className='dashboard__banner__title'>
                        And More Data Awaits In Our Polls! Visit Them Today to Know What Your Quarantine Peers Are Up To
                    </h2>
                    <Link to='/dashboard'>
                        <button className='dashboard__banner__button'>
                            Visit Now
                        </button>
                    </Link>
                </div>

                <Footer />
            </section>
        )
    }
}
