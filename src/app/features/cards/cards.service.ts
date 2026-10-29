import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { from, map, Observable, switchMap, throwError } from 'rxjs';
import { firebaseConfig } from '../../config/firebase.config';
import { AuthService } from '../../core/services/auth.service';
import { FirestoreCardsResponse, VocabularyCard } from './cards.models';

@Service()
export class CardsService {
    private readonly http = inject(HttpClient);
    private readonly authService = inject(AuthService);

    private readonly baseUrl =
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

    getCards(): Observable<VocabularyCard[]> {
        const user = this.authService.user();

        if (!user) {
            return throwError(() => new Error('User is not authenticated'));
        }

        const url = `${this.baseUrl}/users/${user.uid}/cards`;

        return from(this.authService.getIdToken()).pipe(
            switchMap(token =>
                this.http.get<FirestoreCardsResponse>(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        pageSize: 20,
                    },
                })
            ),
            map(response =>
                (response.documents ?? []).map(
                    (document): VocabularyCard => {
                        const fields = document.fields;
                        const nextReviewAt = fields.nextReviewAt;

                        return {
                            id: document.name.split('/').pop()!,
                            de: fields.de.stringValue,
                            translatedText: fields.translatedText.stringValue,
                            ...(fields.example ? { example: fields.example.stringValue } : {}),
                            ...(fields.exampleTranslation ? { exampleTranslation: fields.exampleTranslation.stringValue } : {}),
                            status: fields.status.stringValue,
                            nextReviewAt: 'stringValue' in nextReviewAt ? nextReviewAt.stringValue : null,
                            correctStreak: Number(fields.correctStreak.integerValue),
                        };
                    }
                )
            )
        );
    }
}
