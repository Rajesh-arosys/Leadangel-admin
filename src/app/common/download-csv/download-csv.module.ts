import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadCsvComponent } from './download-csv.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';

export{ DownloadCsvComponent } from './download-csv.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ProgressSpinnerModule
  ],
  declarations: [DownloadCsvComponent],
  exports:[DownloadCsvComponent]
})
export class DownloadCsvModule { }
