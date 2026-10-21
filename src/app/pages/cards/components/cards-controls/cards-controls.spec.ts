import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsControls } from './cards-controls';

describe('CardsControls', () => {
  let component: CardsControls;
  let fixture: ComponentFixture<CardsControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsControls],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
