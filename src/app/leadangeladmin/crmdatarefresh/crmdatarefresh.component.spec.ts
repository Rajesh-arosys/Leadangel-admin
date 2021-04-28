import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmdatarefreshComponent } from './crmdatarefresh.component';

describe('CrmdatarefreshComponent', () => {
  let component: CrmdatarefreshComponent;
  let fixture: ComponentFixture<CrmdatarefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmdatarefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmdatarefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
