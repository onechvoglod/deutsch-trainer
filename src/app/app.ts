import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  imports: [RouterOutlet, Header, MatProgressBar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  protected readonly navigating = computed(
    () => this.router.currentNavigation() !== null
  );
}
