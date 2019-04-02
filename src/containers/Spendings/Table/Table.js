import React from "react";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
import classes from './Table.css';
import { connect } from 'react-redux';
const { DropDownEditor } = Editors;

class Table extends React.Component {
    CategoryTypeEditor = () => {
        return <DropDownEditor options={this.props.cats} />
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const spendings = this.props.spendings.slice();
        for (let i = fromRow; i <= toRow; i++) {
            spendings[i] = { ...spendings[i], ...updated };
        }
        this.props.updateData(spendings);
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

    render() {
        const _spendings = this.props.spendings;
        console.log(_spendings);
        const cats = this.props.cats;
        const acc = this.props.accounts;
        const spendings = _spendings.map(s => {
            return {
                ...s, 
                category: cats[cats.findIndex(c=> c.id === s.category)].name
            } 
        });
        let table = <h3>Failed to load data</h3>;
        if(spendings[0]) {
            const updatedDate = Object.keys(spendings).map(key => {
                return {...spendings[key], date: spendings[key].date.slice(0,10)}
            });
            table = <ReactDataGrid
            columns={this.props.columns}
            rowGetter={i => updatedDate[i]}
            rowsCount={spendings.length}
            onGridRowsUpdated={this.onGridRowsUpdated}      
            onGridSort={(sortColumn, sortDirection) =>
                this.props.updateData(this.sortRows(spendings, sortColumn, sortDirection))
            }
            enableCellSelect={true}
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

export default connect(mapStateToProps)(Table);