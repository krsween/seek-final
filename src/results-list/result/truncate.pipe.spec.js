// NG2
import {it, describe, expect, beforeEachProviders, inject} from 'angular2/testing';

// App
import {TruncatePipe} from './truncate.pipe';

describe('Pipe: TruncatePipe', () => {
    beforeEachProviders(() => [
        TruncatePipe
    ]);

    it('should return a truncated string.', inject([TruncatePipe], (truncatePipe) => {
        expect(truncatePipe.transform).toBeDefined();
        let mockString = 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ';
        expect(truncatePipe.transform(mockString, 30)).toBe('Lorem ipsum dolor sit amet. Lo...');
        expect(truncatePipe.transform(mockString, 5)).toBe('Lorem...');
    }));
});