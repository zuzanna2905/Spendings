import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './Table.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Table2 extends Component {


    getColumns = () => {
        return this.props.columns.map(col =>
            <TableCell key={col.name}>{col.name}</TableCell>
        )
    }

    getCell = (spend) => {
        let cells = [];
        Object.keys(spend).forEach((k,i) => {
            cells.push( <TableCell key={i}>{spend[k]}</TableCell>)
        })
        return cells;
    }

    render() {
        const columns = this.props.columns;
        const spendings = this.props.spendings;
        let table = <h3>Failed to load data</h3>;
        if(spendings && columns){
            table = <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                    {this.getColumns()}
                </TableRow>
              </TableHead>
              <TableBody>
                {spendings.map(spend => (
                  <TableRow key={spend.id}>
                    {this.getCell(spend)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        }
        return(
            <div>
                {table}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spendings: state.spend.spendings,
        columns: state.spend.columns,
        cats: state.spend.categories,
        accounts: state.prof.accounts,
        userId: state.sess.userId,
        token: state.sess.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateData: (token, spendingId, spending) => dispatch(actions.updateData(token, spendingId, spending))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table2);