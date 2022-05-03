import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcar from './Addcar';

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
      if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE' })
        .then(res => fetchData())
        .catch(err => console.error(err))
      }
    }
    //mandatory params: columns and data?

    const columns = [
      { headerName: 'Brand', field: 'brand', sortable: true, filter: true },
      { headerName: 'Model', field: 'model', sortable: true, filter: true },
      { headerName: 'Color', field: 'color', sortable: true, filter: true },
      { headerName: 'Fuel', field: 'fuel', sortable: true, filter: true },
      { headerName: 'Year', field: 'year', sortable: true, filter: true },
      { headerName: 'Price', field: 'price', sortable: true, filter: true },
      { headerName: '', maxWidth: 100, field: '_links.self.href', 
      cellRenderer: (params) => <Button color="error" size="small" onClick={() => deleteCar(params.value)}>Delete</Button> }
    ]

    return (
      <div>
        <Addcar />
        <div className='ag-theme-material'
        style={{
          height: '700px',
          width: '100%',
          margin: 'auto'}}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={cars}
            rowSelection='single'
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
          >
          </AgGridReact>
        </div>
      </div>  
    );
}