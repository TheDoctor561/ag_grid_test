import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    Grid,
    GridOptions,
    ILargeTextEditorParams,
    IRichCellEditorParams,
    ISelectCellEditorParams,
    ITextCellEditorParams,
  } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import  ModelCellRenderer from './modelRenderer';
const models = ['Celica', 'Mondeo', 'Boxster']; 

function App() {
    const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);

    const [columnDefs, setColumnDefs] = useState([
        { 
          field: 'make', 
          sortable: true, 
          filter: true, 
          rowDrag: true, 
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
        { field: 'price', sortable: true, filter: true }
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
          flex: 1,
          resizable: true,
          editable: true,
        };
      }, []);
    

    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
            <AgGridReact
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
