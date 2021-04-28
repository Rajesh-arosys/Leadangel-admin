/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImpersonateService } from './impersonate.service';

describe('Service: Impersonate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpersonateService]
    });
  });

  it('should ...', inject([ImpersonateService], (service: ImpersonateService) => {
    expect(service).toBeTruthy();
  }));
});
