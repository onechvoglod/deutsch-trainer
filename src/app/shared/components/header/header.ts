import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
  ],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly authService = inject(AuthService);

  protected async login(): Promise<void> {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Anmeldung fehlgeschlagen:', error);
    }
  }

  protected async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Abmeldung fehlgeschlagen:', error);
    }
  }
}
