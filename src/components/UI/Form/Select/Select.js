import React, {Fragment} from 'react';
import classes from './Select.css'

const select = (props) => {
    let options = null;
    if(props.options){
        options = props.options.map(o => {
            return <option key={o} value={o}>{o}</option>
        })
    }
    return (
        <Fragment>
            <label className={classes.Label}>{props.label}</label>
            <select className={classes.Select} name={props.label}>
                <option value="" disabled selected>Select your {props.label}</option>
                {options}
            </select>
        </Fragment>
    )
}

export default select;
