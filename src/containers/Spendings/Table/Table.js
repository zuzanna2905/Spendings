import React, {Fragment} from "react";
import ReactDataGrid from "react-data-grid";
import { Data, Toolbar, Editors } from "react-data-grid-addons";
import classes from './Table.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import logo from '../../../assets/images/logo.jpg';
const {DropDownEditor} = Editors; 
const Selectors = Data.Selectors;

class Table extends React.Component {
    state = {
        filters: null,
        selectedIndexes: []
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        if('category' in updated){
            updated = {
                category: this.props.cats[this.props.cats.findIndex(c=> c.name === updated.category)].id
            }
        }
        if('account' in updated){
            updated = {
                account: this.props.accounts[this.props.accounts.findIndex(c=> c.name === updated.account)].id
            }
        }
        let newSpendings = this.props.spendings;
        const rows = newSpendings.slice();
        let updatedRow;
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated};
            updatedRow = rows[i];
        }
        this.props.updateData(rows, updatedRow);
    };
    
    sortRows = (initialRows, sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === "ASC") {
                return parseInt(a[sortColumn]) > parseInt(b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === "DESC") {
                return parseInt(a[sortColumn]) < parseInt(b[sortColumn]) ? 1 : -1;
            }};
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
        return Selectors.getRows({ rows, filters });
    }

    getValidFilterValues = (rows, columnId) => {
        return rows
          .map(r => r[columnId])
          .filter((item, i, a) => {
            return i === a.indexOf(item);
          });
    }

    setEditor = (c) => {
        const acc = this.props.accounts;
        const cats = this.props.cats;
        if(c.key === 'account'){     
            let optionsAcc = acc ? acc.map(a => {
                return {
                    id: a.id,
                    value: a.name
                }}) : null;
            const AccountTypeEditor = <DropDownEditor options={optionsAcc} />  
            return AccountTypeEditor
        }
        if(c.key === 'category'){    
            let optionsCat = cats ? cats.map(c => {
                return {
                    id: c.id,
                    value: c.name
                }}) : null;
            const CategoryTypeEditor = <DropDownEditor options={optionsCat} />
            return CategoryTypeEditor
        }
        return null
    }

    EmptyRowsView = () => {
        const message = "No data to show";
        return (
          <div style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}>
            <h3>{message}</h3>
            <img src={logo} alt={message} />
          </div>
        );
    }

    onRowsSelected = rows => {
        const newSelected = this.state.selectedIndexes.concat(
            rows.map(r => r.rowIdx)
        )
        this.setState({
            selectedIndexes: newSelected
        });
        console.log(newSelected)
    };

    onRowsDeselected = rows => {
        let rowIndexes = rows.map(r => r.rowIdx);
        const newSelected =  this.state.selectedIndexes.filter(
            i => rowIndexes.indexOf(i) === -1
        )
        this.setState({
            selectedIndexes: newSelected
        });
    };

    onDeleteHandler = () => {

    }

    render() {
        const _spendings = this.props.spendings;
        const cats = this.props.cats;
        const acc = this.props.accounts;
        const cols = this.props.columns;
        let table = <h3>Failed to load data</h3>;
        if(_spendings && cats && acc && cols){
            const columns = cols.map(c => {
                return {
                    ...c,
                    editor: this.setEditor(c)
                }
            });
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
            <Fragment>
            <ReactDataGrid
                rowKey = 'id'
                columns={columns}
                rowGetter={i => filteredRows[i]}
                rowsCount={spendings.length}
                rowSelection={{
                    showCheckbox: true,
                    enableShiftSelect: true,
                    onRowsSelected : this.onRowsSelected,
                    onRowsDeselected: this.onRowsDeselected,
                    selectBy: {
                      indexes: this.state.selectedIndexes
                    }
                  }}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={filter => this.handleFilterChange(filter)}
                onGridRowsUpdated={this.onGridRowsUpdated}      
                onGridSort={(sortColumn, sortDirection) =>
                    this.props.updateData(this.sortRows(spendings, sortColumn, sortDirection))
                }
                enableCellSelect={true}
                onClearFilters={() => this.setState({filters: {}})}
                getValidFilterValues={key => this.getValidFilterValues(filteredRows, key)}
                emptyRowsView={this.EmptyRowsView}
            />
            <button>Delete selected rows</button>
            </Fragment>
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
        updateData: (spendings, row) => dispatch(actions.updateData(spendings, row))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);