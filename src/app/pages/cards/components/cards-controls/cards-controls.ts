import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    MatButtonModule
  ],
  selector: 'app-cards-controls',
  styleUrl: './cards-controls.scss',
  templateUrl: './cards-controls.html',
})
export class CardsControls {
  cardIndex = input.required<number>();
  visibleCardNumbers = input.required<number[]>();
  totalCards = input.required<number>();
  previous = output<void>();
  next = output<void>();
}
