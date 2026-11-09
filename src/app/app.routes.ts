import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Deutsch Trainer',
    },
    {
        path: 'cards',
        loadComponent: () => import('./pages/cards/cards').then(m => m.Cards),
        title: 'Lernkarten | Deutsch Trainer',
    },
    {
        path: 'card-create',
        loadComponent: () => import('./pages/card-create/card-create').then(m => m.CardCreate),
        title: 'Neue Karte | Deutsch Trainer',
    },
    {
        path: 'learning-texts',
        loadComponent: () => import('./pages/learning-texts/learning-texts').then(m => m.LearningTexts),
        title: 'Über ein Thema sprechen | Deutsch Trainer',
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
        title: 'Seite nicht gefunden | Deutsch Trainer',
    },
];
