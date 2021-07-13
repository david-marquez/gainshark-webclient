import { TestBed } from '@angular/core/testing';

import { UserHandoffServiceService } from './user-handoff-service.service';

describe('UserHandoffService', () => {
  let service: UserHandoffServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHandoffServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
