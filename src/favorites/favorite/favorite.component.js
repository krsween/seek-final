// NG2
import {Component} from 'angular2/core';
// App

@Component({
    selector: 'favorite',
    inputs: [
        'details'
    ],
    template: `
        <div>
            <img [src]="details.largeThumbnail" [alt]="details.artist">
            <p>{{ details.artist }}</p>
        </div>
    `
})
export class Favorite {
    ngOnInit() {
        this.details = this.details || {};
    }
}