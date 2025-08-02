import { Routes } from '@angular/router';

import { Home } from './layout/home/home';
import { AboutUs } from './shared/components/about-us/about-us';
import { NotFound } from './shared/components/not-found/not-found';

// Each module is lazy loaded to reduce app init bundle
// (Load moderate module only for admin and moderator role)
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
  {
    path: 'moderate',
    loadChildren: () =>
      import('./routes/moderate.routes').then((m) => m.moderateRoutes),
  },
  { path: 'about-us', component: AboutUs },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: '/not-found' },
];
