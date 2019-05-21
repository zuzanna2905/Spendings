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
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

const getRowId = row => row.id;

class Demo extends React.PureComponent {
    state = {
        editingStateColumnExtensions: [
            { columnName: 'name', editingEnabled: false },
        ],
        sorting: [{ columnName: 'city', direction: 'asc' }],
        pageSizes: [5, 10, 15, 0],
    }

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
    const {editingStateColumnExtensions, sorting, pageSizes } = this.state;
    const columns = this.props.columns;
    const rows = this.props.spendings;
    let table = <p>No data</p>;
    if (columns && rows){
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
            <EditingState
                onCommitChanges={this.commitChanges}
                defaultEditingRowIds={[0]}
                columnExtensions={editingStateColumnExtensions}
            />
            <Table />
            <TableHeaderRow showSortingControls/>
            <TableEditRow />
            <TableEditColumn
                showAddCommand
                showEditCommand
                showDeleteCommand
            />          
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