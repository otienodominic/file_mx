import React, { Fragment, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useGlobalFilter, 
  useAsyncDebounce
} from 'react-table';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { Filter  } from './Filters';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  // const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
  }, 200)

  return (
      <span>
          Search:{' '}
          <input
              className="form-control"
              value={value || ""}
              onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
              }}
              placeholder={` records...`}
          />
      </span>
  )
}

 const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search (${length}) ...`}
    />
  );
};

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const defaultColumn = useMemo(
    () => ({
        // Default Filter UI
        Filter: DefaultColumnFilter,
    }),
    []
)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {/* {generateSortingIndicator(column)} */}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            color='primary'
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            type='number'
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <CustomInput
            type='select'
            value={pageSize}
            onChange={onChangeInSelect}
          >            
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CustomInput>
        </Col>
        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TableContainer;