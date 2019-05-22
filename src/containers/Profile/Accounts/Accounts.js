import React, { Component } from 'react';
import Account from '../../../components/Account/Account';
import { connect } from 'react-redux';
import NewAccount from '../../../components/NewAccount/NewAccount';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Accounts.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const TabContainer = props => {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
        );
}

class Accounts extends Component {
    state = {
        value: 0
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        let inputAccount = <NewAccount/>
        let accountsList = <Spinner />
        let tabs = null;
        if(this.props.accounts){
            accountsList = this.props.accounts.map(account => 
                <TabContainer>
                    <Account account={account} key={account.id}/>
                </TabContainer>
            )
            tabs = this.props.accounts.map(account => <Tab key={account.id} label={account.name} />)
        }
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: 'transparent', boxShadow: 'none'}} className={classes.app}>
                    <Tabs
                    value={value}
                    onChange={this.handleChange}
                    className={classes.tabs}
                    variant="scrollable"
                    scrollButtons="auto"
                    >
                    <Tab key={0} style={{backgroundColor: 'green'}} label='Create New'/>
                    {tabs}
                    </Tabs>
                </AppBar>
                {value === 0 && inputAccount}
                {accountsList[value-1]}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        accounts: state.prof.accounts
    }
}

export default  connect(mapStateToProps)(Accounts);