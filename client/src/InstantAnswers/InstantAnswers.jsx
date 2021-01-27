import React from 'react';
import './InstantAnswers.scss';

export default function InstantAnswers(props) {
    return (
        <div className='answer'>
            <h2 className='answer__title'>Topic: {props.Heading ? props.Heading : 'Undefined, Try Another Search'}</h2>

            <div className='answer__title-img-container'>
                <div className='answer__title-img-container--left'>
                    {props.Heading ? <h2 className='answer__title--left'>{props.Heading}</h2> : null}

                    {props.Abstract ? <p className='answer__desc'>{props.Abstract}</p> : <a href={props.AbstractURL}
                        className='answer__link'>{props.AbstractURL}</a>}
                </div>

                {props.Image ? <img
                    className='answer__img'
                    src={`https://www.duckduckgo.com${props.Image}`}
                    alt='duckduckgo preview img' /> : null}


            </div>

            <div className='answer__infobox-container'>
            {props.Infobox ? props.Infobox.content.map(info => {
                return (
                    <div
                        className='answer__infobox'
                        key={info.wiki_order}>
                        <p className='answer__infobox__title'>{info.label}</p>
                        <p className='answer__infobox__desc'>{info.value}</p>
                    </div>)
            }) : null}
            </div>

            <form 
            action="" 
            className='answer__form'
            onSubmit={props.searchQuery}>
                <input
                    className='answer__form__input'
                    type="text"
                    name='query'
                    placeholder='Search for topics' />
                <button className='answer__form__button'>
                    Search
                </button>
            </form>
        </div>
    )
}
