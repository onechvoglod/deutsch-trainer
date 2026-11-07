import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cards } from './pages/cards/cards';
import { NotFound } from './pages/not-found/not-found';
import { CardCreate } from './pages/card-create/card-create';
import { LearningTexts } from './pages/learning-texts/learning-texts';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Deutsch Trainer',
    },
    {
        path: 'cards',
        component: Cards,
        title: 'Lernkarten | Deutsch Trainer',
    },
    {
        path: 'card-create',
        component: CardCreate,
        title: 'Neue Karte | Deutsch Trainer ',
    },
    {
        path: 'learning-texts',
        component: LearningTexts,
        title: 'Über ein Thema sprechen | Deutsch Trainer',
    },
    {
        path: '**',
        component: NotFound,
        title: 'Seite nicht gefunden | Deutsch Trainer',
    },
];
