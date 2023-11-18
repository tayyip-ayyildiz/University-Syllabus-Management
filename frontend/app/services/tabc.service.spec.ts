import { TestBed } from '@angular/core/testing';
import { TabcService } from './tabc.service';
import { HttpClientModule } from '@angular/common/http';

describe('TabcService', () => {
  let service: TabcService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [TabcService]

    });
    service = TestBed.inject(TabcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
