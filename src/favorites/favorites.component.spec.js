// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders, inject} from 'angular2/testing';
// App
import {Favorites} from './favorites.component';
import {FavoritesService, MockFavoritesService} from '../services/favorites.service';


describe('Component: Favorites', () => {
    beforeEachProviders(() => [
        provide(FavoritesService, {useClass: MockFavoritesService}),
        Favorites
    ]);

    it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(Favorites)
            .then(fixture => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.innerHTML).toContain('My Favorite Artists');
            });
    }));


    describe('Function: goToArtist(artist)', () => {
        it('should be defined.', inject([Favorites], (favorites) => {
            expect(favorites.goToArtist).toBeDefined();
        }));
    });

});