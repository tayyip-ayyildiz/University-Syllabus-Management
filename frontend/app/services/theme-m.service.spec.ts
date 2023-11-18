import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ThemeMService } from './theme-m.service';

describe('ThemeMService', () => {
  let service: ThemeMService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [ThemeMService]

    });
    service = TestBed.inject(ThemeMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
