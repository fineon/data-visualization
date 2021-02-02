import React, { Component, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from 'highcharts/modules/wordcloud';

import firebase from "firebase/app";


import Header from './../Header/Header';
import './UserHomePage.scss';
import Footer from '../Footer/Footer';

wordCloud(Highcharts);

export default class UserHomePage extends Component {

    state = {
        testChart: {
            title: {
                text: 'User Question Chart'
            },
            series: [{
                type: 'wordcloud',
                data: [
                    {
                        name: 'cooking',
                        weight: 5,
                    },
                    {
                        name: 'cleaning',
                        weight: 3,
                    },
                    {
                        name: 'something',
                        weight: 1,
                    },
                ],
                name: 'Activities'
            }],

        },

        pollChart: {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Poll Chart'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            series: [
                {
                    name: 'Year 1800',
                    data: [107, 31, 635, 203, 2]
                },
            ]
        },


    }



    userDataSubmit = (e) => {
        
        if (e.target.activity.value && e.target.scale.value) {
            let userObj = {
                name: e.target.activity.value,
                weight: e.target.scale.value,
            }

            e.preventDefault();
            axios.post('http://localhost:8080/userchart', userObj)
                .then(item => {
                    console.log(item)
                    this.setState({
                        testChart: {
                            series: [
                                {
                                    type: 'wordcloud',
                                    data: item.data.map(word => {
                                        return {
                                            name: word.name,
                                            weight: word.weight
                                        }
                                    })
                                }
                            ],
                            title: {
                                text: 'User Activities Summary'
                            }
                        },

                    })
                })

        } else {
            e.preventDefault();
            alert('please fill in both fields')
        }
    }

    pollSubmit = (e) => {
        let pollObj = {
            option: e.target.option.value,
        }

        e.preventDefault();
        axios.post('http://localhost:8080/poll', pollObj)
            .then(res => {
                console.log(res)

                // this.setState({
                // pollChart: {

                // }
                // })
            })
    }

    logOut = () => {
        this.props.history.push('/')
    }

    render() {
        document.title = "CoDash - Your Data Dashboard"
        return (
            <section>
                <Header username='there' />

                <h2>data dashboard</h2>

                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.testChart} />

                <h3>What is Your Favorite Activity During Quarantine? </h3>
                <form
                    onSubmit={this.userDataSubmit}>
                    <label htmlFor="">enter data here</label>
                    <input
                        type="text"
                        name='activity'
                        placeholder='fill in your activity here' />
                    <label>on a scale of 1 to 5, how often do you do it?</label>

                    <select name="scale" id="scale">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>

                    <button>Submit</button>

                </form>

                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.pollChart} />

                <h3>How are you protecting yourself from the pandemic? </h3>
                <form
                    onSubmit={e => this.pollSubmit(e)}
                >

                    <input
                        type="checkbox"
                        name='option1'
                        value='mask'
                        placeholder='poll here' />

                    <label >mask</label>
                    <br />
                    <input
                        type="submit"
                        value="submit" />
                </form>

                <button onClick={this.logOut}>
                    Log Out
                </button>

                <Footer />
            </section>
        )
    }
}
