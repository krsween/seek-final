// NG2
import {provide} from 'angular2/core';
import {it, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders, inject} from 'angular2/testing';
// App
import {Favorite} from './favorite.component';


describe('Component: Favorite', () => {
    beforeEachProviders(() => [
        Favorite
    ]);

    it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(Favorite)
            .then(fixture => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.innerHTML).toContain('div');
            });
    }));
});