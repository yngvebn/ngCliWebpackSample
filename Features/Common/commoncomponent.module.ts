import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import btnComponent from './Components/Button/btnComponent';
import {IconComponent} from './Components/Icon/IconComponent';
import SpinnerComponent from './Components/Spinner/SpinnerComponent';
import RaceStartComponent from './Components/RaceStart/RaceStartComponent';

let ALL = [
    btnComponent,
    IconComponent,
    SpinnerComponent,
    RaceStartComponent
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    exports: [ALL],
    declarations: [ALL],
    providers: []
})
export class CommonComponentModule {
}