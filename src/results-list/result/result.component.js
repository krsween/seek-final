// NG2
import {Component} from 'angular2/core';
// App
import {FavoritesService} from '../../services/favorites.service';
import {TruncatePipe} from './truncate.pipe';


class ArtistFavorite {
    constructor(id, artist = '', largeThumbnail = '', smallThumbnail = '') {
        this.id = id;
        this.artist = artist;
        this.largeThumbnail = largeThumbnail;
        this.smallThumbnail = smallThumbnail;
    }
}

@Component({
    selector: 'result',
    inputs: [
        'details',
        'entity'
    ],
    pipes: [
        TruncatePipe
    ],
    template: `
        <div>
            <div>
                <img *ngIf="thumbnailImage !== ''" [src]="thumbnailImage" [alt]="details?.name">
                <div *ngIf="thumbnailImage === ''" class="placeholder"></div>
            </div>
            <div>
                <span class="search">
                    {{ details.name | truncate:35 }}
                </span>
                <span *ngIf="entity !== 'artist'" class="artist">
                    {{ details.artist | truncate:35 }}
                </span>
                <i *ngIf="!favoritesService.isFavorite(details.mbid)" (click)="addFavorite(details)" class="fa fa-plus"></i>
            </div>
        </div>
    `
})
export class Result {
    constructor (favoritesService: FavoritesService) {
        this.favoritesService = favoritesService;
    }

    ngOnInit() {
        this.details = this.details || {};
        this.entity = this.entity || {};
        this.thumbnailImage = this.getImage(this.details.image, 3);
    }

    getImage(images, index) {
        let imageUrl = '';
        if (images && images.length && images[index] && images[index]['#text']) {
            imageUrl = images[index]['#text'];
        }
        return imageUrl
    }

    addFavorite(artist) {
        if (artist) {
            let favorite = new ArtistFavorite(artist.mbid, artist.name, this.getImage(artist.image, 3), this.getImage(artist.image, 2));
            this.favoritesService.addFavorite(favorite);
        }
    }

}