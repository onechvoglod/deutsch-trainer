export interface VocabularyCard {
    id: string;
    de: string;
    translatedText: string;
    example?: string;
    exampleTranslation?: string;
    status: 'new' | 'learning' | 'mastered';
    nextReviewAt: string | null;
    correctStreak: number;
}

export interface FirestoreCardDocument {
    name: string;
    fields: {
        de: { stringValue: string };
        translatedText: { stringValue: string };
        example?: { stringValue: string };
        exampleTranslation?: { stringValue: string };
        status: { stringValue: VocabularyCard['status'] };
        nextReviewAt: { stringValue: string } | { nullValue: null };
        correctStreak: { integerValue: string };
    };
}

export interface FirestoreCardsResponse {
    documents?: FirestoreCardDocument[];
    nextPageToken?: string;
}