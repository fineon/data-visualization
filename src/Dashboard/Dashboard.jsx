import React, { Component } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Header from './../Header/Header';

import './Dashboard.scss';


let allCountries = 'https://api.covid19api.com/summary';
let canada = 'https://api.covid19api.com/live/country/canada';
let covidInfo ='https://api.duckduckgo.com/?q=covid&format=json&pretty=1';

//enable CORS on client side
(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

export default class Dashboard extends Component {
    state = {
        global : {},
        instantAnswers:{},
        countries: {},
        canada: [],
        chartOptions: {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Global COVID-19 Cases'
            },
            // series: [{
            //     name: 'cases',
            //     colorByPoint: true,
            //     data: [{
            //         name: 'Jane',
            //         y: 31
            //     }, {
            //         name: 'John',
            //         y: 69
            //     }]
            // }]
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

        // got CORS error, may need to set up an express server
        //resolved using a code snippet
        axios.get('https://cors-anywhere.herokuapp.com/' + covidInfo).then(answer=>{
            console.log(answer)
            this.setState({
                instantAnswers: answer.data,
            })
        })





    }


    componentDidUpdate() {


    }

    //onChange event not firing, no console.log when clicked
    setCountry = (e) => {
        e.preventDefault()
        console.log(e.target.countries.value)
        axios.get(`https://api.covid19api.com/live/country/${e.target.country.value}`).then(item => {
            console.log(item);
            this.setState({
                countries: item.data
            });
        });
        
    }

    searchQuery = (e) =>{
        e.preventDefault()
        console.log(e.target.query.value)
        axios.get('https://cors-anywhere.herokuapp.com/' + `https://api.duckduckgo.com/?q=${e.target.query.value}&format=json&pretty=1`).then(res => {
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

        if (this.state.countries.Countries) {
            //renders an array only with numbers of new cases
            let numArr = this.state.countries.Countries.map(num => num.NewConfirmed)
            //find the largest number
            let biggestCase = Math.max(...numArr)
            //find the country with most new cases
            let topNewCaseCountry = this.state.countries.Countries.find(num => num.NewConfirmed === biggestCase)
            console.log(topNewCaseCountry)

            //sort by lowest to highest cases
            let rankedCases = numArr.sort((a, b) => a - b)
            console.log(rankedCases)

            //get the top 5 highest number of cases
            let cutRanked = rankedCases.splice(184,5)
            console.log(cutRanked)

            //search for top 5 countries with most confirmed cases
            let newArr = []
            for (let i = 0; i < cutRanked.length; i++) {
                newArr.push(this.state.countries.Countries.find(obj => obj.NewConfirmed === cutRanked[i]))
            }

            console.log(newArr)


        }





        //need to sort data by provinces and create a histogram + all province confirmed cases/canada

        //returns undefined
        // console.log(this.state.countries.Global.TotalConfirmed)

        //returns the API object
        // console.log(this.state.countries.Global)

    console.log(this.state.instantAnswers)

        return (
            <section>
                <Header />
                <h2>data dashboard</h2>

                <form action="">
                    <label htmlFor=""> Select your country to view cases </label>
                    <select 
                    name="countries" 
                    // can't read value
                    value='need value from the country object'
                    onChange={this.setCountry}>

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
                        options={this.state.chartOptions} />
                    <p>data updated as of {new Date(this.state.countries.Date).toDateString()}</p>
                </div>

                <div>
                    <h2>World Total Cases</h2>
                    <p>{this.state.countries.Global ? this.state.countries.Global.TotalConfirmed/7800000000*100 : null}</p>
                    <p>confirmed cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    {/* cant reach the variable */}
                    <h2>{this.topNewCaseCountry} is the country with most newly confirmed cases</h2>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartOptions} />

                </div>

                <div>
                    <h2>Top 5 countries with most newly confirmed cases</h2>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartOptions} />
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

                <div>
                    <h2>Your DuckDuckGo Answer Machine</h2>
                    {this.state.instantAnswers.Heading ? <h2>{this.state.instantAnswers.Heading}</h2> : null}

                    {this.state.instantAnswers.Abstract ? <p>{this.state.instantAnswers.Abstract}</p> : null}

                    {this.state.instantAnswers.Infobox ? this.state.instantAnswers.Infobox.content.map(info => {
                        return (
                        <div key={info.wiki_order}>
                        <p>{info.label}</p>
                        {/* last value item has an object, cant map it */}
                        {/* <p>{info.value != info.value[-1]}</p> */}
                        <p>{info.value}</p>
                        </div>)
                    }) : null}

                    <form action="" onSubmit={this.searchQuery}>
                        <input type="text" name='query' />
                        <button>Search</button>
                    </form>
                </div>

                <div>
                    <h2>Newsfeed</h2>
                    <div></div>
                </div>



                <div>
                    <h2>And More Data Awaits After Signing Up (Location-based data, export as PDF, CSV and social media sharing)</h2>
                    <button>Sign In</button>
                </div>

            </section>
        )
    }
}
