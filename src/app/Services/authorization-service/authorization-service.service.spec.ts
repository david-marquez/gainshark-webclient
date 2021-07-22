import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization-service.service';

describe('ApiServiceService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
