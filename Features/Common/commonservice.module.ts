import {NgModule} from '@angular/core';
import {BroadcasterService} from './BroadcasterService/BroadcasterService';
import {UiService} from './UiService/UiService';
import BetDateService from './BetDate/BetDateService';
import EpiserverDataService from './EpiserverDataService/EpiserverDataService';
import ErrorMessageService from './ErrorMessages/ErrorMessageService';
import {GenericDataService} from './GenericDataService/GenericDataService';
import RaceCountdownService from './RaceCountdownService/RaceCountdownService';
import RowCalculatorFactory from './RowCalculator/RowCalculatorFactory';
import RaceInfoHub from './Hubs/RaceInfoHub';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        BroadcasterService,
        UiService,
        BetDateService,
        EpiserverDataService,
        ErrorMessageService,
        GenericDataService,
        RaceCountdownService,
        RowCalculatorFactory,
        RaceInfoHub
    ]
})
export class CommonServiceModule {
}