import {RouteDefinition} from '@angular/router-deprecated';
import {HomeComponent} from '../home/home.component';

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true}
];
