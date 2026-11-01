import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCreate } from './card-create';

describe('CardCreate', () => {
  let component: CardCreate;
  let fixture: ComponentFixture<CardCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
