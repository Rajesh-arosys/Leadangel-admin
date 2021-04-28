import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table'
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { DataTableFilterComponent } from 'src/app/common/data-table/filter/data-table-filter.component';
import { DownloadCsvComponent } from 'src/app/common/download-csv/download-csv.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-role-and-action-setting',
  templateUrl: './role-and-action-setting.component.html',
  styleUrls: ['./role-and-action-setting.component.scss'],
  providers:[DataTableComponent, DataTableFilterComponent,DownloadCsvComponent,DatePipe]

})
export class RoleAndActionSettingComponent implements OnInit {
 
  displayedColumns: string[] = ['moduleaction', 'admin', 'standardUser', 'readonlyuser'];
  dataSource = ELEMENT_DATA;
  data: string[] = ['Create',
    'Edit',
    'Move',
    'Delete',
    'Create Folder',
    'Delete Folder',
    'Rename Object',
    'Rename Folder'];
  constructor(private fromBuilder: FormBuilder) { }

  SelectClient: any = [];
  SelectModule:any=[]
  
  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder:'Select  Client',
    limitTo: 3,
    searchOnKey: 'name',
    clearOnSelection: true
  };
  configmodule={
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    placeholder:'Select Module',
    limitTo: 3,
    searchOnKey: 'name',
    clearOnSelection: true
  }
  selectedOptions = [
    {
      _id: "1",
      index: 0,
     
      name: "Burns Dalton",
    },
    {
      _id: "5a66d6c3657e60c6073a2d22",
      index: 1,
    
      name: "Mcintyre Lawson",
    },
  ];
  options = [
    {
      _id: "5a66d6c31d5e4e36c7711b7a",
      index: 0,
     
      name: "Burns Dalton",
    },
    {
      _id: "5a66d6c3657e60c6073a2d22",
      index: 1,
    
      name: "Mcintyre Lawson",
    },
    {
      _id: "5a66d6c376be165a5a7fae33",
      index: 2,
     
      name: "Amie Franklin",
    },
    {
      _id: "5a66d6c3f7854b6b4d96333b",
      index: 3,
    
      name: "Jocelyn Horton",
    },
    {
      _id: "5a66d6c31f967d4f3e9d84e9",
      index: 4,
     
      name: "Fischer Erickson",
    },
    {
      _id: "5a66d6c34cfa8cddefb31602",
      index: 5,
    
      name: "Medina Underwood",
    },
    {
      _id: "5a66d6c3d727c450794226de",
      index: 6,
      name: "Goldie Barber",
    },
  ];
  resetOption: any;
  selectForm: FormGroup;
 
  ngOnInit() {
    this.resetOption = [this.options[0]];
    // this.exampleDataTable()
 
  }
  selectionChanged($event: any) {
     console.log($event);
  }

  searchChange($event) {
    console.log($event);
  }
  
  reset() {
    this.resetOption = [];
  }
  onAdminAction(element){
    console.log(element)
  }
  onstanderdAdminAction(element){
    console.log(element)
  }
  onReadOnlyAdminAction(element){
    console.log(element)
  }



// // hari dynamic table

//   columnHeader : any = []
//   tableData    : any = []

//   exampleDataTable(){
//     let Actions=['Edit','Delete']
//     this.columnHeader =this.columnHeader2
//     this.tableData = this.tableData2
//     this.tableData.forEach(element => {
//       element.Actions=Actions
//     });
//   }

//   columnHeader1 = {'studentID1': 'ID 1', 'fname1': 'First Name 1'};
//   tableData1= [
//     {studentID1: 1, fname1: 'Hydrogen'},
//     {studentID1: 2, fname1: 'Helium'},
//     {studentID1: 3, fname1: 'Lithium'},
//     {studentID1: 4, fname1: 'Beryllium'},

//   ];

//   columnHeader2 = {'studentID1': 'ID 1', 'fname1': 'First Name 1', 'weight1': 'Weight 1', 'symbol1': 'Symbol 1','Action':'Action'};
//   tableData2 = [
//     {studentID1: 1, fname1: 'Hydrogen', weight1: 1.0079, symbol1: 'H'},
//     {studentID1: 2, fname1: 'Helium', weight1: 4.0026, symbol1: 'He'},
//     {studentID1: 3, fname1: 'Lithium', weight1: 6.941, symbol1: 'Li'},
//     {studentID1: 4, fname1: 'Beryllium', weight1: 9.0122, symbol1: 'Be'},
//     {studentID1: 5, fname1: 'Boron', weight1: 10.811, symbol1: 'B'},
//     {studentID1: 6, fname1: 'Carbon', weight1: 12.0107, symbol1: 'C'},
//     {studentID1: 7, fname1: 'Nitrogen', weight1: 14.0067, symbol1: 'N'},
//     {studentID1: 8, fname1: 'Oxygen', weight1: 15.9994, symbol1: 'O'},
//     {studentID1: 9, fname1: 'Fluorine', weight1: 18.9984, symbol1: 'F'},
//     {studentID1: 10, fname1: 'Neon', weight1: 20.1797, symbol1: 'Ne'},
//   ];

// 



}

export interface PeriodicElement {
  moduleaction: string;
  adminaction:boolean;
  standarduser:boolean;
  readonlyduser:boolean
  
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {moduleaction:'Create',adminaction:true,standarduser:true,readonlyduser:false},
  {moduleaction:'Edit',adminaction:true,standarduser:true,readonlyduser:false},
  {moduleaction:'Move',adminaction:true,standarduser:false,readonlyduser:false},
  {moduleaction:'Delete',adminaction:false,standarduser:true,readonlyduser:true},
  {moduleaction:'Create Folder',adminaction:true,standarduser:true,readonlyduser:false},
  {moduleaction:'Delete Folder',adminaction:true,standarduser:true,readonlyduser:false},
  {moduleaction:'Rename Object',adminaction:true,standarduser:true,readonlyduser:false},
  {moduleaction:'Rename Folder',adminaction:true,standarduser:true,readonlyduser:false},
 
];
