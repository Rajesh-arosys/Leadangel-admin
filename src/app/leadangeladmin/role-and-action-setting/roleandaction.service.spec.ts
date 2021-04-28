/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleandactionService } from './roleandaction.service';

describe('Service: Roleandaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleandactionService]
    });
  });

  it('should ...', inject([RoleandactionService], (service: RoleandactionService) => {
    expect(service).toBeTruthy();
  }));
});
