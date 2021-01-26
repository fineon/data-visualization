import React from 'react';
import './InstantAnswers.scss';

export default function InstantAnswers(props) {
    return (
        <div className='answer'>
            <h2 className='answer__title'>Your DuckDuckGo Answer Machine</h2>

            {props.Heading ? <h2 className='answer__title'>{props.Heading}</h2> : null}

            {props.Image ? <img
                className='answer__img'
                src={`https://www.duckduckgo.com${props.Image}`}
                alt='duckduckgo preview img' /> : null}

            {props.Abstract ? <p className='answer__desc'>{props.Abstract}</p> : <a href={props.AbstractURL}
                className='answer__link'>{props.AbstractURL}</a>}

            {props.Infobox ? props.Infobox.content.map(info => {
                return (
                    <div
                        className='answer__infobox'
                        key={info.wiki_order}>
                        <p>{info.label}</p>
                        <p>{info.value}</p>
                    </div>)
            }) : null}

            <form action="" onSubmit={props.searchQuery}>
                <input
                    className='answer__input'
                    type="text"
                    name='query'
                    placeholder='Search for topics' />
                <button className='answer__button'>
                    Search
                </button>
            </form>
        </div>
    )
}
