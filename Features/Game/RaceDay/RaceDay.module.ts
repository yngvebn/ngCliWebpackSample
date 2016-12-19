import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterLink, RouterOutlet} from '@angular/router';
import {RaceDayProductModule} from './RaceDayProduct/racedayproduct.module';
import {RaceDayComponent} from './RaceDayComponent';
import {RaceDayService} from './RaceDayService';
import {SelectedRaceDayResolve} from './SelectedRaceDayResolve';
import {TotalInvestmentResolve} from './TotalInvestmentResolve';
import {PipesModule} from '../../Common/PipesModule';
import {WeatherModule} from '../../Weather/Components/WeatherForRaceDay/weather.module';
import {ProductsForRacedayResolve} from './ProductsForRaceDayResolve';
import {CommonServiceModule} from '../../Common/commonservice.module';
import {CommonComponentModule} from '../../Common/commoncomponent.module';

@NgModule({
    imports: [
        RaceDayProductModule,
        BrowserModule,
        HttpModule,
        PipesModule,
        WeatherModule,
        CommonServiceModule,
        CommonComponentModule
    ],
    exports: [
        RaceDayComponent
    ],
    declarations: [
        RaceDayComponent
    ],
    providers: [
        RaceDayService,
        SelectedRaceDayResolve,
        TotalInvestmentResolve,
        ProductsForRacedayResolve,
        RouterLink, RouterOutlet
    ]
})
export class RaceDayModule {
    
}