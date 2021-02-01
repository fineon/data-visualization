import React from 'react';

import './WorldCards.scss';

export default function WorldCards(props) {
    return (
        <section className='worldcards'>
            <div className='worldcards__card'>
                <h2 className='worldcards__card__title'>Total Confirmed Cases</h2>
                <p className='worldcards__card__stat'>
                    {props.Global ? (props.Global.TotalConfirmed / 7800000000 * 100).toFixed(2) : 'data not found'}%
                    </p>
                <p className='worldcards__card__desc'>of the world population</p>
                <h3 className='worldcards__card__desc'>that's {props.Global ? `${props.Global.TotalConfirmed} people!` : 'a lot !'}
                </h3>
              
            </div>

            <div className='worldcards__card'>
                <h2 className='worldcards__card__title'>Total Death Cases</h2>
                <p className='worldcards__card__stat'>
                    {props.Global ? (props.Global.TotalDeaths / 7800000000 * 100).toFixed(2) : 'data not found'}%
                    </p>
                <p className='worldcards__card__desc'>of the world population</p>
                <h3 className='worldcards__card__desc'>that's {props.Global ? `${props.Global.TotalDeaths} people!` : 'a lot !'}
                </h3>
         
            </div>

            <div className='worldcards__card'>
                <h2 className='worldcards__card__title'>Total Recovered Cases</h2>
                <p className='worldcards__card__stat__recovered'>
                    {props.Global ? (props.Global.TotalRecovered / 7800000000 * 100).toFixed(2) : 'data not found'}%
                    </p>
                <p className='worldcards__card__desc'>of the world population</p>
                <h3 className='worldcards__card__desc'>that's {props.Global ? `${props.Global.TotalRecovered} people!` : 'a lot !'}
                </h3>
            </div>
            <p className='worldcards__card__desc__source'>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview"
                    className='worldcards__card__link'>Yale University</a>
                </p>
        </section>
    )
}
