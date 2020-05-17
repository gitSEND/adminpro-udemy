import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AdminGuard } from '../services/guards/admin.guard';
import { LoguinGuardGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RenuevaTokenGuard } from '../services/guards/renueva-token.guard';

const pagesRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [RenuevaTokenGuard],
		data: { titulo: 'Dashboard' },
	},
	{
		path: 'progress',
		component: ProgressComponent,
		data: { titulo: 'Progress' },
	},
	{
		path: 'graficas1',
		component: Graficas1Component,
		data: { titulo: 'Gráficas' },
	},
	{
		path: 'promesas',
		component: PromesasComponent,
		data: { titulo: 'Promesas' },
	},
	{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
	{
		path: 'account-settings',
		component: AccountSettingsComponent,
		data: { titulo: 'Ajuestes del tema' },
	},

	{
		path: 'perfil',
		component: ProfileComponent,
		data: { titulo: 'Perfil del usuario' },
	},

	{
		path: 'busqueda/:termino',
		component: BusquedaComponent,
		data: { titulo: 'Buscador' },
	},
	// tslint:disable-next-line:comment-format
	//MANTENIMIENTOS
	{
		path: 'usuarios',
		component: UsuariosComponent,
		canActivate: [AdminGuard],
		data: { titulo: 'Mantenimiento de usuarios' },
	},
	{
		path: 'hospitales',
		component: HospitalesComponent,
		data: { titulo: 'Mantenimiento de hospitales' },
	},
	{
		path: 'medicos',
		component: MedicosComponent,
		data: { titulo: 'Mantenimiento de médicos' },
	},
	{
		path: 'medico/:id',
		component: MedicoComponent,
		data: { titulo: 'Mantenimiento de médico' },
	},
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },


];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
