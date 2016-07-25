import {Component} from '@angular/core';
import {RouterOutlet, RouteConfig, RouteDefinition} from '@angular/router-deprecated';
import {APP_ROUTES} from './app.routes';
import {HTTP_PROVIDERS} from '@angular/http';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
    selector: 'githubber-app',
    templateUrl: './app/startup/app.html',
    directives: [RouterOutlet, NavbarComponent],
    providers: [HTTP_PROVIDERS]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
    public appRoutes: RouteDefinition[];
    constructor() {
        this.appRoutes = APP_ROUTES;
    }
}
