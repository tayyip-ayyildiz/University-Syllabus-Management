import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMComponent } from './create-m.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('CreateMComponent', () => {
  let component: CreateMComponent;
  let fixture: ComponentFixture<CreateMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ CreateMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
