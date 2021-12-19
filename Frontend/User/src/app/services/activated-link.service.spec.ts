import { TestBed } from '@angular/core/testing';

import { ActivatedLinkService } from './activated-link.service';

describe('ActivatedLinkService', () => {
  let service: ActivatedLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivatedLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
