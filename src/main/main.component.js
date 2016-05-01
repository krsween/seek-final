// NG2
import {Component} from 'angular2/core';
// App
import {ResultsList} from '../results-list/results-list.component';
import {Favorites} from '../favorites/favorites.component';


@Component({
    selector: 'main-view',
    template: `
        <section>
            <results-list></results-list>
            <favorites></favorites>
        </section>
    `,
    directives: [
        ResultsList,
        Favorites
    ]
})
export class MainView {}