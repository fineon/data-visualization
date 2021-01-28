import React from 'react';

import './WorldCards.scss';

export default function WorldCards(props) {
    return (
        <section>
            
            <div>
                    <h2>World Total Confirmed Cases</h2>
                    <p>
                        {props.Global ? (props.Global.TotalConfirmed / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p>confirmed cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    <h2>World Total Death Cases</h2>
                    <p>
                        {props.Global ? (props.Global.TotalDeaths / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p>death cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

                <div>
                    <h2>World Total Recovered Cases</h2>
                    <p>
                        {props.Global ? (props.Global.TotalRecovered / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p>recovered cases</p>
                    <p>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview">Yale University</a>
                    </p>
                </div>

        </section>
    )
}
