// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, tick, inject, fakeAsync, TestComponentBuilder, beforeEachProviders} from 'angular2/testing';
// App
import {ResultsList} from './results-list.component';
import {HttpService, MockHttpService} from '../services/http-service.service';


describe('Component: ResultsList', () => {
    beforeEachProviders(() => [
        provide(HttpService, {useClass: MockHttpService}),
        ResultsList
    ]);


    it('should render its HTML template.', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(ResultsList)
            .then(fixture => {
                fixture.detectChanges();

                expect(fixture.nativeElement.innerHTML).toContain('results');

            });
    }));

    describe('Function: searchForArtist(query)', () => {
        it('should be defined', inject([ResultsList], fakeAsync(resultsList => {

            spyOn(resultsList.httpService, 'findArtists').and.callThrough();

            expect(resultsList.searchForArtist).toBeDefined();

            resultsList.searchForArtist(1);
            resultsList.searchForArtist(2);
            resultsList.searchForArtist(3);
            resultsList.searchForArtist(4);


            tick(501);

            expect(resultsList.httpService.findArtists).toHaveBeenCalledWith(4);
            expect(resultsList.httpService.findArtists).toHaveBeenCalledTimes(1);
        })));
    });

});