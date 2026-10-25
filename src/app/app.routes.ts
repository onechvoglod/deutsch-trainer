import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cards } from './pages/cards/cards';
import { NotFound } from './pages/not-found/not-found';

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
        path: '**',
        component: NotFound,
        title: 'Seite nicht gefunden | Deutsch Trainer',
    },
];
