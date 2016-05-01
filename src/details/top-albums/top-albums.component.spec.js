// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders, inject} from 'angular2/testing';
// App
import {TopAlbums} from './top-albums.component';
import {HttpService, MockHttpService} from '../../services/http-service.service';

describe('Component: TopAlbums', () => {
    beforeEachProviders(() => [
        provide(HttpService, {useClass: MockHttpService}),
        TopAlbums
    ]);

    it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TopAlbums)
            .then(fixture => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.innerHTML).toContain('section');
            });
    }));

    describe('Function: getThumbnail(album)', () => {
        it('should return an image URL from an artist object.', inject([TopAlbums], (topAlbums: TopAlbums) => {
            expect(topAlbums.getThumbnail).toBeDefined();
            let mockArtistObject = {
                image: [
                    { '#text': '1' },
                    { '#text': '2' },
                    { '#text': '3' },
                    { '#text': '4' }
                ]
            };
            expect(topAlbums.getThumbnail(mockArtistObject)).toBe('4');
        }));

        it('should return an empty string from an artist object that doesn\'t have a thumbnail.', inject([TopAlbums], (topAlbums: TopAlbums) => {
            expect(topAlbums.getThumbnail).toBeDefined();
            let mockArtistObject = {
                image: [
                    { '#text': '1' },
                    { '#text': '2' },
                    { '#text': '3' }
                ]
            };
            expect(topAlbums.getThumbnail(mockArtistObject)).toBe('');
        }));
    });
});