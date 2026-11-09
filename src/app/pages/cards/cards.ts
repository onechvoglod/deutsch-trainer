import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardsControls } from './components/cards-controls/cards-controls';
import { CardsService } from '../../features/cards/cards.service';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CardsControls,
    MatButtonToggleModule,
    Spinner
  ],
  selector: 'app-cards',
  styleUrl: './cards.scss',
  templateUrl: './cards.html',
})
export class Cards {
  protected readonly showTranslation = signal(false);
  protected cardsService = inject(CardsService);
  protected readonly authService = inject(AuthService);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  readonly cards = signal<any[]>([]);
  readonly cardIndex = signal(0);
  readonly currentCard = computed(
    () => this.cards()[this.cardIndex()]
  );
  readonly visibleCardNumbers = computed(() => {
    const index = this.cardIndex();
    const total = this.cards().length;
    const start = Math.min(
      index,
      Math.max(0, total - 3)
    );

    return Array.from(
      { length: Math.min(3, total) },
      (_, position) => start + position + 1
    )
  });
  protected readonly initialLanguage = signal<'de' | 'translation'>('de');

  constructor() {
    effect(onCleanup => {
      const ready = this.authService.ready();
      const user = this.authService.user();

      this.cards.set([]);
      this.cardIndex.set(0);
      this.showTranslation.set(false);
      this.errorMessage.set('');
      this.loading.set(false);

      if (!ready || !user) {
        return;
      }

      this.loading.set(true);

      const cardsSubscription = this.cardsService.getCards().subscribe({
        next: cards => {
          this.cards.set(cards);
          this.loading.set(false);
        },
        error: error => {
          console.error('Failed to load cards:', error);
          this.errorMessage.set(
            'Die Karten konnten nicht geladen werden.'
          );
          this.loading.set(false);
        },
      });

      onCleanup(() => cardsSubscription.unsubscribe());
    });
  }

  flipCard(): void {
    this.showTranslation.update(value => !value);
  }

  nextCard(): void {
    if (this.cardIndex() < this.cards().length - 1) {
      this.cardIndex.update(value => value + 1);
      this.showTranslation.set(this.initialLanguage() === 'translation');
    }
  }

  prevCard(): void {
    if (this.cardIndex() > 0) {
      this.cardIndex.update(value => value - 1);
      this.showTranslation.set(this.initialLanguage() === 'translation');
    }
  }

  protected speakWord(event: MouseEvent, word: string): void {
    event.stopPropagation();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  }

  protected changeInitialLanguage(language: 'de' | 'translation') {
    this.initialLanguage.set(language);
    this.showTranslation.set(language === 'translation');
  }
}
