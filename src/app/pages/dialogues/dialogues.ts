import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DialoguesService } from './dialogues.service';
import { BoldTextPipe } from './bold-text-pipe';
import { Dialogue } from './dialogue.models';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dialogues',
  imports: [
    MatProgressSpinner,
    BoldTextPipe,
  ],
  templateUrl: './dialogues.html',
  styleUrl: './dialogues.scss',
})
export class Dialogues implements OnInit {
  private readonly dialoguesService = inject(DialoguesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly dialogues = signal<Dialogue[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');

  ngOnInit(): void {
    void this.loadDialogues();
  }

  protected loadDialogues(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.dialoguesService.getDialogues()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: dialogues => {
          this.dialogues.set(dialogues);
        },
        error: error => {
          console.error('Failed to load dialogues:', error);

          this.errorMessage.set(
            'Die Dialoge konnten nicht geladen werden.'
          );
        },
      });
  }
}