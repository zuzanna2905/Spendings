import React, {Fragment} from 'react';
import classes from './Select.css'

const select = (props) => {
    let options = null;
    if(props.options){
        options = props.options.map(o => {
            return <option key={o.value} value={o.value}>{o.value}</option>
        })
    }
    return (
        <Fragment>
            <label className={classes.Label}>{props.name}</label>
            <select 
                className={classes.Select} 
                name={props.name} 
                value={props.value} 
                onChange={props.changed}
            >
                <option value='' disabled>Select your {props.name}</option>
                {options}
            </select>
        </Fragment>
    )
}

export default select;
