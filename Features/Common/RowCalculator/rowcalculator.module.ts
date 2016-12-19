import {NgModule} from '@angular/core';
import RowCalculatorFactory from './RowCalculatorFactory';
import DefaultRowCalculator from './Calculators/DefaultRowCalculator';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        DefaultRowCalculator,
        RowCalculatorFactory
    ]
})
export class RowCalculatorModule {
}