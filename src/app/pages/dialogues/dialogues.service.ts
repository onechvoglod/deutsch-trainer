import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { firebaseConfig } from '../../config/firebase.config';
import { Dialogue, FirestoreDialoguesResponse } from './dialogue.models';

@Service()
export class DialoguesService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl =
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

    getDialogues(): Observable<Dialogue[]> {
        return this.http.get<FirestoreDialoguesResponse>(
            `${this.baseUrl}/dialogues`,
            {
                params: {
                    pageSize: 100,
                },
            }
        ).pipe(
            map(response =>
                (response.documents ?? []).map((document): Dialogue => {
                    const fields = document.fields;

                    return {
                        id: document.name.split('/').pop()!,
                        title: fields.title.stringValue,
                        turns: (fields.turns.arrayValue.values ?? []).map(turn => ({
                            speaker: turn.mapValue.fields.speaker.stringValue,
                            text: turn.mapValue.fields.text.stringValue,
                        })),
                    };
                })
            )
        );
    }
}