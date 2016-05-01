// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders} from 'angular2/testing';
// App
import {MainView} from './main.component';
import {HttpService, MockHttpService} from '../services/http-service.service';
import {FavoritesService, MockFavoritesService} from '../services/favorites.service';

describe('Component: MainView', () => {
    beforeEachProviders(() => [
        provide(HttpService, {useClass: MockHttpService}),
        provide(FavoritesService, {useClass: MockFavoritesService})
    ]);

    it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       return tcb.createAsync(MainView)
           .then(fixture => {
               let element = fixture.nativeElement;
               fixture.detectChanges();
               expect(element.innerHTML).toContain('section');
           });
   }));
});