import { TestBed } from '@angular/core/testing';

import { CrmdatarefreshService } from './crmdatarefresh.service';

describe('CrmdatarefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrmdatarefreshService = TestBed.get(CrmdatarefreshService);
    expect(service).toBeTruthy();
  });
});
