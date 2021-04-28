import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule,MatMenuModule,MatSlideToggleModule } from '@angular/material';
import { FeatureMenuRoutingModule } from './feature-menu-routing.module';
import { FeatureMenuComponent } from './feature-menu.component';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
@NgModule({
  declarations: [FeatureMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,   
    MatIconModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatTableModule, 
    MatToolbarModule,
    MatMenuModule,
    FeatureMenuRoutingModule,
    MatSlideToggleModule,
    AdminDialogModule
  ]
})
export class FeatureMenuModule { }
