import React, { Component } from 'react';
import Account from '../../../components/Account/Account';
import { connect } from 'react-redux';
import NewAccount from '../../../components/NewAccount/NewAccount';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
    root: {
        marginTop: '10px',
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'transparent',
    },
    app: {
        backgroundColor: 'transparent'
    },
    tabs: {
        color: 'white'
    }
});

class Accounts extends Component {
    state = {
        value: 0
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
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
            tabs = this.props.accounts.map(account => <Tab key={account.name} label={account.name} />)
        }
        return (
            <div className={classes.root}>
                <h3>Accounts managing</h3>
                <AppBar position="static" className={classes.app}>
                    <Tabs
                    value={value}
                    onChange={this.handleChange}
                    className={classes.tabs}
                    variant="scrollable"
                    scrollButtons="auto"
                    >
                    <Tab key={0} label='Create New'/>
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

export default  connect(mapStateToProps)(withStyles(styles)(Accounts));