import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadangeladminComponent } from './leadangeladmin.component';

describe('LeadangeladminComponent', () => {
  let component: LeadangeladminComponent;
  let fixture: ComponentFixture<LeadangeladminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadangeladminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadangeladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
