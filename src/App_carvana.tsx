import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ILargeTextEditorParams,
    ISelectCellEditorParams,
    ITextCellEditorParams,
  } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import  ModelCellRenderer from './modelRenderer';

const makes = ['Acura', 'Chevrolet', 'Dodge', 'Fiat', 'Ford', 'Toyota', 'Nissan'];
const models = ['Integra', 'Volt', 'Charger', '500', 'F-150', 'Camry', "Altima"];
const prices = [30000, 40000, 56000, 20000, 35000, 28000, 23000] ; 
const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023]
const milages = [0, 100, 4000, 15000, 30000, 50000, 200000, 130000]; 
const owners = [0, 1, 2]; 

const data = Array.from(Array(21).keys()).map((val: any, index: number) => ({
  make: makes[index % 7],
  model: models[index % 7],
  year: years[index % 7],
  price: prices[index % 7],
  milage: milages[index % 7],
  owners: owners[index % 3],
  description: 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}));

function App() {
  const [gridApi, setGridApi] = useState(null); 
  const [gridColumnApi, setGridColumnApi] = useState(null); 
  const [hideColumn,setHideColumn] = useState(false); 
  const [rowData, setRowData] = useState<any[]>(data);
  const [columnDefs, setColumnDefs] = useState([
      {
        field: '', 
        resizable: false,
        editable: false,
        checkboxSelection: true,
        rowDrag: true,
        maxWidth: 70,
      },
      { 
        field: 'make', 
        sortable: true, 
        filter: true,
        singleClickEdit: true, 
        cellRenderer: ModelCellRenderer,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: makes,
        } as ISelectCellEditorParams,
        hide: false, 
      },
      { 
        field: 'model', 
        sortable: true, 
        filter: true,
        singleClickEdit: true, 
        cellRenderer: ModelCellRenderer,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: models,
        } as ISelectCellEditorParams,
      },
      { 
        field: 'year', 
        sortable: true, 
        filter: true, 
        editable: false,
      },
      { 
        field: 'price', 
        sortable: true, 
        singleClickEdit: true,
        cellEditor: 'agTextCellEditor',
        cellEditorParams: {
          maxLength: 7,
        } as ITextCellEditorParams,
        filter: true, 
      },
      { 
        field: 'milage', 
        sortable: true, 
        filter: true, 
        editable: false, 
      },
      { 
        field: 'owners', 
        sortable: true,
        editable: false,
        minWidth: 100, 
      },
      { 
        field: 'description',
        cellEditorPopup: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: {
        maxLength: 250,
        rows: 10,
        cols: 50,
      } as ILargeTextEditorParams,
      flex: 2,
      },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
      return {
        flex: 0.5, 
        resizable: true,
        editable: true,
        minWidth: 110,
      };
    }, []);

  function onGridReady(params) {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
  }
  const showColumn=()=>{
    gridColumnApi.setColumnVisible('make', hideColumn)
    setHideColumn(!hideColumn)
  }

  return (
    <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
      <button onClick={showColumn}> show make </button>
        <AgGridReact
            onGridReady={onGridReady}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowDragManaged={true}
            animateRows={true}
        ></AgGridReact>
    </div>
  );
};
export default App; 
