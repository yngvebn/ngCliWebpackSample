import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import BetCostComponent from './BetCostComponent';
import BetCostMobileComponent from './BetCostMobile/BetCostMobileComponent';
import RowPriceMobileComponent from './BetCostMobile/RowPriceMobile/RowPriceMobileComponent';
import EditableSelectComponent from './EditableSelect/EditableSelectComponent';
import {BetDataModule} from '../../../../Common/BetData/betdata.module';
import {PipesModule} from '../../../../Common/PipesModule';
import {ValidationModule} from '../../../../Common/Validation/validation.module';
import {RowCalculatorModule} from '../../../../Common/RowCalculator/rowcalculator.module';

@NgModule({
    entryComponents: [RowPriceMobileComponent],
    imports: [BetDataModule, BrowserModule, PipesModule, FormsModule, ValidationModule, HttpModule, RowCalculatorModule],
    exports: [
        BetCostComponent,
        BetCostMobileComponent
    ],
    declarations: [
        BetCostComponent,
        BetCostMobileComponent,
        RowPriceMobileComponent,
        EditableSelectComponent
    ],
    providers: []
})
export class BetCostModule {
}