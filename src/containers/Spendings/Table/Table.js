import React from "react";
import ReactDataGrid from "react-data-grid";
import { Data, Toolbar } from "react-data-grid-addons";
import classes from './Table.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const selectors = Data.Selectors;

class Table extends React.Component {
    state = {
        filters: null,
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        if('category' in updated){
            updated = {
                category: this.props.cats[this.props.cats.findIndex(c=> c.name === updated.category)].id
            }
        }
        let newSpendings = this.props.spendings;
        const rows = newSpendings.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated};
        }
        this.props.updateData(rows);
    };
    
    sortRows = (initialRows, sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === "ASC") {
                return parseInt(a[sortColumn]) > parseInt(b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === "DESC") {
                return parseInt(a[sortColumn]) < parseInt(b[sortColumn]) ? 1 : -1;
            }
            };
        
        return sortDirection === "NONE" ? initialRows : [...this.props.spendings].sort(comparer);
    };

    handleFilterChange = filter => {
        const newFilters = { ...this.state.filters };
        if (filter.filterTerm) {
          newFilters[filter.column.key] = filter;
        } else {
          delete newFilters[filter.column.key];
        }
        this.setState({filters: newFilters})
    };

    getRows = (rows) => {
        const filters = this.state.filters;
        return selectors.getRows({ rows, filters });
    }

    getValidFilterValues = (rows, columnId) => {
        return rows
          .map(r => r[columnId])
          .filter((item, i, a) => {
            return i === a.indexOf(item);
          });
    }

    render() {
        const _spendings = this.props.spendings;
        const cats = this.props.cats;
        const acc = this.props.accounts;
        let table = <h3>Failed to load data</h3>;
        if(_spendings && this.props.columns){
            const spendings = _spendings.map(s => {
                return {
                    ...s, 
                    category: cats[cats.findIndex(c=> c.id === s.category)].name,
                    account: acc[acc.findIndex(a => a.id === s.account)].name
                } 
            });
            const updatedDate = Object.keys(spendings).map(key => {
                return {...spendings[key], date: spendings[key].date.slice(0,10)}
            });
            const filteredRows = this.getRows(updatedDate);
            table = 
            <ReactDataGrid
                columns={this.props.columns}
                rowGetter={i => filteredRows[i]}
                rowsCount={spendings.length}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={filter => this.handleFilterChange(filter)}
                onGridRowsUpdated={this.onGridRowsUpdated}      
                onGridSort={(sortColumn, sortDirection) =>
                    this.props.updateData(this.sortRows(spendings, sortColumn, sortDirection))
                }
                enableCellSelect={true}
                onClearFilters={() => this.setState({filters: {}})}
                getValidFilterValues={key => this.getValidFilterValues(filteredRows, key)}
            />
        }
        return (
            <div className={classes.Table}>
                {table}
            </div>
        );
    }}

const mapStateToProps = state => {
    return {
        spendings: state.spend.spendings,
        columns: state.spend.columns,
        cats: state.spend.categories,
        accounts: state.prof.accounts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateData: (spendings) => dispatch(actions.updateData(spendings))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);