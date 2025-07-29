import { Routes } from '@angular/router';
import { RolesPanel } from '../features/roles-menu/roles-panel/roles-panel';
import { adminOnlyGuard } from '../core/guards/admin-only-guard';
import { ManageCategories } from '../features/roles-menu/manage-categories/manage-categories';
import { adminAndModeratorOnlyGuard } from '../core/guards/admin-and-moderator-guard';
import { ManagePlatforms } from '../features/roles-menu/manage-platforms/manage-platforms';

export const moderateRoutes: Routes = [
  {
    path: 'change-roles',
    component: RolesPanel,
    canActivate: [adminOnlyGuard],
  },
  {
    path: 'change-categories',
    component: ManageCategories,
    canActivate: [adminAndModeratorOnlyGuard],
  },
  {
    path: 'change-platforms',
    component: ManagePlatforms,
    canActivate: [adminAndModeratorOnlyGuard],
  },
];
