import { Component, Input, OnInit, ViewChild,} from '@angular/core';
import { ProgressSpinnerMode, ThemePalette } from '@angular/material';


@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
  @Input() color?: ThemePalette;
  @Input() diameter?: number = 45;
  @Input() mode?: ProgressSpinnerMode;
  @Input() strokeWidth?: number;
  @Input() value?: number;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean;


  constructor() { }
  
}