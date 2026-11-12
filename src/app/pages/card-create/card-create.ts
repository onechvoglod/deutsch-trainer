import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { form, required, FormRoot, FormField } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { CardsService } from '../../features/cards/cards.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [
    MatIcon,
    MatButton,
    MatCard,
    MatFormField,
    MatInput,
    MatCardContent,
    MatLabel,
    MatCardActions,
    FormRoot,
    FormField,
    RouterLink,
    MatProgressSpinnerModule
  ],
  selector: 'app-card-create',
  styleUrl: './card-create.scss',
  templateUrl: './card-create.html',
})
export class CardCreate {
  protected cardsService = inject(CardsService);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly cardModel = signal({
    de: '',
    translatedText: '',
    example: '',
    exampleTranslation: '',
  })
  protected readonly cardForm = form(
    this.cardModel,
    fields => {
      required(fields.de);
      required(fields.translatedText);
    },
    {
      submission: {
        action: async () => {
          const values = this.cardModel();
          const data = {
            de: values.de.trim(),
            translatedText: values.translatedText.trim(),
            example: values.example.trim(),
            exampleTranslation: values.exampleTranslation.trim(),
          }

          try {
            await firstValueFrom(this.cardsService.createCard(data));

            this.cardForm().reset({
              de: '',
              translatedText: '',
              example: '',
              exampleTranslation: '',
            });

            this.snackBar.open(
              'Die Karte wurde erstellt.',
              undefined,
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );

            return undefined;

          } catch (error) {
            console.error('Failed to create card:', error);

            return {
              kind: 'cardCreationFailed',
              message: 'Die Karte konnte nicht gespeichert werden.',
            };
          }
        }
      }
    }
  )

  protected resetForm(): void {
    this.cardForm().reset({
      de: '',
      translatedText: '',
      example: '',
      exampleTranslation: '',
    });
  }
}
