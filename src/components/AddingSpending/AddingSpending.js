import React from 'react';
import Form from '../UI/Form/Form';
import classes from './AddingSpending.css';

const formInputs = [
    {id: 1, category: 'input', type: 'number', label: 'value'},
    {id: 2, category: 'select', label: 'category', options: ['Food','Home','Rent']},
    {id: 3, category: 'input', type: 'date', label: 'date'},
    {id: 4, category: 'select', label: 'account', options: ['Zuzanna Konto','Piotr Konto','Zuzanna 2', 'Piotr 2']},
    {id: 5, category: 'input', type: 'text', label: 'description'}
]

const spending = (props) => {
    return (
        <div className={classes.Spending}>
            <h1>Add New Spending</h1>
            <Form inputs={formInputs} clicked={props.AddSpendingHandler}/>
        </div>
    )
}

export default spending;
