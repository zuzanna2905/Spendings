import React from "react";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
const cat = 'http://localhost:3001/categories';
const { DropDownEditor } = Editors;

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            categoryTypes : []
        }
    }

    loadCategories = () => {
        fetch(cat, {
          method: 'get',
          headers: {'Content-Type' : 'application/json'}
        })
        .then(response => response.json())
        .then(categories => {
            const categoryTypes = categories.map(c => {
                return {
                    id: c.id,
                    value: c.category
                }
            })
            this.setState({categoryTypes: categoryTypes})
        })
    }

    componentDidMount = () => {
        this.loadCategories();
    }

    CategoryTypeEditor = () => {
        return <DropDownEditor options={this.state.categoryTypes} />
    }

    getColumns = () => {
        return [
            { key: 'name', name: 'Name', editable:true,resizable: true },
            { key: 'category', name: 'Category' , editable:true, resizable: true, editor: this.CategoryTypeEditor()},
            { key: 'value', name: 'Value' , editable:true,resizable: true, sortable:true},
            { key: 'date', name: 'Date', editable:true,resizable: true},
            { key: 'account', name: 'Account', editable:true,resizable: true}
        ]
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
            columns={this.getColumns()}
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