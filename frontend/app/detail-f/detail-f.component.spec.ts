import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFComponent } from './detail-f.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailFComponent', () => {
  let component: DetailFComponent;
  let fixture: ComponentFixture<DetailFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ DetailFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
