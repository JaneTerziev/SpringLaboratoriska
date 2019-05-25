import { TestBed } from '@angular/core/testing';

import { PreloadDataService } from './preload-data.service';

describe('PreloadDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreloadDataService = TestBed.get(PreloadDataService);
    expect(service).toBeTruthy();
  });
});
