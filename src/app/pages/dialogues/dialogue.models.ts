export interface DialogueTurn {
    speaker: 'A' | 'B';
    text: string;
}

export interface Dialogue {
    id: string;
    title: string;
    turns: DialogueTurn[];
}

export interface FirestoreDialogueTurn {
    mapValue: {
        fields: {
            speaker: { stringValue: 'A' | 'B' };
            text: { stringValue: string };
        };
    };
}

export interface FirestoreDialogueDocument {
    name: string;
    fields: {
        title: { stringValue: string };
        turns: {
            arrayValue: {
                values?: FirestoreDialogueTurn[];
            };
        };
    };
}

export interface FirestoreDialoguesResponse {
    documents?: FirestoreDialogueDocument[];
    nextPageToken?: string;
}