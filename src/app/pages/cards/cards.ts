import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardsControls } from './components/cards-controls/cards-controls';

@Component({
  imports: [
    MatCard,
    MatCardTitle,
    MatButtonModule,
    MatIconModule,
    CardsControls
  ],
  selector: 'app-cards',
  styleUrl: './cards.scss',
  templateUrl: './cards.html',
})
export class Cards {
  protected readonly showAnswer = signal(false);
  readonly cards = [
    { de: 'der Tisch', translatedText: 'стол' },
    { de: 'die Arbeit', translatedText: 'работа' },
    { de: 'das Gespräch', translatedText: 'разговор' },
    { de: 'Ich suche eine Arbeit.', translatedText: 'Я ищу работу.' },
    { de: 'die Bewerbung', translatedText: 'заявление о приёме на работу, заявка на вакансию' },
    { de: 'der Arbeitgeber', translatedText: 'работодатель' },
    { de: 'die Erfahrung', translatedText: 'опыт' },
    { de: 'Ich habe zwei Jahre Erfahrung.', translatedText: 'У меня два года опыта.' },
    { de: 'die Weiterbildung', translatedText: 'повышение квалификации, дополнительное обучение' },
    { de: 'Können Sie mir bitte helfen?', translatedText: 'Не могли бы Вы мне помочь?' },
  ];
  readonly cardIndex = signal(0);
  readonly currentCard = computed(
    () => this.cards[this.cardIndex()]
  );
  readonly visibleCardNumbers = computed(() => {
    const index = this.cardIndex();
    const total = this.cards.length;
    const start = Math.min(
      index,
      Math.max(0, total - 3)
    );

    return Array.from(
      { length: Math.min(3, total) },
      (_, position) => start + position + 1
    )
  });
  protected readonly speechAvailable = signal(false);

  showTranslation(): void {
    this.showAnswer.update(value => !value);
  }

  nextCard(): void {
    if (this.cardIndex() < this.cards.length - 1) {
      this.cardIndex.update(value => value + 1);
      this.showAnswer.set(false);
    }
  }

  prevCard(): void {
    if (this.cardIndex() > 0) {
      this.cardIndex.update(value => value - 1);
      this.showAnswer.set(false);
    }
  }

  protected speakWord(event: MouseEvent, word: string): void {
    event.stopPropagation();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';

    speechSynthesis.speak(utterance);
  }
}
