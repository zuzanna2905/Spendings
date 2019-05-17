import React, { Component } from 'react';
import classes from './Home.css';

class Home extends Component {
    render() {
        return (
            <div className={classes.Home}>
                <div className={classes.Welcome}>
                    <h2 className={classes.title}>Manage your spendings</h2>
                    <button className={classes.button}>Sign up</button>
                </div>
            </div>
        );
    }
}

export default Home;