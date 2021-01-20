import React, { Component } from 'react';
import axios from 'axios';


export default class Dashboard extends Component {
    state={
        data: [],
    }

    componentDidMount(){
        axios.get('').then(item =>{
            console.log(item);
        })
    }

    render() {
        return (
            <div>
                <h2>data dashboard</h2>

                <p>
                    {this.state.data}
                </p>
                
            </div>
        )
    }
}
