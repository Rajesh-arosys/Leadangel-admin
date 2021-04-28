import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpersonateloginComponent } from './impersonatelogin.component';

describe('ImpersonateloginComponent', () => {
  let component: ImpersonateloginComponent;
  let fixture: ComponentFixture<ImpersonateloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpersonateloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpersonateloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
