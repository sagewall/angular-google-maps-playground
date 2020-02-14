import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';
import { ClosestLocationMapComponent } from './closest-location-map.component';

describe('ClosestLocationMapComponent', () => {
  let component: ClosestLocationMapComponent;
  let fixture: ComponentFixture<ClosestLocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClosestLocationMapComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosestLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
