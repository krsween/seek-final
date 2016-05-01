// NG2
import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
// App
import {Navigation} from './navigation.component';

describe('Component: Navigation', () => {
   it('should render its HTML partial', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       return tcb.createAsync(Navigation)
           .then(fixture => {
               let element = fixture.nativeElement;
               fixture.detectChanges();
               expect(element.innerHTML).toContain('Seek');
           });
   }));
});