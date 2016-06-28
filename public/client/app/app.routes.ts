import { provideRouter, RouterConfig } from '@angular/router';
import {BaseComponent} from './components/baseComponent/baseComponent';

export const routes: RouterConfig = [
  { path: '', component: BaseComponent },
  { path: 'v/:vers', component: BaseComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
