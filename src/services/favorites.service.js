// NG2
import {Injectable} from 'angular2/core';


@Injectable()
export class FavoritesService {
    constructor() {
        // Storage key for localStorage
        this.storageKey = 'favoritesService';
        // See if localStorage is enabled
        this.isLocalStorageEnabled = (() => {
            try {
                localStorage.setItem('1', '1');
                localStorage.removeItem('1');
                return true;
            } catch (error) {
                return false
            }
        })();
        // On init set local favorites
        this.favorites = this.getFavoritesFromStorage();
    }

    getFavoritesFromStorage() {
        let localFavorites = [];
        if (this.isLocalStorageEnabled) {
            let stringLocalFavorites = localStorage.getItem(this.storageKey);
            if (stringLocalFavorites) {
                localFavorites = JSON.parse(stringLocalFavorites);
            }
        }
        return localFavorites;
    }

    getFavorites() {
        return this.favorites;
    }


    addFavorite(favorite) {
        if (favorite) {
            let currentFavorites = this.getFavorites();
            currentFavorites.push(favorite);
            if (this.isLocalStorageEnabled) {
                localStorage.setItem(this.storageKey, JSON.stringify(currentFavorites));
            }
            this.favorites = currentFavorites;
        }
    }

    removeFavorite(id) {
        if (this.favorites) {
            let favoriteIndex = this.favorites.findIndex(favorite => favorite.id === id);
            this.favorites.splice(favoriteIndex, 1);
            if (this.isLocalStorageEnabled) {
                localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
            }
        }
    }

    isFavorite(id) {
        return this.favorites.some(favorite => {
            return favorite.id === id;
        })
    }
}



export class MockFavoritesService {
    getFavoritesFromStorage() {
        return [];
    }
    getFavorites() {
        return [];
    }

    addFavorite() {}

    removeFavorite() {}

    isFavorite() {
        return false;
    }
}