import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    //mandatory params: columns and data?

    const columns = [
      { headerName: 'Brand', field: 'brand', sortable: true, filter: true},
      { headerName: 'Model', field: 'model', sortable: true, filter: true},
      { headerName: 'Color', field: 'color', sortable: true, filter: true},
      { headerName: 'Fuel', field: 'fuel', sortable: true, filter: true},
      { headerName: 'Year', field: 'year', sortable: true, filter: true},
      { headerName: 'Price', field: 'price', sortable: true, filter: true}
    ]

    return (
      <div className='ag-theme-material'
      style={{
        height: '700px',
        width: '80%',
        margin: 'auto'}}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={cars}
        >
        </AgGridReact>
      </div>  
    );
}