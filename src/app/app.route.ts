import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoguinGuardGuard } from './services/service.index';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: '',
		component: PagesComponent,
		canActivate: [LoguinGuardGuard],
		loadChildren: './pages/pages.module#PagesModule'
	},
	{ path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
