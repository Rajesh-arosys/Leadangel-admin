import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { CommonDialogComponent } from './common-dialog.component';
import { CommonDialogService } from './common-dialog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CommonDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CommonDialogComponent],
  entryComponents: [CommonDialogComponent],
  providers: [CommonDialogService]
})
export class CommonDialogModule { }
