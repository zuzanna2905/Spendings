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
                <div>                
                    <h1>PROFILE</h1>
                    <h3>Your personal data</h3>
                    <div className={classes.Data}>
                        {
                            Object.keys(this.props.profile).map(v => {
                                return <p key = {v} ><span>{v}: </span>{this.props.profile[v]}</p>
                            })
                        }
                    </div>
                </div>
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