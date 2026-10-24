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
    {
      de: 'Ich möchte heute darüber sprechen, worauf es bei einem Bewerbungsgespräch in Deutschland ankommt. Ich werde besonders auf die Vorbereitung, die Kleidung und typische Fragen eingehen.',
      translatedText: 'Сегодня я хотел бы рассказать о том, что важно на собеседовании в Германии. Я уделю особое внимание подготовке, одежде и типичным вопросам.'
    },
    {
      de: 'Meiner Meinung nach ist eine gute Vorbereitung sehr wichtig. Zuerst sollte man sich über das Unternehmen informieren, zum Beispiel über die Produkte, die Dienstleistungen und die Arbeitsbereiche. Außerdem sollte man die Stellenanzeige genau lesen und überlegen, warum man für diese Stelle geeignet ist.',
      translatedText: 'По моему мнению, хорошая подготовка очень важна. Сначала следует узнать информацию о компании, например о её продукции, услугах и направлениях деятельности. Кроме того, нужно внимательно прочитать объявление о вакансии и подумать, почему ты подходишь на эту должность.'
    },
    {
      de: 'Ein weiterer wichtiger Punkt ist die Kleidung. Man sollte saubere und gepflegte Kleidung tragen, die zur Stelle und zum Unternehmen passt. Für ein Vorstellungsgespräch in der IT-Branche reichen normalerweise ein ordentliches Hemd, eine Stoffhose und saubere Schuhe. Ein Anzug ist nicht immer notwendig.',
      translatedText: 'Ещё один важный момент — это одежда. Следует носить чистую и опрятную одежду, которая соответствует должности и компании. Для собеседования в IT-сфере обычно достаточно аккуратной рубашки, классических брюк и чистой обуви. Костюм нужен не всегда.'
    },
    {
      de: 'Außerdem sollte man pünktlich sein und freundlich auftreten. Während des Gesprächs sollte man aufmerksam zuhören, deutlich sprechen und ehrlich antworten.',
      translatedText: 'Кроме того, следует быть пунктуальным и держаться приветливо. Во время собеседования нужно внимательно слушать, говорить чётко и отвечать честно.'
    },
    {
      de: 'Typische Fragen sind zum Beispiel: „Warum möchten Sie bei uns arbeiten?“, „Was sind Ihre Stärken und Schwächen?“ oder „Welche Berufserfahrung haben Sie?“. Es ist sinnvoll, sich vorher passende Antworten zu überlegen.',
      translatedText: 'Типичные вопросы, например: «Почему Вы хотите работать у нас?», «Каковы Ваши сильные и слабые стороны?» или «Какой у Вас профессиональный опыт?». Разумно заранее продумать подходящие ответы.'
    },
    {
      de: 'Ich interessiere mich besonders für die IT-Branche, weil ich bereits zwei Jahre Erfahrung als Webentwickler habe. Deshalb würde ich bei einem Bewerbungsgespräch meine Kenntnisse in Angular und meine Motivation betonen, mich beruflich weiterzuentwickeln.',
      translatedText: 'Меня особенно интересует IT-сфера, потому что у меня уже есть два года опыта работы веб-разработчиком. Поэтому на собеседовании я бы подчеркнул свои знания Angular и свою мотивацию к дальнейшему профессиональному развитию.'
    },
    {
      de: 'Zusammenfassend kann ich sagen, dass eine gute Vorbereitung und ein freundliches Auftreten entscheidend für ein erfolgreiches Bewerbungsgespräch sind.',
      translatedText: 'Подводя итог, могу сказать, что хорошая подготовка и приветливое поведение имеют решающее значение для успешного собеседования.'
    }
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
