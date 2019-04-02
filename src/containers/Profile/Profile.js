import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Profile.css';
import Accounts from './Accounts/Accounts';
import * as actions from '../../store/actions/index';

class Profile extends Component {
    componentWillMount () {
        this.props.onFetchAccounts();
    }

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
        profile: state.prof.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccounts: () => dispatch(actions.fetchAccounts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);