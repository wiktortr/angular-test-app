import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

interface RowData {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: 'app-grid-page',
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.scss'],
})
export class GridPageComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs = [
    {
      headerName: 'Make',
      field: 'make',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
  ];

  test:ColDef[] = []

  rowData: Observable<any>;
  text:string = '';

  constructor(private http: HttpClient) {
    this.rowData = this.http.get('assets/data.json');
  }

  getSelected() {
    let selected = this.agGrid.api
      .getSelectedNodes()
      .map((e) => <RowData>e.data)
      .map((e) => `${e.make} - ${e.model} - ${e.price}`)
      .join('\n');
    this.text = `Selected items:\n${selected}`;
  }
}
