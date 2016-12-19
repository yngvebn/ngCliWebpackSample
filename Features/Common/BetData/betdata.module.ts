import {NgModule} from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import * as BetData from './BetDataService';
import BetDataDefinition from './BetDataDefinition';
import BetDataHelper from './BetDataHelper';
import BitMapper from './BitMapper';

@NgModule({
    imports: [
        HttpModule,
        JsonpModule
    ],
    providers: [
        BetData.BetDataService,
        BetDataDefinition,
        BetDataHelper,
        BitMapper
    ]
})
export class BetDataModule {
}