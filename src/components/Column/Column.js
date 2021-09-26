import Task from 'components/Task/Task';
import React from 'react';
import './Column.scss';

export default function Column() {
    return (
        <div className="column">
            <header>Brainstorm</header>
            <ul className='task-list'>
                <Task />
                <li className='task-item'>Add what you'd like to work to bellow</li>
                <li className='task-item'>Add what you'd like to work to bellow</li>
                <li className='task-item'>Add what you'd like to work to bellow</li>
                <li className='task-item'>Add what you'd like to work to bellow</li>
                <li className='task-item'>Add what you'd like to work to bellow</li>
            </ul>
            <footer>Add another card</footer>
        </div>
    )
}
