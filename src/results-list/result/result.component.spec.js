// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders, inject} from 'angular2/testing';
// App
import {Result} from './result.component';
import {FavoritesService, MockFavoritesService} from '../../services/favorites.service';


describe('Component: Result', () => {
    beforeEachProviders(() => [
        provide(FavoritesService, { useClass: MockFavoritesService }),
        Result
    ]);

    it('should render its HTML template.', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(Result)
            .then(fixture => {
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toContain('div');
            });
    }));

    describe('Function: getImage(images, index)', () => {
        it('should be defined', inject([Result], (result: Result) => {
            expect(result.getImage).toBeDefined();
            let mockImages = [
                { '#text': '1' },
                { '#text': '2' },
                { '#text': '3' },
                { '#text': '4' }
            ];
            expect(result.getImage(mockImages, 0)).toBe('1');
            expect(result.getImage(mockImages, 3)).toBe('4');
            expect(result.getImage(mockImages, 4)).toBe('');
        }));
    });

    describe('Function: addFavorite(artist)', () => {
        it('should be defined', inject([Result], (result: Result) => {
            spyOn(result.favoritesService, 'addFavorite').and.callThrough();
            expect(result.addFavorite).toBeDefined();
            result.addFavorite({ mbid: 1, name: 'Derp' });
            expect(result.favoritesService.addFavorite).toHaveBeenCalled();
        }));
    });
});