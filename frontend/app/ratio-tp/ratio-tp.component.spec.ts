import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioTpComponent } from './ratio-tp.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RatioTpComponent', () => {
  let component: RatioTpComponent;
  let fixture: ComponentFixture<RatioTpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ RatioTpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatioTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
