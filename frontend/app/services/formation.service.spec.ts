import { TestBed } from '@angular/core/testing';

import { FormationService } from './formation.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import{HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'


describe('FormationService', () => {
  let service: FormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule], // Import HttpClientTestingModule here
      providers: [FormationService]

    });
    service = TestBed.inject(FormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be all', ()=>{

    expect(service.all()).toBeInstanceOf(Observable);


  })

  it('should delete', () => {
    let id = 50;
    let req = service.deleteFormationFromId(id);
  
    expect(req).toBeInstanceOf(Observable);
  
    req.subscribe((res) => {
      expect(res).toBeTrue();
    });
  });
  
  

  

});
