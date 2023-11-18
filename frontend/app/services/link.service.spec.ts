import { TestBed } from '@angular/core/testing';

import { LinkService } from './link.service';
import { HttpClientModule } from '@angular/common/http';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [LinkService]

    });
    service = TestBed.inject(LinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
