import { TestBed } from '@angular/core/testing';

import { AuthentificationService } from './authentification.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthentificationService', () => {
  let service: AuthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [AuthentificationService]

    });
    service = TestBed.inject(AuthentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
