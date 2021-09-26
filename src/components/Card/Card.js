/* eslint-disable indent */
import React from 'react'
import './Card.scss'

export default function Card(props) {
    const { card } = props

    return (
        <div className='card-item'>
            {card.cover &&
                <img
                    className='card-cover'
                    src={card.cover}
                    alt="pic"
                    onMouseDown={e => e.preventDefault()}
                />
            }
            {card.title}
        </div>
    )
}
