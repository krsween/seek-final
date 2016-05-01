// NG2
import {provide} from 'angular2/core';
import {injectAsync, TestComponentBuilder, describe, it, expect, beforeEachProviders} from 'angular2/testing';
import {Router, Location} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/src/router/route_registry';
// App
import {SeekApp} from './seek.component';

describe('Component: SeekApp', () => {

    beforeEachProviders(() => [
        RouteRegistry,
        provide(Router, { useClass: RootRouter }),
        provide(ROUTER_PRIMARY_COMPONENT, { useClass: SeekApp }),
        Location
    ]);

	it('renders it\'s HTML template.', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		return tcb.createAsync(SeekApp)
			.then(fixture => {
				let componentInstance = fixture.componentInstance;
				let element = fixture.nativeElement;
				fixture.detectChanges();
				expect(element.innerHTML).toContain('navigation');
			});
	}));
});
