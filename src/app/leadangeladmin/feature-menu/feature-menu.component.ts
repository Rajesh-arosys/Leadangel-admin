import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service';
import { MatDialog } from '@angular/material';

export interface PeriodicElement {
  serial: number;
  name: string;
  status: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {serial: 1, name: 'ABM Segmentation', status: true},
  {serial: 2, name: 'Contact Router', status: false},
  {serial: 3, name: 'Lead Router', status:true},
  {serial: 4, name: 'Partner Lead Router', status: false}
];


@Component({
  selector: 'app-feature-menu',
  templateUrl: './feature-menu.component.html',
  styleUrls: ['./feature-menu.component.scss']
})

export class FeatureMenuComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(public dialog:MatDialog,public admindailgservice:AadminDailogSevice) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  public  Opendailogbox(actionName:string,popupFrom) {
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
      let options ;
      if (actionName == 'New') {
        options = {
          success:'',
          title:'New Feature Menu ', 
          message: '',
          cancelText: 'Cancel',
          popupFrom:popupFrom,
          confirmText: 'Add',
          dialogtype: actionName,
        }
      } 
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {

      });
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  } 

 

}