import React from 'react';

import './LocalCountry.scss';

export default function LocalCountry(props) {
    return (
        <div>
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
        </div>
    )
}
