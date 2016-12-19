import * as _ from 'lodash';

export default class BitMapper {

    public static toBitmap(marks: number[]) {
        return _.reduce(marks, (num, mark) => (num + Math.pow(2, (parseInt(mark.toString())))), 0);
    }

    public static fromBitmap(markBitmap) {
        var marksArray = [];
        var index = 1;
        while (markBitmap > 0 && index < 100) {
            if ((markBitmap & Math.pow(2, index)) === Math.pow(2, index)) {
                marksArray.push(index);
                markBitmap -= Math.pow(2, index);
            }
            index++;
        }
        return marksArray;
    }
}