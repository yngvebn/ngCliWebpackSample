import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RaceDayProductComponent } from './RaceDayProductComponent';
import {RouterLink} from '@angular/router';
import {HttpModule} from '@angular/http';
import ProgramDataResolve from './ProgramDataResolve';
import BettingSystemIsOpenForBetResolve from './BettingSystemIsOpenForBetResolve';
import {TicketModule} from './Ticket/ticket.module';
import {PurchaseModule} from './Purchase/purchase.module';
import {BetCostModule} from './BetCost/betcost.module';
import LegMenuComponent from './LegMenu/LegMenuComponent';
import {ProgramModule} from './Program/program.module';
import {PipesModule} from '../../../Common/PipesModule';
import {BreakpointsModule} from '../../../Common/UiService/Breakpoints.module';
import {DoubleOddsComponent} from './Odds/DoubleOddsComponent';
import {CommonComponentModule} from '../../../Common/commoncomponent.module';
import {DoubleOddsService} from './Odds/DoubleOddsService';
import {GoogleTagManagerModule} from '../../../Common/GoogleTagManager/googletagmanager.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        TicketModule,
        PurchaseModule,
        BetCostModule,
        ProgramModule,
        PipesModule,
        BreakpointsModule,
        CommonComponentModule,
        GoogleTagManagerModule
    ],
    exports: [
    ],
    declarations: [
        RaceDayProductComponent,
        LegMenuComponent,
        DoubleOddsComponent
    ],
    providers: [
        ProgramDataResolve,
        BettingSystemIsOpenForBetResolve,
        DoubleOddsService
    ]
})
export class RaceDayProductModule {
}