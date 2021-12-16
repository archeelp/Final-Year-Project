import { TestBed } from '@angular/core/testing';

import { ProposeTokenService } from './propose-token.service';

describe('ProposeTokenService', () => {
  let service: ProposeTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposeTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
