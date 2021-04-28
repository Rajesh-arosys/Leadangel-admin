import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAndActionSettingComponent } from './role-and-action-setting.component';

describe('RoleAndActionSettingComponent', () => {
  let component: RoleAndActionSettingComponent;
  let fixture: ComponentFixture<RoleAndActionSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAndActionSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAndActionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
