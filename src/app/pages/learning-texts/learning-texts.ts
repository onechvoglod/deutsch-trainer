import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LearningTextService } from './learning-text.service';
import { LearningText } from './learning-text.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatAccordion,
    MatTabsModule,
    Spinner
  ],
  selector: 'app-learning-texts',
  styleUrl: './learning-texts.scss',
  templateUrl: './learning-texts.html',
})
export class LearningTexts implements OnInit {
  protected readonly textService = inject(LearningTextService);
  protected readonly learningTexts = signal<LearningText[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadLearningTexts();
  }

  private async loadLearningTexts(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      const texts = await this.textService.getLearningTexts();
      this.learningTexts.set(texts);
    } catch (error) {
      console.error('Failed to load learning texts:', error);

      this.errorMessage.set(
        'Die Texte konnten nicht geladen werden.'
      );
    } finally {
      this.loading.set(false);
    }
  }
}
