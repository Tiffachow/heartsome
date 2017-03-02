import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BaseComponent} from './components/baseComponent/baseComponent';
import {RouletteComponent} from './components/rouletteComponent/rouletteComponent';
import {DashboardComponent} from './admin/components/baseComponent/baseComponent';
import {ProjectComponent} from './projects/components/baseComponent/baseComponent';
import {VersionComponent} from './versions/components/baseComponent/baseComponent';

const appRoutes: Routes = [
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

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
