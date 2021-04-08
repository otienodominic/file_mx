// src/components/filter.table.js
import React, { useContext, useState, useEffect, Fragment} from "react";
import { Input, CustomInput, Col, Row, Button, Container, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import { useTable, useFilters, useGlobalFilter, useSortBy,useExpanded, usePagination, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'
import moment from 'moment'



// Define a default UI for filtering
const Filter = ({ column }) => {
    return (
      <div style={{ marginTop: 5 }}>
        {column.canFilter && column.render('Filter')}
      </div>
    );
  };

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
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
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
  
    return (
      <CustomInput
        id='custom-select'
        type='select'
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value=''>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </CustomInput>
    );
  };

function Table({ columns, data, renderRowSubComponent }) {

    const defaultColumn = React.useMemo(
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
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,       
        page,        
        visibleColumns,
        canPreviousPage,
        canNextPage, 
        globalFilter,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize}
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination
    )

    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
      };
    
      const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
      };
    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
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
                            
                        )
                    })}
                </tbody>
            </table>
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


        </div>    )
}





function FilterTableComponent(props) {
    const context = React.useContext(FileContext)    
    const { loading } = useContext(AuthContext)
    const { files, fileFilter, searchFile, getFiles } = context
    const { removeFile, edit_File, clearEdit, updateFile } = useContext(FileContext)
  
    useEffect(() => {
        getFiles()
    },[])

    const renderRowSubComponent = (row) => {
        const {  
          _id,       
          patientName,  
          phoneNumber,  
          dateOfBirth, 
          age, 
          gender,        
          appointmentDate, 
          viralLoad,     
          isBooked
        } = row.original;
        const handleRemove = () => {
          removeFile(_id)
          clearEdit()
        }  
      
        
        const weka =()=>{
          console.log(_id)
          console.log(isBooked)
          props.history.push('/update/'+_id)
          props.history.push({
            patientName,
            appointmentDate, 
            viralLoad,     
            isBooked
          })
      
        }
        
        return (
          <Card style={{ width: '30rem', margin: '0 auto', textAlign: 'left',  }}>        
            <CardBody>
              <CardTitle>
              
              </CardTitle>
              <CardText >
                <strong>Patient Name:  </strong>{patientName} <br />          
                <strong>Age:  </strong>  {dateOfBirth ?  (moment().diff(dateOfBirth, 'years', true)).toFixed(1): age} <br />
                <strong>Gender:   </strong>{gender} <br />
                {/* <strong>Appointment Date:   </strong>{moment(Date.parse(appointmentDate)).format("MMM Do YYYY")} <br /> */}
                <strong>Batch Number:   </strong>{viralLoad} <br />
                 <br />  
                <Button onClick={handleRemove} variant="contained" color="secondary" >Delete</Button>{'  '}
                <Button  color="primary" variant="contained" onClick={weka} >Issue Return Date</Button>    
              </CardText>
            </CardBody>
          </Card>
        );
      };




    const columns = React.useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                  <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? '👇' : '👉'}
                  </span>
                ),
              },            
            {
                Header: 'Patient Number',
                accessor: 'patientNumber',
              },
              {
                Header: 'Patient Name',
                accessor: 'patientName',      
              },
              {
                Header: 'Age',
                accessor: 'age',      
              },    
              {
                Header: 'Batch Number',
                accessor: 'viralLoad',
              },      
        ],
        []
    )

    

    return (
        <Table columns={columns} data={files} renderRowSubComponent={renderRowSubComponent} />
    )
}

export default FilterTableComponent;