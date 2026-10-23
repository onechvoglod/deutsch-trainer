export type VocabularyCardStatus = 'new' | 'learning' | 'mastered';

export interface VocabularyCard {
    id: number;
    de: string;
    translatedText: string;
    nextReviewAt: string | null;
    correctStreak: number;
    status: VocabularyCardStatus;
}