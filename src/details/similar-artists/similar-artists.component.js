// NG2
import {Component} from 'angular2/core';
// App
import {HttpService} from '../../services/http-service.service';

@Component({
    selector: 'similar-artists',
    template: `
        <section>
            <ul>
                <li *ngFor="#artist of similarArtists">
                    {{ artist?.name }}
                </li>
            </ul>
        </section>
    `
})
export class SimilarArtists {
    constructor(httpService: HttpService) {
        let currentArtist = window.location.hash ? decodeURIComponent(window.location.hash.replace('#/details/', '').replace('/similar', '')) : '';
        httpService.getSimilarArtists(currentArtist)
            .then(similarArtists => {
                this.similarArtists = similarArtists;
            });
    }
}