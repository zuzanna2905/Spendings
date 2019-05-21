import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Paper from '@material-ui/core/Paper';
import { 
    EditingState,
    SortingState,
    IntegratedSorting, 
    PagingState,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering,
    SummaryState,
    IntegratedSummary
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableFilterRow,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';

const getRowId = row => row.id;

class Demo extends React.PureComponent {
    state = {
        editingStateColumnExtensions: [
            { columnName: 'name', editingEnabled: false },
        ],
        sorting: [{ columnName: 'date', direction: 'asc' }],
        pageSizes: [5, 10, 15, 0],
        filters: [{ columnName: 'account', value: '' }],
        tableColumnExtensions: [
            { columnName: 'value', align: 'right' },
          ],
        totalSummaryItems: [
            { columnName: 'value', type: 'max' },
            { columnName: 'value', type: 'sum' },
        ],
    }

    changeFilters = filters => this.setState({ filters });
    changeSorting = sorting => this.setState({ sorting });

    commitChanges = ( added, changed, deleted ) => {
    let rows = this.props.spendings;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  }

  render() {
    const {editingStateColumnExtensions, sorting, pageSizes, filters, tableColumnExtensions, totalSummaryItems } = this.state;
    const columns = this.props.columns;
    const spendings = this.props.spendings;
    const cats = this.props.cats;
    const acc = this.props.accounts;
    let table = <p>No data</p>;
    if (columns && spendings && cats && acc){
        const rows = spendings.map(s => {
            return {
                ...s, 
                category: cats[cats.findIndex(c=> c.id === s.category)].name,
                account: acc[acc.findIndex(a => a.id === s.account)].name
            }
        });
        table = <Paper>
            <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            >
            <PagingState
            defaultCurrentPage={0}
            defaultPageSize={5}
            />
            <IntegratedPaging />
            <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
            />
            <IntegratedSorting />
            <FilteringState
            filters={filters}
            onFiltersChange={this.changeFilters}
            />
            <IntegratedFiltering />
            <EditingState
                onCommitChanges={this.commitChanges}
                defaultEditingRowIds={[0]}
                columnExtensions={editingStateColumnExtensions}
            />
            <SummaryState
            totalItems={totalSummaryItems}
            />
            <IntegratedSummary />
            <Table columnExtensions={tableColumnExtensions}/>
            <TableHeaderRow showSortingControls/>
            <TableFilterRow />
            <TableEditRow />
            <TableEditColumn
                showAddCommand
                showEditCommand
                showDeleteCommand
            />
            <TableSummaryRow />          
            <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
      </Paper>
    }
    return (
        <div>{table}</div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Demo);