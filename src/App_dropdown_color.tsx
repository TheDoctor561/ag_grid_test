import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ILargeTextEditorParams,
  IRichCellEditorParams,
  ISelectCellEditorParams,
  ITextCellEditorParams,
} from 'ag-grid-community';
import ColourCellRenderer from './colourCellRenderer';

const colors = ['Red', 'Green', 'Blue'];

const data = Array.from(Array(20).keys()).map((val: any, index: number) => ({
  color1: colors[index % 3],
  color2: colors[index % 3],
  color3: colors[index % 3],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}));

function App () {
  const [rowData, setRowData] = useState<any[]>(data);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Text Editor',
      field: 'color1',
      cellRenderer: ColourCellRenderer,
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        maxLength: 20,
      } as ITextCellEditorParams,
    },
    {
      headerName: 'Select Editor',
      field: 'color2',
      sortable: true, 
      singleClickEdit: true, 
      cellRenderer: ColourCellRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: colors,
      } as ISelectCellEditorParams,
    },
    {
      headerName: 'Rich Select Editor',
      field: 'color3',
      cellRenderer: ColourCellRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: colors,
      } as ISelectCellEditorParams,
    },
    {
      headerName: 'Large Text Editor',
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
        ></AgGridReact>
      </div>
   
  );
};

export default App; 
