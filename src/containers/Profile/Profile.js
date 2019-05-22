import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Profile.css';
import Accounts from './Accounts/Accounts';
import * as actions from '../../store/actions/index';

class Profile extends Component {
    componentWillMount () {
        this.props.onFetchAccounts(this.props.token, this.props.userId);
    }

    render() {
        return (
            <div className={classes.Profile}>
                <h1>Accounts managing</h1>
                <div>
                    <Accounts/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        profile: state.prof.profile,
        userId: state.sess.userId,
        token: state.sess.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccounts: (token, userId) => dispatch(actions.fetchAccounts(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);