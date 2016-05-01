// NG2
import {it, describe, expect, inject, beforeEachProviders, afterEach, beforeEach} from 'angular2/testing';
// App
import {FavoritesService} from './favorites.service';

describe('Service: FavoritesService', () => {

    let mockFavorite;
    beforeEach(() => {
        mockFavorite = {
            id: 1,
            name: 'Derp'
        };
    });

    beforeEachProviders(() => [
        FavoritesService
    ]);

    it('should be defined with all of its default values', inject([FavoritesService], (favoritesService) => {
        expect(favoritesService.storageKey).toBe('favoritesService');
        expect(favoritesService.isLocalStorageEnabled).toBeTruthy();
    }));

    afterEach(() => {
        localStorage.clear();
    });

    describe('Function: getFavoritesFromStorage()', () => {
        let mockStoredFavorites;
        beforeEach(() => {
            mockStoredFavorites = [
                { id: 1 },
                { id: 2 }
            ];
        });
        it('should return an array of favorites from localStorage (when it\'s enabled).', inject([FavoritesService], (favoritesService) => {
            expect(favoritesService.getFavoritesFromStorage).toBeDefined();
            localStorage.setItem(favoritesService.storageKey, JSON.stringify(mockStoredFavorites));
            let favoritesFromStorageCall = favoritesService.getFavoritesFromStorage();
            expect(favoritesFromStorageCall.length).toBe(2);
            expect(favoritesFromStorageCall[0].id).toBe(1);
            expect(favoritesFromStorageCall[1].id).toBe(2);
        }));
        it('should return an array of favorites from localStorage (when it\'s enabled).', inject([FavoritesService], (favoritesService) => {
            expect(favoritesService.getFavoritesFromStorage).toBeDefined();
            localStorage.setItem(favoritesService.storageKey, JSON.stringify(mockStoredFavorites));
            favoritesService.isLocalStorageEnabled = false;
            let favoritesFromStorageCall = favoritesService.getFavoritesFromStorage();
            expect(favoritesFromStorageCall.length).toBe(0);
        }));
    });
    
    describe('Function: getFavorites()', () => {
        it('should be defined', inject([FavoritesService], (favoritesService: FavoritesService) => {
            expect(favoritesService.getFavorites).toBeDefined();
            expect(favoritesService.getFavorites().length).toBe(0);
        }));
    });

    describe('Function: addFavorite(favorite)', () => {
        it('should add a favorite and cache that favorite (when localStorage is enabled)', inject([FavoritesService], (favoritesService: FavoritesService) => {
            expect(favoritesService.addFavorite).toBeDefined();
            spyOn(localStorage, 'setItem').and.callThrough();
            favoritesService.addFavorite(mockFavorite);
            expect(favoritesService.favorites.length).toBe(1);
            expect(favoritesService.favorites[0].id).toBe(1);
            expect(favoritesService.favorites[0].name).toBe('Derp');
            expect(localStorage.setItem).toHaveBeenCalledWith(favoritesService.storageKey, JSON.stringify([mockFavorite]));
            let localStorageFavorite = JSON.parse(localStorage.getItem(favoritesService.storageKey));
            expect(localStorageFavorite.length).toBe(1);
            expect(localStorageFavorite[0].id).toBe(1);
            expect(localStorageFavorite[0].name).toBe('Derp');
        }));

        it('should add a favorite and not cache that favorite (when localStorage is disabled)', inject([FavoritesService], (favoritesService: FavoritesService) => {
            expect(favoritesService.addFavorite).toBeDefined();
            spyOn(localStorage, 'setItem').and.callThrough();
            favoritesService.isLocalStorageEnabled = false;
            favoritesService.addFavorite(mockFavorite);
            expect(favoritesService.favorites.length).toBe(1);
            expect(favoritesService.favorites[0].id).toBe(1);
            expect(favoritesService.favorites[0].name).toBe('Derp');
            expect(localStorage.setItem).not.toHaveBeenCalled();
        }));

    });

    describe('Function: removeFavorite(id)', () => {
        it('remove a favorite item from \'favorites\' and from localStorage (when enabled)', inject([FavoritesService], (favoritesService: FavoritesService) => {
            expect(favoritesService.removeFavorite).toBeDefined();
            expect(favoritesService.addFavorite).toBeDefined();
            spyOn(localStorage, 'setItem').and.callThrough();
            expect(favoritesService.favorites.length).toBe(0);
            favoritesService.addFavorite(mockFavorite);
            expect(favoritesService.favorites.length).toBe(1);
            expect(favoritesService.favorites[0].id).toBe(1);
            expect(favoritesService.favorites[0].name).toBe('Derp');
            favoritesService.removeFavorite(1);
            expect(favoritesService.favorites.length).toBe(0);
            expect(localStorage.setItem).toHaveBeenCalledWith(favoritesService.storageKey, JSON.stringify([mockFavorite]));
            let localStorageFavorites = JSON.parse(localStorage.getItem(favoritesService.storageKey));
            expect(localStorageFavorites.length).toBe(0);
        }));
        it('remove a favorite item from \'favorites\' and not from localStorage (when disabled)', inject([FavoritesService], (favoritesService: FavoritesService) => {
            expect(favoritesService.removeFavorite).toBeDefined();
            expect(favoritesService.addFavorite).toBeDefined();
            spyOn(localStorage, 'setItem').and.callThrough();
            expect(favoritesService.favorites.length).toBe(0);
            favoritesService.isLocalStorageEnabled = false;
            favoritesService.addFavorite(mockFavorite);
            expect(favoritesService.favorites.length).toBe(1);
            expect(favoritesService.favorites[0].id).toBe(1);
            expect(favoritesService.favorites[0].name).toBe('Derp');
            favoritesService.removeFavorite(1);
            expect(localStorage.setItem).not.toHaveBeenCalled();
            expect(favoritesService.favorites.length).toBe(0);
        }));
    });

    describe('Function: isFavorite(id)', () => {
        it('should return true is an ID is present inside of the favorites.', inject([FavoritesService], (favoritesService: FavoritesService) => {
            expect(favoritesService.isFavorite).toBeDefined();
            expect(favoritesService.addFavorite).toBeDefined();
            expect(favoritesService.removeFavorite).toBeDefined();

            favoritesService.addFavorite(mockFavorite);

            expect(favoritesService.isFavorite(1)).toBeTruthy();

            favoritesService.removeFavorite(1);

            expect(favoritesService.isFavorite(1)).toBeFalsy();
        }));
    });



});