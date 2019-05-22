import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import {
	SortingState, EditingState, PagingState, SummaryState,
	IntegratedPaging, IntegratedSorting, IntegratedSummary,
	DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
	Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn,
	PagingPanel, DragDropProvider, TableColumnReordering,
	TableFixedColumns, TableSummaryRow,
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
			<MenuItem key={item} value={item}>
				{item}
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
		],
		availableValues : {
			category : [1, 2, 3, 4],
			account: ['melo']
		}
	}

	editCell = (props) => {
		const { column } = props;
		const availableColumnValues = this.state.availableValues[column.name];
		if (availableColumnValues) {
			return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
		}
		return <TableEditRow.Cell {...props} />;
	};

	changeSorting = sorting => this.setState({ sorting });
	changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
	changeAddedRows = addedRows => this.setState({
		addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
		value: 10,
		date: new Date().toISOString().split('T')[0],
		account: this.state.availableValues.account[0],
		category: this.state.availableValues.category[0],
		name: 'biedronka',
		description: 'fruits'
		})),
	});
	changeRowChanges = rowChanges => this.setState({ rowChanges });
	changeCurrentPage = currentPage => this.setState({ currentPage });
	changePageSize = pageSize => this.setState({ pageSize });
	commitChanges = ({ added, changed, deleted }) => {
	if (added) {
		added = {
			...added[0],
			category: parseInt(added[0].category),
			id: 0,
			user: this.props.userId,
			value: parseInt(added[0].value)
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
			numericColumns, dateColumns } = this.state;
	const rows = this.props.spendings;
	let table = <p>No data</p>
	if(rows) {
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
		token: state.sess.token
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