import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[input-check]'
})
export class InputCheckDirective {

  constructor(private element:ElementRef) { 
  }

}
