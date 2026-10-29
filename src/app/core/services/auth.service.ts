import { OnDestroy, Service, signal } from '@angular/core';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth } from '../../config/firebase';

@Service()
export class AuthService implements OnDestroy {
  private readonly currentUser = signal<User | null>(null);
  private readonly initialized = signal(false);
  readonly user = this.currentUser.asReadonly();
  readonly ready = this.initialized.asReadonly();

  private readonly unsubscribe = onAuthStateChanged(auth, (user) => {
    this.currentUser.set(user);
    this.initialized.set(true);
  });

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }

  async getIdToken(): Promise<string> {
    const user = this.currentUser();

    if (!user) {
      throw new Error('User is not authenticated');
    }

    return user.getIdToken();
  }

  logout() {
    return signOut(auth);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
