import React from 'react';
import classes from './Home.css';
import Background from '../../assets/images/home.png';

const home = () => {
    return (
        <div className={classes.Home} style={{backgroundImage: `url(${Background})`}}>
        </div>
    )
}

export default home;