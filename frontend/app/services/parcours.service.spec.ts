import { TestBed } from '@angular/core/testing';

import { ParcoursService } from './parcours.service';
import { HttpClientModule } from '@angular/common/http';

describe('ParcoursService', () => {
  let service: ParcoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [ParcoursService]

    });
    service = TestBed.inject(ParcoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
