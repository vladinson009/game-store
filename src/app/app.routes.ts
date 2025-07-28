import { Routes } from '@angular/router';

import { Home } from './layout/home/home';
import { AboutUs } from './shared/components/about-us/about-us';
import { NotFound } from './shared/components/not-found/not-found';
import { RolesPanel } from './features/roles-menu/roles-panel/roles-panel';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./routes/games.routes').then((m) => m.gamesRoutes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./routes/users.routes').then((m) => m.usersRoutes),
  },
  { path: 'moderate/change-roles', component: RolesPanel },
  { path: 'about-us', component: AboutUs },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: '/not-found' },
];
