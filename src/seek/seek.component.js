// NG2
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
// App
import {Navigation} from '../navigation/navigation.component';
import {MainView} from '../main/main.component';
import {DetailView} from '../details/details.component';

@Component({
    selector: 'seek-app',
    template: `
        <navigation></navigation>
        <router-outlet></router-outlet>
    `,
    directives: [
        Navigation,
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    {
        path: '/',
        name: 'Main',
        component: MainView,
        useAsDefault: true
    },
    {
        path: '/details/:id/...',
        name: 'Details',
        component: DetailView
    }
])
export class SeekApp {
}
