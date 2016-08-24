// https://angular.io/resources/live-examples/router/ts/plnkr.html

import { provideRouter, RouterConfig } from '@angular/router';

import {BaseComponent} from './components/baseComponent/baseComponent';
import {RouletteComponent} from './components/rouletteComponent/rouletteComponent';
import {DashboardComponent} from './admin/components/baseComponent/baseComponent';
import {ProjectComponent} from './projects/components/baseComponent/baseComponent';
import {VersionComponent} from './versions/components/baseComponent/baseComponent';

export const routes: RouterConfig = [
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

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
