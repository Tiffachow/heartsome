import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BaseComponent} from './components/base/base.component';
import {RouletteComponent} from './components/roulette/roulette.component';
import {DashboardComponent} from './admin/components/base/base.component';
import {ProjectComponent} from './projects/components/base/base.component';
import {VersionComponent} from './versions/components/base/base.component';

export const appRoutes: Routes = [
	{
		path: '',
		component: BaseComponent,
		children: [
			{
				path: 'v/:version',
				component: VersionComponent //holder of all versions
			},
			{
				path: 'roulette/:type',
				component: RouletteComponent //random version or project
			},
			{
				path: '',
				component: RouletteComponent //random version or project
				// redirectTo: 'roulette',
				// terminal: true
			}
		]
	},
	{path: 'admin', component: DashboardComponent},
	{path: 'project/:name', component: ProjectComponent} //holder of all projects
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
