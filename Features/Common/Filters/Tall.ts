import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "tall" })
export default class Tall implements PipeTransform {
    transform(value, ...args: any[]) {
        return Tall.toTall(value);
    }

    static toTall(value) {
        if (isNaN(value) || value === null) {
            return '';
        }

        return value.toString().replace('.', ',');
    }
}