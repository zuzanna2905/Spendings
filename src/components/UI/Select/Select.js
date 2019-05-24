import React, {Fragment} from 'react';
import classes from './Select.css'

const select = (props) => {
    let options = null;
    if(props.options){
        options = props.options.map(o => {
            return <option key={o.id} value={o.name}>{o.name}</option>
        })
    }
    let label = props.value ? props.value: `Select your ${props.label}`
    return (
        <Fragment>
            <label className={classes.Label}>{props.label}</label>
            <select 
                className={classes.Select} 
                name={props.label} 
                value={props.value} 
                onChange={props.changed}
            >
                <option value={props.value} disabled>{label}</option>
                {options}
            </select>
        </Fragment>
    )
}

export default select;