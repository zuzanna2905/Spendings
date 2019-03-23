import React from "react";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
const { DropDownEditor } = Editors;

class Table extends React.Component {
    setColumns = () => {
        return [{ key: 'name', name: 'Name', editable:true,resizable: true, sortable:true, type:'string' },
            { key: 'category', name: 'Category' , editable:true, resizable: true, editor: this.CategoryTypeEditor()},
            { key: 'value', name: 'Value' , editable:true,resizable: true, sortable:true, type:'number'},
            { key: 'date', name: 'Date', editable:true,resizable: true},
            { key: 'account', name: 'Account', editable:true,resizable: true}]
    }

    CategoryTypeEditor = () => {
        return <DropDownEditor options={this.props.categoryTypes} />
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
        const {spendings} = this.props;
        return (
        <ReactDataGrid
            columns={this.setColumns()}
            rowGetter={i => spendings[i]}
            rowsCount={spendings.length}
            onGridRowsUpdated={this.onGridRowsUpdated}      
            onGridSort={(sortColumn, sortDirection) =>
                this.props.updateData(this.sortRows(spendings, sortColumn, sortDirection))
            }
            enableCellSelect={true}
        />
        );
    }}

export default Table;