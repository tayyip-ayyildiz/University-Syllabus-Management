import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencesComponent } from './competences.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CompetencesComponent', () => {
  let component: CompetencesComponent;
  let fixture: ComponentFixture<CompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ CompetencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
