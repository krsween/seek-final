// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, inject, beforeEachProviders} from 'angular2/testing';
import {RouteParams, Location, Router} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/src/router/route_registry';

// App
import {DetailView} from './details.component';
import {HttpService, MockHttpService} from '../services/http-service.service';
import {FavoritesService, MockFavoritesService} from '../services/favorites.service';

class MockRouteParams {
    get() {
        return 'Artist%20Name';
    }
}

describe('Component: DetailView', () => {

    beforeEachProviders(() => [
        RouteRegistry,
        Location,
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: DetailView}),
        provide(Router, {useClass: RootRouter}),
        provide(RouteParams, {useClass: MockRouteParams}),
        provide(HttpService, {useClass: MockHttpService}),
        provide(FavoritesService, {useClass: MockFavoritesService}),
        DetailView
    ]);

    it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(DetailView)
            .then(fixture => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.innerHTML).toContain('section');
            });
    }));

    describe('Function: getMainImage()', () => {
        it('should return an image URL from a collection', inject([DetailView], (detailView) => {
            expect(detailView.getMainImage).toBeDefined();
            let mockArtistObject = {
                image: [
                    { '#text': '1' },
                    { '#text': '2' },
                    { '#text': '3' },
                    { '#text': '4' }
                ]
            };
            detailView.artistInfo = mockArtistObject;
            expect(detailView.getMainImage()).toBe('4');
        }));

        it('should return an empty string if there is not a URL present in the collection', inject([DetailView], (detailView) => {
            expect(detailView.getMainImage).toBeDefined();
            let mockArtistObject = {
                image: [
                    { '#text': '1' },
                    { '#text': '2' },
                    { '#text': '3' }
                ]
            };
            detailView.artistInfo = mockArtistObject;
            expect(detailView.getMainImage()).toBe('');
        }));
    });

    describe('Function: deleteFavorite(id)', () => {
        it('should be defined.', inject([DetailView], (detailView) => {
            expect(detailView.deleteFavorite).toBeDefined();
        }));
    });
});