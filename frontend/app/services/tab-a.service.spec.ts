import { TestBed } from '@angular/core/testing';
import { TabAService } from './tab-a.service';
import { HttpClientModule } from '@angular/common/http';

describe('TabAService', () => {
  let service: TabAService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [TabAService]

    });
    service = TestBed.inject(TabAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
