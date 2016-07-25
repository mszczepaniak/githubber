import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AppComponent} from './startup/app.component';
import {LoggerService} from './logger/logger.service';

bootstrap(AppComponent, [
        ROUTER_PROVIDERS, LoggerService
]);

