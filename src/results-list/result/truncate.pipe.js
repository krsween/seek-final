// NG2
import {Pipe} from 'angular2/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe {
    transform(inputString, length) {
        let truncatedString = '';
        if (inputString && length) {
            if (inputString.length > length) {
                truncatedString = `${inputString.substring(0, length)}...`;
            } else {
                truncatedString = inputString;
            }
        }
        return truncatedString;
    }
}