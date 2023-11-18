import { TestBed } from '@angular/core/testing';

import { MatiereService } from './matiere.service';
import { HttpClientModule } from '@angular/common/http';

describe('MatiereService', () => {
  let service: MatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [MatiereService]

    });
    service = TestBed.inject(MatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
