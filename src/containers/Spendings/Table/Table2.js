import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import {
	SortingState, EditingState, PagingState, SummaryState,
	IntegratedPaging, IntegratedSorting, IntegratedSummary,
	DataTypeProvider, FilteringState, IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
	Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn,
	PagingPanel, DragDropProvider, TableColumnReordering,
	TableFixedColumns, TableSummaryRow, TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	lookupEditCell: {
		paddingTop: theme.spacing.unit * 0.875,
		paddingRight: theme.spacing.unit,
		paddingLeft: theme.spacing.unit,
	},
		dialog: {
		width: 'calc(100% - 16px)',
	},
		inputRoot: {
		width: '100%',
	},
});

const AddButton = ({ onExecute }) => (
	<div style={{ textAlign: 'center' }}>
		<Button
		color="primary"
		onClick={onExecute}
		title="Create new row"
		>
		New
		</Button>
	</div>
);

const EditButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Edit row">
		<EditIcon />
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (
	<IconButton	onClick={() => {
		if (window.confirm('Are you sure you want to delete this row?')) {
		onExecute();
	}}} title="Delete row"
	>
		<DeleteIcon />
	</IconButton>
);

const CommitButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Save changes">
		<SaveIcon />
	</IconButton>
);

const CancelButton = ({ onExecute }) => (
	<IconButton color="secondary" onClick={onExecute} title="Cancel changes">
		<CancelIcon />
	</IconButton>
);

const commandComponents = {
	add: AddButton,
	edit: EditButton,
	delete: DeleteButton,
	commit: CommitButton,
	cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
	const CommandButton = commandComponents[id];
	return (
		<CommandButton
		onExecute={onExecute}
		/>
	);
};

const LookupEditCellBase = ({ availableColumnValues, value, onValueChange, classes, }) => (
	<TableCell className={classes.lookupEditCell} >
		<Select
			value={value}
			onChange={event => onValueChange(event.target.value)}
			input={(
			<Input
				classes={{ root: classes.inputRoot }}
			/>
			)}
		>
			{availableColumnValues.map(item => (
			<MenuItem key={item.id} value={item.id}>
				{item.name}
			</MenuItem>
			))}
		</Select>
	</TableCell>
);
export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const NumericEditor = ({ value, onValueChange }) => (
	<TextField
		id="standard-number"
		label="Value"
		value={value}
		onChange={event => onValueChange(parseInt(event.target.value))}
		type="number"
		InputLabelProps={{
		shrink: true,
		}}
	/>
);

const NumericTypeProvider = props => (
	<DataTypeProvider
	editorComponent={NumericEditor}
		{...props}
	/>
);

const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

const DateEditor = ({value, onValueChange }) => (
	<TextField
	id="date"
	label="Date"
	type="date"
	onChange={event => onValueChange(event.target.value)}
	defaultValue={value}
	InputLabelProps={{
	shrink: true,
	}}
	/>
)

const DateTypeProvider = props => (
	<DataTypeProvider
	formatterComponent={DateFormatter}
	editorComponent={DateEditor}
		{...props}
	/>
);

const Cell = (props) => {
	return <Table.Cell {...props} />;
};

const getRowId = row => row.id;

class Table2 extends React.PureComponent {
	state = {
		columns: [
		{ name: 'value', title: 'Value', dataType: 'numeric' },
		{ name: 'date', title: 'Date', datType: 'date' },
		{ name: 'account', title: 'Account' },
		{ name: 'category', title: 'Category' },
		{ name: 'name', title: 'Name' },
		{ name: 'description', title: 'Description' },
		],
		numericColumns: ['value'],
		dateColumns: ['date'],
        filters: [{ columnName: 'account', value: '' }],
		sorting: [{ columnName: 'date', direction: 'desc' }],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {},
		currentPage: 0,
		pageSize: 10,
		pageSizes: [5, 10, 15, 30, 0],
		columnOrder: ['value', 'date', 'account', 'category', 'name', 'description'],
		leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
		totalSummaryItems: [
		{ columnName: 'value', type: 'sum' },
		{ columnName: 'date', type: 'count' },
		]
	}

	editCell = (props) => {
		const { column } = props;
		if (column.name === 'category') {
			return <LookupEditCell {...props} availableColumnValues={this.props.cats} />;
		}
		if(column.name === 'account'){
			return <LookupEditCell {...props} availableColumnValues={this.props.accounts} />;
		}
		return <TableEditRow.Cell {...props} />;
	};

    changeFilters = filters => this.setState({ filters });
	changeSorting = sorting => this.setState({ sorting });
	changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
	changeAddedRows = addedRows => this.setState({
		addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
		value: 10,
		date: new Date().toISOString().split('T')[0],
		account: this.props.accounts[0],
		category: this.props.cats[0],
		name: '',
		description: ''
		})),
	});
	changeRowChanges = rowChanges => this.setState({ rowChanges });
	changeCurrentPage = currentPage => this.setState({ currentPage });
	changePageSize = pageSize => this.setState({ pageSize });
	commitChanges = ({ added, changed, deleted }) => {
	if (added) {
		added = {
			...added[0],
			id: 0,
			user: this.props.userId,
		}
		this.props.addSpending(this.props.token, added)
	}
	if (changed) {
		let row = this.props.spendings.filter(s => changed[s.id])
		const updated = {
			...row[0],
			...changed[row[0].id]
		}
		this.props.updateData(this.props.token, updated.id , updated)
	}
	if (deleted) {
		this.props.deleteData(this.props.token, deleted[0])
		}
	};
	changeColumnOrder = (order) => {
	this.setState({ columnOrder: order });
	}

render() {
	const { columns, tableColumnExtensions, sorting, editingRowIds, addedRows, rowChanges,
			currentPage, pageSize, pageSizes, columnOrder, leftFixedColumns, totalSummaryItems,
			numericColumns, dateColumns, filters } = this.state;
	const spendings = this.props.spendings;
	const acc = this.props.accounts;
	const cats = this.props.cats;
	let table = <p>No data</p>
	if(spendings && acc && cats) {
		const rows = spendings.map(s => {
            return {
                ...s, 
                category: cats.findIndex(c=> c.id === s.category) !== -1 ? cats[cats.findIndex(c=> c.id === s.category)].name : 'none',
                account: acc.findIndex(a => a.id === s.account) !== -1 ? acc[acc.findIndex(a => a.id === s.account)].name : 'none'
            }
        });
		table =
		<Paper>
			<Grid
				rows={rows}
				columns={columns}
				getRowId={getRowId}
			>
				<SortingState
					sorting={sorting}
					onSortingChange={this.changeSorting}
				/>
				<PagingState
					currentPage={currentPage}
					onCurrentPageChange={this.changeCurrentPage}
					pageSize={pageSize}
					onPageSizeChange={this.changePageSize}
				/>
				<NumericTypeProvider
					for={numericColumns}
				/>
				<DateTypeProvider 
					for={dateColumns}
				/>
				<EditingState
					editingRowIds={editingRowIds}
					onEditingRowIdsChange={this.changeEditingRowIds}
					rowChanges={rowChanges}
					onRowChangesChange={this.changeRowChanges}
					addedRows={addedRows}
					onAddedRowsChange={this.changeAddedRows}
					onCommitChanges={this.commitChanges}
				/>
				<SummaryState
					totalItems={totalSummaryItems}
				/>
				
				<FilteringState
				filters={filters}
				onFiltersChange={this.changeFilters}
				/>

				<IntegratedFiltering />
				<IntegratedSorting />
				<IntegratedPaging />
				<IntegratedSummary />

				<DragDropProvider />

				<Table
					columnExtensions={tableColumnExtensions}
					cellComponent={Cell}
				/>
				<TableColumnReordering
					order={columnOrder}
					onOrderChange={this.changeColumnOrder}
				/>
				<TableHeaderRow showSortingControls />
				<TableFilterRow />
				<TableEditRow
					cellComponent={this.editCell}
				/>
				<TableEditColumn
					width={170}
					showAddCommand={!addedRows.length}
					showEditCommand
					showDeleteCommand
					commandComponent={Command}
				/>
				<TableSummaryRow />
				<TableFixedColumns
					leftColumns={leftFixedColumns}
				/>
				<PagingPanel
					pageSizes={pageSizes}
				/>
			</Grid>
		</Paper>
	}
	return (
		<div>{table}</div>
	)
	}
}

const mapStateToProps = state => {
	return {
		spendings: state.spend.spendings,
		columns: state.spend.columns,
		cats: state.spend.categories,
		accounts: state.prof.accounts,
		token: state.sess.token,
		userId: state.sess.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateData: (token, spendingId, spending) => dispatch(actions.updateData(token, spendingId, spending)),
		addSpending: (token, spending) => dispatch(actions.addSpending(token, spending)),
		deleteData: (token, spendingId) => dispatch(actions.deleteData(token, spendingId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Table2);