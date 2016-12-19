import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import '../rxjs-operators';

import {GameRoutes} from './game.routes';

import { ChannelService, ChannelConfig, SignalrWindow } from '../Common/Signalr/ChannelService';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

import * as RouteConfig from '../Common/Routes/Routes';
import * as TimelineService from './RaceDay/ProductTimeline/ProductTimelineService';
import PriceInfoForProductResolve from './RaceDay/RaceDayProduct/PriceInfoForProductResolve';
import BettingInfoService from '../BettingInfo/BettingInfoService';

import { GameComponent } from './GameComponent';
import {ModalComponent} from '../Common/Modal/ModalComponent';

import ProductTimelineModule from './RaceDay/ProductTimeline/ProductTimeline.module';
import * as Breakpointsmodule from '../Common/UiService/Breakpoints.module';
import {ModalModule} from '../Common/Modal/modal.module';
import { PipesModule } from '../Common/PipesModule';
import {ValidationModule} from "../Common/Validation/validation.module";
import {BetCostModule} from './RaceDay/RaceDayProduct/BetCost/betcost.module';
import {BetDataModule} from '../Common/BetData/betdata.module';
import {TicketModule} from './RaceDay/RaceDayProduct/Ticket/ticket.module';
import {AuthenticationModule} from '../Authentication/authentication.module';
import {RaceDayModule} from './RaceDay/RaceDay.module';
import {RaceDaySelectorModule} from './RaceDaySelector/racedayselector.module';

let channelConfig = new ChannelConfig();
channelConfig.url = "/signalr";
channelConfig.hubName = "raceInfoHub";

@Component({
    selector: 'game-root',
    template: `
          <main>
              <router-outlet></router-outlet>            
          </main> 
          `
})
export class GameRoot implements OnInit {
    constructor(private route: ActivatedRoute) {

    }
    ngOnInit(): void {
        this.route.params.subscribe(params => {
        });
    }
}


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [BrowserModule,
        RouterModule.forRoot(GameRoutes),
        PipesModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ModalModule,
        ProductTimelineModule,
        Breakpointsmodule.BreakpointsModule,
        ValidationModule,
        BetCostModule,
        BetDataModule,
        AuthenticationModule,
        TicketModule,
        RaceDayModule,
        RaceDaySelectorModule
    ],
    declarations: [
        GameRoot,
        GameComponent
    ],
    bootstrap: [GameRoot],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        BettingInfoService,
        TimelineService.ProductTimelineService,
        PriceInfoForProductResolve,
        ChannelService,
        { provide: SignalrWindow, useValue: window },
        { provide: 'channel.config', useValue: channelConfig }
    ]
})
export class GameModule { }
