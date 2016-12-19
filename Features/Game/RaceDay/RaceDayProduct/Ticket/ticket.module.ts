import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {TicketComponent} from './TicketComponent';
import ProgramInfoComponent from './ProgramInfo/ProgramInfoComponent';
import MarkingsButtonComponent from './MarkingsButton/MarkingsButtonComponent';
import LegMarksRowComponent from './LegMarksRow/LegMarksRowComponent';
import {PipesModule} from '../../../../Common/PipesModule';

@NgModule({
    imports: [BrowserModule, HttpModule, PipesModule],
    exports: [
        TicketComponent,
        ProgramInfoComponent
    ],
    declarations: [
        TicketComponent,
        ProgramInfoComponent,
        MarkingsButtonComponent,
        LegMarksRowComponent
    ],
    providers: []
})
export class TicketModule {
}