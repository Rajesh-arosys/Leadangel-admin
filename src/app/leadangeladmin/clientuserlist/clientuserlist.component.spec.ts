import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientuserlistComponent } from './clientuserlist.component';

describe('ClientuserlistComponent', () => {
  let component: ClientuserlistComponent;
  let fixture: ComponentFixture<ClientuserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientuserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
