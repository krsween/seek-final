// NG2
import {Component} from 'angular2/core';
// App
import {Favorite} from './favorite/favorite.component';
import {FavoritesService} from '../services/favorites.service';

@Component({
    selector: 'favorites',
    template: `
        <section>
            <h1>My Favorite Artists</h1>
            <favorite *ngFor="#favorite of favorites"
                [details]="favorite" (click)="goToArtist(favorite.artist)"></favorite>
        </section>
    `,
    directives: [
        Favorite
    ]
})
export class Favorites {
    constructor(favoritesService: FavoritesService) {
        this.favorites = favoritesService.getFavorites();
    }

    goToArtist(artist) {
        window.location.href = './#/details/' + encodeURIComponent(artist);
    }
}