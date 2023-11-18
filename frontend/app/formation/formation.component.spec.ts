import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationComponent } from './formation.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormationComponent', () => { //describe regroupe série de tests
  let component: FormationComponent;
  let fixture: ComponentFixture<FormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ FormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
