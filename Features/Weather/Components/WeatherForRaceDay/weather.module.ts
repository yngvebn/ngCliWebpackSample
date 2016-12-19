import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import WeatherForRaceDayComponent from './WeatherForRaceDayComponent';
import WeatherForRaceDayService from './WeatherForRaceDayService';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    exports: [
        WeatherForRaceDayComponent
    ],
    declarations: [
        WeatherForRaceDayComponent
    ],
    providers: [
        WeatherForRaceDayService
    ]
})
export class WeatherModule {
}