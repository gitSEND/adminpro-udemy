import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { LoguinGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoguinGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graficas1', component: Graficas1Component },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);