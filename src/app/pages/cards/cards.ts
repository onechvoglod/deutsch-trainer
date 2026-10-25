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
    },
    {
      de: 'Wir haben momentan ein Problem mit der Lieferung.',
      translatedText: 'В данный момент у нас проблема с поставкой.'
    },
    {
      de: 'Wir müssen unbedingt eine Lösung finden.',
      translatedText: 'Нам обязательно нужно найти решение.'
    },
    {
      de: 'Wir sollten gemeinsam überlegen, wie wir das Problem lösen können.',
      translatedText: 'Нам следует вместе подумать, как мы можем решить эту проблему.'
    },
    {
      de: 'Hast du schon eine Idee, wie wir das Problem lösen könnten?',
      translatedText: 'У тебя уже есть идея, как мы могли бы решить эту проблему?'
    },
    {
      de: 'Ich schlage vor, dass wir zuerst mit dem Team sprechen.',
      translatedText: 'Я предлагаю сначала поговорить с командой.'
    },
    {
      de: 'Wir könnten vielleicht einen Plan erstellen.',
      translatedText: 'Мы могли бы, возможно, составить план.'
    },
    {
      de: 'Was hältst du davon, wenn wir morgen eine Besprechung organisieren?',
      translatedText: 'Что ты думаешь о том, если мы завтра организуем собрание?'
    },
    {
      de: 'Meiner Meinung nach wäre es sinnvoll, die Mitarbeiter besser zu informieren.',
      translatedText: 'По моему мнению, было бы разумно лучше информировать сотрудников.'
    },
    {
      de: 'Eine weitere Möglichkeit wäre, einen Plan zu erstellen.',
      translatedText: 'Ещё одной возможностью было бы составить план.'
    },
    {
      de: 'Das ist eine gute Idee.',
      translatedText: 'Это хорошая идея.'
    },
    {
      de: 'Da stimme ich dir vollkommen zu.',
      translatedText: 'Я с тобой полностью согласен.'
    },
    {
      de: 'Das sehe ich genauso.',
      translatedText: 'Я считаю точно так же.'
    },
    {
      de: 'Damit bin ich einverstanden.',
      translatedText: 'Я с этим согласен.'
    },
    {
      de: 'Das klingt nach einer guten Lösung.',
      translatedText: 'Это звучит как хорошее решение.'
    },
    {
      de: 'Ich bin mir nicht sicher, ob das eine gute Lösung ist.',
      translatedText: 'Я не уверен, что это хорошее решение.'
    },
    {
      de: 'Das könnte funktionieren, aber wir sollten auch bedenken, dass wir wenig Zeit haben.',
      translatedText: 'Это могло бы сработать, но нам также следует учитывать, что у нас мало времени.'
    },
    {
      de: 'Ich verstehe deinen Vorschlag, aber ich würde lieber zuerst mit dem Team sprechen.',
      translatedText: 'Я понимаю твоё предложение, но предпочёл бы сначала поговорить с командой.'
    },
    {
      de: 'Vielleicht wäre es besser, wenn wir zuerst die Ursache finden.',
      translatedText: 'Возможно, было бы лучше, если бы мы сначала нашли причину.'
    },
    {
      de: 'Zuerst sollten wir herausfinden, warum das Problem entstanden ist.',
      translatedText: 'Сначала нам следует выяснить, почему возникла проблема.'
    },
    {
      de: 'Vielleicht liegt das Problem daran, dass wir zu wenig Personal haben.',
      translatedText: 'Возможно, проблема заключается в том, что у нас слишком мало персонала.'
    },
    {
      de: 'Wir sollten mit den Mitarbeitern sprechen, um die Ursache zu finden.',
      translatedText: 'Нам следует поговорить с сотрудниками, чтобы найти причину.'
    },
    {
      de: 'Wer könnte sich darum kümmern?',
      translatedText: 'Кто мог бы этим заняться?'
    },
    {
      de: 'Ich könnte diese Aufgabe übernehmen.',
      translatedText: 'Я мог бы взять на себя эту задачу.'
    },
    {
      de: 'Könntest du dich darum kümmern?',
      translatedText: 'Ты мог бы этим заняться?'
    },
    {
      de: 'Wir sollten die Aufgaben untereinander aufteilen.',
      translatedText: 'Нам следует распределить задачи между собой.'
    },
    {
      de: 'Dann machen wir das so.',
      translatedText: 'Тогда так и сделаем.'
    },
    {
      de: 'Wir haben also vereinbart, dass wir morgen eine Besprechung organisieren.',
      translatedText: 'Итак, мы договорились, что завтра организуем собрание.'
    },
    {
      de: 'Ich denke, damit haben wir eine gute Lösung gefunden.',
      translatedText: 'Я думаю, таким образом мы нашли хорошее решение.'
    },
    {
      de: 'Wir sollten in einer Woche überprüfen, ob sich die Situation verbessert hat.',
      translatedText: 'Нам следует через неделю проверить, улучшилась ли ситуация.'
    },
    {
      de: 'Wir haben momentan ein Problem mit der Lieferung. Wir müssen eine Lösung finden.',
      translatedText: 'В данный момент у нас проблема с поставкой. Нам нужно найти решение.'
    },
    {
      de: 'Ich schlage vor, dass wir mit dem Team sprechen. Was hältst du davon?',
      translatedText: 'Я предлагаю поговорить с командой. Что ты об этом думаешь?'
    },
    {
      de: 'Das ist eine gute Idee. Außerdem könnten wir einen Plan erstellen.',
      translatedText: 'Это хорошая идея. Кроме того, мы могли бы составить план.'
    },
    {
      de: 'Wer könnte sich darum kümmern? Und wann sollten wir das machen?',
      translatedText: 'Кто мог бы этим заняться? И когда нам следует это сделать?'
    },
    {
      de: 'Dann machen wir das so. Ich kümmere mich um die Besprechung und du übernimmst die Planung.',
      translatedText: 'Тогда так и сделаем. Я займусь собранием, а ты возьмёшь на себя планирование.'
    }];
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
