import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningTexts } from './learning-texts';

describe('LearningTexts', () => {
  let component: LearningTexts;
  let fixture: ComponentFixture<LearningTexts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningTexts],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningTexts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
