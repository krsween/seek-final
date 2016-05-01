// NG2
import {provide} from 'angular2/core';
import {Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {it, describe, expect, inject, beforeEachProviders} from 'angular2/testing';
// App
import {HttpService} from './http-service.service';

describe('Service: HttpService', () => {

    beforeEachProviders(() => [
        HttpService,
        provide(Http, {useClass: MockBackend})
    ]);

    describe('Function: getTopAlbums(artist)', () => {
        it('should be defined', inject([HttpService], (httpService) => {
            expect(httpService.getTopAlbums).toBeDefined();
        }));
    });

    describe('Function: getSimilarArtists(artist)', () => {
        it('should be defined', inject([HttpService], (httpService) => {
            expect(httpService.getSimilarArtists).toBeDefined();
        }));
    });

    describe('Function: getArtistInfo(artist)', () => {
        it('should be defined', inject([HttpService], (httpService) => {
            expect(httpService.getArtistInfo).toBeDefined();
        }));
    });

    describe('Function: findArtists(query)', () => {
        it('should be defined', inject([HttpService], (httpService) => {
            expect(httpService.findArtists).toBeDefined();
        }));
    });
});