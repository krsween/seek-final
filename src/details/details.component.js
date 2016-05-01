// NG2
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
// App
import {TopAlbums} from './top-albums/top-albums.component';
import {SimilarArtists} from './similar-artists/similar-artists.component';
import {HttpService} from '../services/http-service.service';
import {FavoritesService} from '../services/favorites.service';

@Component({
    selector: 'detail-view',
    directives: [
        ROUTER_DIRECTIVES
    ],
    template: `
        <section>
            <a class="back" href="#">
                <i class="fa fa-mail-reply"></i>
            </a>
            <a class="delete" href="#" (click)="deleteFavorite(artistInfo?.mbid)">
                <i class="fa fa-trash-o"></i>
            </a>
            <aside>
                <div class="image">
                    <h2>{{ artistInfo?.name }}</h2>
                    <div class="gradient"></div>
                    <img [src]="getMainImage()" [alt]="artistInfo?.name">
                </div>
                <div class="bio">
                    <div [innerHtml]="artistInfo?.bio?.content"></div>
                </div>
            </aside>
            <article>
                <ul>
                    <li><a href="" [routerLink]="['Albums']">Top Albums</a></li>
                    <li><a href="" [routerLink]="['Similar']">Similar Artists</a></li>
                </ul>
                <div class="content">
                    <router-outlet></router-outlet>
                </div>
            </article>
        </section>
    `
})
@RouteConfig([
    {
        path: '/',
        name: 'Albums',
        component: TopAlbums,
        useAsDefault: true
    },
    {
        path: '/similar',
        name: 'Similar',
        component: SimilarArtists
    }
])
export class DetailView {

    constructor(routeParams: RouteParams, httpService: HttpService, favoritesService: FavoritesService) {
        this.httpService = httpService;
        this.favoritesService = favoritesService;
        this.currentArtist = routeParams.get('id') ? decodeURIComponent(routeParams.get('id')) : '';
        this.artistInfo = {};

    }

    ngOnInit() {
        this.httpService.getArtistInfo(this.currentArtist)
            .then(artistInfo => {
                this.artistInfo = artistInfo
            });
    }

    getMainImage() {
        let mainImageUrl = '';
        if (this.artistInfo && this.artistInfo.image && this.artistInfo.image[3] && this.artistInfo.image[3]['#text']) {
            mainImageUrl = this.artistInfo.image[3]['#text'];
        }
        return mainImageUrl;
    }

    deleteFavorite(id) {
        this.favoritesService.removeFavorite(id);
    }
}