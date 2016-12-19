import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import {RaceDaySelectorComponent} from './RaceDaySelectorComponent';
import {RaceDaySelectorService} from './RaceDaySelectorService';
import {CommonComponentModule} from '../../Common/commoncomponent.module';
import {CommonServiceModule} from '../../Common/commonservice.module';
import {PipesModule} from '../../Common/PipesModule';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CommonComponentModule,
        CommonServiceModule,
        PipesModule
    ],
    exports: [
        RaceDaySelectorComponent
    ],
    declarations: [
        RaceDaySelectorComponent,
        RouterLink, RouterOutlet
    ],
    providers: [
        RaceDaySelectorService
    ]
})
export class RaceDaySelectorModule {
}