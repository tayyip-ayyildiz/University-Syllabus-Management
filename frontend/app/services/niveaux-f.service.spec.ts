import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NiveauxFService } from './niveaux-f.service';

describe('NiveauxFService', () => {
  let service: NiveauxFService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [NiveauxFService]
    });
    service = TestBed.inject(NiveauxFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
