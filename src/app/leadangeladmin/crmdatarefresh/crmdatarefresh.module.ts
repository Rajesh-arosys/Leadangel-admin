import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmdatarefreshRoutingModule } from './crmdatarefresh-routing.module';
import { CrmdatarefreshComponent } from './crmdatarefresh.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';

import {
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule} 
from '@angular/material';
import { CommonDialogModule } from 'src/app/common/common-dialog/common-dialog.module';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';
import { CustomNotificationModule } from 'src/app/common/custom-notification/custom-notification.module';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';
import { CrmdatarefreshService } from './crmdatarefresh.service';


@NgModule({
  declarations: [CrmdatarefreshComponent],
  imports: [
  CommonModule,
  MatMenuModule,
  CustomNotificationModule,
  ProgressSpinnerModule,
  MatSelectModule,
  MatButtonModule,
  MatTableModule,
  DataTableFilterModule,
  DataTableModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule,
  AdminDialogModule,
  CrmdatarefreshRoutingModule
  ],
  providers:[CrmdatarefreshService],
})




export class CrmdatarefreshModule { }
