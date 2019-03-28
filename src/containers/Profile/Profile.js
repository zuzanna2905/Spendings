import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Profile.css';
import Accounts from './Accounts/Accounts';

class Profile extends Component {
    render() {
        return (
            <div className={classes.Profile}>
                <h1>PROFILE</h1>
                <div>
                    <h3>Your personal data</h3>
                    <div className={classes.Data}>
                        <p><span>Name:</span> {this.props.profile.name}</p>
                        <p><span>Age:</span> {this.props.profile.age}</p>
                        <p><span>Email:</span> {this.props.profile.email}</p>
                    </div>
                </div>
                <Accounts/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Profile);