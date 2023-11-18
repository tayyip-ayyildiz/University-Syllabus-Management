import { TestBed } from '@angular/core/testing';
import { SpecialiteService } from './specialite.service';
import { HttpClientModule } from '@angular/common/http';

describe('SpecialiteService', () => {
  let service: SpecialiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [SpecialiteService]

    });
    service = TestBed.inject(SpecialiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
