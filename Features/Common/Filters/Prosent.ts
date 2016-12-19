import { Pipe, PipeTransform } from '@angular/core';
import Tall from './Tall';

@Pipe({ name: "prosent" })
export default class Prosent implements PipeTransform {
    transform(input, ...args: any[]) {
        let suffix = args[0] || '%';

        if (isNaN(input) || input === null) {
            return '';
        }

        return Tall.toTall(input) + suffix;
    }
}
