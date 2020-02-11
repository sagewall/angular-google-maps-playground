import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';
import { DirectionsMapComponent } from './directions-map.component';

describe('DirectionsMapComponent', () => {
  let component: DirectionsMapComponent;
  let fixture: ComponentFixture<DirectionsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectionsMapComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
