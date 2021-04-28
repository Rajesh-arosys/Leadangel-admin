import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { DataTableFilterModule } from '../filter/data-table-filter.module';

import { DataTableComponent } from './data-table.component';
import { CustomNotificationModule } from '../../custom-notification/custom-notification.module';
export{DataTableComponent } from './data-table.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
 
  imports: [
    CommonModule,
    MatTableModule,
    CustomNotificationModule,
    MatButtonModule, 
    MatMenuModule,
    MatPaginatorModule,
    MatIconModule,
    DataTableFilterModule,
    ReactiveFormsModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule
    
],
  declarations: [DataTableComponent],
  exports: [
    DataTableComponent
  ],
  // entryComponents: [],
  // providers: []
})
export class DataTableModule { }
