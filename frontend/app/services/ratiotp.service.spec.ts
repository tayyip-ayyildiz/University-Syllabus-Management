import { TestBed } from '@angular/core/testing';

import { RatiotpService } from './ratiotp.service';
import { HttpClientModule } from '@angular/common/http';

describe('RatiotpService', () => {
  let service: RatiotpService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [RatiotpService]

    });
    service = TestBed.inject(RatiotpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
