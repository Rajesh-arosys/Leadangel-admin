import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindailogComponent } from './admindailog.component';

describe('AdmindailogComponent', () => {
  let component: AdmindailogComponent;
  let fixture: ComponentFixture<AdmindailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
