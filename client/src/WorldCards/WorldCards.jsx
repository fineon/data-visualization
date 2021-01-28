import React from 'react';

import './WorldCards.scss';

export default function WorldCards(props) {
    return (
        <section className='worldcards'>
            <div className='worldcards__card'>
                    <h2 className='worldcards__card__title'>Total Confirmed Cases</h2>
                    <p className='worldcards__card__stat'>
                        {props.Global ? (props.Global.TotalConfirmed / 7800000000 * 100).toFixed(2) : 'a lot..., jk, check back later for data'}%
                    </p>
                    <p className='worldcards__card__desc'>of the world population</p>
                    <p className='worldcards__card__desc'>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview"
                    className='worldcards__card__link'>Yale University</a>
                    </p>
                </div>

                <div className='worldcards__card'>
                    <h2 className='worldcards__card__title'>Total Death Cases</h2>
                    <p className='worldcards__card__stat'>
                        {props.Global ? (props.Global.TotalDeaths / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p className='worldcards__card__desc'>of the world population</p>
                    <p className='worldcards__card__desc'>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview"
                    className='worldcards__card__link'>Yale University</a>
                    </p>
                </div>

                <div   className='worldcards__card'>
                    <h2 className='worldcards__card__title'>Total Recovered Cases</h2>
                    <p className='worldcards__card__stat'>
                        {props.Global ? (props.Global.TotalRecovered / 7800000000 * 100).toFixed(2) : null}%
                    </p>
                    <p className='worldcards__card__desc'>of the world population</p>
                    <p className='worldcards__card__desc'>source: <a href="https://yaleglobal.yale.edu/content/world-population-2020-overview"
                    className='worldcards__card__link'>Yale University</a>
                    </p>
                </div>
        </section>
    )
}
