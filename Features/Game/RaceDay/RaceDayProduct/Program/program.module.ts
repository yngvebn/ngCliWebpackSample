import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import ProgramComponent from './ProgramComponent';
import ProgramComponentSmall from './ProgramComponentSmall';
import ProgramComponentLarge from './ProgramComponentLarge';
import ProgramService from './ProgramService';
import {FormRowsModule} from './FormRows/formrows.module';
import HorseAnnualStatisticsComponent from './HorseAnnualStatistics/HorseAnnualStatisticsComponent';
import {PipesModule} from '../../../../Common/PipesModule';

@NgModule({
    imports: [
        FormRowsModule,
        BrowserModule,
        HttpModule,
        PipesModule
    ],
    exports: [
        ProgramComponent,
        ProgramComponentLarge,
        ProgramComponentSmall,
        HorseAnnualStatisticsComponent
    ],
    declarations: [
        ProgramComponent,
        ProgramComponentLarge,
        ProgramComponentSmall,
        HorseAnnualStatisticsComponent
    ],
    providers: [
        ProgramService
    ]
})
export class ProgramModule {
}