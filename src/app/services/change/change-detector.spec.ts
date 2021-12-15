import { TestBed } from '@angular/core/testing';

import { ChangeDetectorService } from './change-detector.service';

describe('ChangeDetectorService', () => {
  let service: ChangeDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeDetectorService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
