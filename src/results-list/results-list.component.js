// NG2
import {Component} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
// App
import {HttpService} from '../services/http-service.service';
import {Result} from './result/result.component';

@Component({
    selector: 'results-list',
    template: `
        <section>
            <input type="text" placeholder="Search for an artist..."
             (input)="searchForArtist($event.target.value)" />
            <result
                *ngFor="#searchResult of results"
                entity="artist"
                [details]="searchResult"
                ></result>

            <div [hidden]="results.length > 0" class="no-results">
                Search for an artist to add them to your favorites.
            </div>
        </section>
    `,
    directives: [
        Result,
        COMMON_DIRECTIVES
    ]
})
export class ResultsList {
    constructor (httpService: HttpService) {
        this.results = [];
        this.httpService = httpService;
    }

    searchForArtist(query) {
        if (query) {
            clearTimeout(this.debounceQuery);

            this.debounceQuery = setTimeout(() => {
                this.httpService.findArtists(query)
                    .then(artistData => {
                        this.results = artistData.artist;
                    }, error => {
                        console.warn(error.message);
                    })
            }, 500);
        }
    }
}