// Angular 2
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
// App
import {SeekApp} from './seek/seek.component';
import {HttpService} from './services/http-service.service';
import {FavoritesService} from './services/favorites.service';

bootstrap(SeekApp, [
    HttpService,
    FavoritesService,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {
        useClass: HashLocationStrategy
    })
]).catch(err => console.error(err));
