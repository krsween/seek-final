// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders} from 'angular2/testing';
// App
import {SimilarArtists} from './similar-artists.component';
import {HttpService, MockHttpService} from '../../services/http-service.service';

describe('Component: SimilarArtists', () => {
    beforeEachProviders(() => [
        provide(HttpService, {useClass: MockHttpService})
    ]);

    it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(SimilarArtists)
            .then(fixture => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.innerHTML).toContain('section');
            });
    }));
});