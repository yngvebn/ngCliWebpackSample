import { IRowCalculator } from './IRowCalculator';
import * as _ from 'lodash';

export default class DefaultRowCalculator implements IRowCalculator {
    calculate(marks: { [index: number]: number[]; }, betMethod?: string): number {
        var marksAsArray = _.toArray(marks);
        if (marksAsArray.length === 0) return 0;

        return _.chain(marksAsArray)
            .filter(a => (a.length > 0))
            .reduce((sum, num) => (sum * num.length), 1).value();
    }
}