import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFComponent } from './create-f.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateFComponent', () => {
  let component: CreateFComponent;
  let fixture: ComponentFixture<CreateFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ CreateFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
