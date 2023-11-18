import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ThemeCService } from './theme-c.service';

describe('ThemeCService', () => {
  let service: ThemeCService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [ThemeCService]

    });
    service = TestBed.inject(ThemeCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
