import { TestBed } from '@angular/core/testing';

import { ForNivService } from './for-niv.service';
import { HttpClientModule } from '@angular/common/http';

describe('ForNivService', () => {
  let service: ForNivService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [ForNivService]

    });
    service = TestBed.inject(ForNivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
