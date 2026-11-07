import { Service } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { LearningText } from './learning-text.model';

@Service()
export class LearningTextService {
    async getLearningTexts(): Promise<LearningText[]> {
        const collectionRef = collection(db, 'learningTexts');
        const querySnapshot = await getDocs(collectionRef);

        return querySnapshot.docs
            .map((document): LearningText => {
                const data = document.data();

                return {
                    id: document.id,
                    title: data['title'],
                    description: data['description'],
                    text: data['text'],
                    translation: data['translation'],
                };
            })
            .sort((a, b) => Number(a.id) - Number(b.id));
    }
}