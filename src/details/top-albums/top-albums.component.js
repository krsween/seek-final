// NG2
import {Component} from 'angular2/core';
// App
import {HttpService} from '../../services/http-service.service';

@Component({
    selector: 'top-albums',
    template: `
        <section>
            <div *ngFor="#album of topAlbums">
                <img *ngIf="getThumbnail(album)" [src]="getThumbnail(album)" [alt]="album.name" />
                <div class="placeholder" *ngIf="!getThumbnail(album)"></div>
                <p>{{ (artist?.name || '') }}</p>
            </div>
        </section>
    `
})
export class TopAlbums {
    constructor(httpService: HttpService) {
        let currentArtist = window.location.hash ? decodeURIComponent(window.location.hash.replace('#/details/', '').replace('/similar', '')) : '';
        httpService.getTopAlbums(currentArtist)
            .then(topAlbums => {
                this.topAlbums = topAlbums;
            });
    }

    getThumbnail(album) {
        let albumUrl = '';
        if (album && album.image && album.image[3] && album.image[3]['#text']) {
            albumUrl = album.image[3]['#text'];
        }
        return albumUrl;
    }

}