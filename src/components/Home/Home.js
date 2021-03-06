import React from 'react';
import classes from './Home.css';
import { NavLink } from 'react-router-dom';

const Home = props => {
    return (
        <div className={classes.Home}>
            <div className={classes.Welcome}>
                <h2 className={classes.title}>Manage your spendings</h2>
                <NavLink to='/signup' activeClassName={classes.link}>Sign up</NavLink>
            </div>
        </div>
    );
}

export default Home;