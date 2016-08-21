// https://angular.io/resources/live-examples/router/ts/plnkr.html

import { provideRouter, RouterConfig } from '@angular/router';

import {BaseComponent} from './components/baseComponent/baseComponent';
import {VersionsContainerComponent} from './components/versionsContainerComponent/versionsContainerComponent';
import {RouletteComponent} from './components/rouletteComponent/rouletteComponent';
import {DashboardComponent} from './admin/components/baseComponent/baseComponent';
import {ProjectComponent} from './projects/components/baseComponent/baseComponent';

import {VersionCubicComponent} from './version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './version-typography/components/baseComponent/baseComponent';

export const routes: RouterConfig = [
	{
		path: '',
		component: BaseComponent,
		children: [
			{
				path: 'v/:version',
				component: VersionsContainerComponent //holder
			},
			{
				path: 'roulette/:type',
				component: RouletteComponent //random
			},
			{
				path: '',
				component: RouletteComponent //random version
				// redirectTo: 'roulette',
				// terminal: true
			}
		]
	},
	{path: 'admin', component: DashboardComponent},
	{path: 'project/:name', component: ProjectComponent}
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
