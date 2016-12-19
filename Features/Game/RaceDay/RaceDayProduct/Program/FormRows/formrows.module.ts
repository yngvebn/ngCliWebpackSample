import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import FormRowsLargeComponent from './FormRowsLargeComponent';
import FormRowsSmallComponent from './FormRowsSmallComponent';
import FormRowsService from './FormRowsService';
import {PipesModule} from '../../../../../Common/PipesModule';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        PipesModule
    ],
    exports: [
        FormRowsLargeComponent,
        FormRowsSmallComponent
    ],
    declarations: [
        FormRowsLargeComponent,
        FormRowsSmallComponent
    ],
    providers: [
        FormRowsService
    ]
})
export class FormRowsModule {
}