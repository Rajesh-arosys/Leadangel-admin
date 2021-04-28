import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadangeluserlistComponent } from './leadangeluserlist.component';

describe('LeadangeluserlistComponent', () => {
  let component: LeadangeluserlistComponent;
  let fixture: ComponentFixture<LeadangeluserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadangeluserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadangeluserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
