import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageclientsettingsComponent } from './manageclientsettings.component';

describe('ManageclientsettingsComponent', () => {
  let component: ManageclientsettingsComponent;
  let fixture: ComponentFixture<ManageclientsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageclientsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageclientsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
