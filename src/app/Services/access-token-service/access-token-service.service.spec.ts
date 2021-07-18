import { TestBed } from '@angular/core/testing';

import { AccessTokenService } from './access-token-service.service';

describe('TokenAuthenticationServiceService', () => {
  let service: AccessTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
