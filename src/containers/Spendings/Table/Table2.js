import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './Table.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Toolbar from './TableToolbar/TableToolbar';
import TableHead from './TableHead/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';

class Table2 extends Component {
    state ={
        order: 'asc',
        orderBy: 'date',
        selected: [],
        page: 0,
        rowsPerPage: 5
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
          this.setState(state => ({ selected: this.props.spendings.map(n => n.id) }));
          return;
        }
        this.setState({ selected: [] });
    };
    
    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = cmp(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    getCell = (spend) => {
        let cells = [];
        Object.keys(spend).forEach((k,i) => {
            if(k !== 'user' && k !== 'id'){
                cells.push( <TableCell key={i}>{spend[k]}</TableCell>)
            }
        })
        return cells;
    }

    deleteHandler = () => {
        console.log('delete click')
    }

    render() {    
        const { order, orderBy, selected, rowsPerPage, page } = this.state;    
        let emptyRows = 0;
        const columns = this.props.columns;
        let spendings = this.props.spendings;
        const acc = this.props.accounts;
        const cats = this.props.cats;
        let table = <h3>No data</h3>;
        if(spendings && columns && acc && cats){
            spendings = spendings.map(s => {
                return {
                    ...s, 
                    category: cats[cats.findIndex(c=> c.id === s.category)].name,
                    account: acc[acc.findIndex(a => a.id === s.account)].name
                }
            });
            console.log(spendings)
            emptyRows = rowsPerPage - Math.min(rowsPerPage, spendings.length - page * rowsPerPage);
            table = <Paper className={classes.root}>
                <Toolbar numSelected={selected.length} deleteHandler={this.deleteHandler}/>        
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={spendings.length}
                            rows = {columns}
                        >
                    </TableHead>
                    <TableBody>
                        {this.stableSort(spendings, this.getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                            const isSelected = this.isSelected(n.id);
                            return (
                                <TableRow
                                    hover
                                    onClick={event => this.handleClick(event, n.id)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={n.id}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isSelected} />
                                    </TableCell>
                                    {this.getCell(n)}
                                </TableRow>
                            )
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={spendings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                    'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                    'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
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