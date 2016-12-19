import { Injectable } from '@angular/core';
import * as Enums from '../Enums/';

import * as Calculators from './Calculators';

@Injectable()
export default class RowCalculatorFactory {
    calculators: { [betTypeCode: string]: Calculators.IRowCalculator } = {}

    constructor(private defaultRowCalculator: Calculators.DefaultRowCalculator) {
        //this.calculators[Enums.BetTypeCode.QPlus] = QplusRowCalculator;
        //this.calculators[Enums.BetTypeCode.VP] = vpRowCalculator;
        //this.calculators[Enums.BetTypeCode.TV] = tvRowCalculator;
    }

    get(betTypeCode: Enums.BetTypeCode) {
        if (!this.calculators[betTypeCode.toString()]) return this.defaultRowCalculator;

        return this.calculators[betTypeCode.toString()];
    }
}