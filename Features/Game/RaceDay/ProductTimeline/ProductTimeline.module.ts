import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../Common/PipesModule';
import {RouterLink, RouterOutlet } from '@angular/router';
import ProductTimelineComponent from './ProductTimelineComponent';
import MultiLegGameComponent from './MultiLegGameComponent';
import SingleLegGameComponent from './SingleLegGameComponent';
import ProductTimelineComponentLarge from './Templates/ProductTimelineComponentLarge';
import ProductTimelineComponentSmall from './Templates/ProductTimelineComponentSmall';
import MdTooltipComponent from '../../../Common/Components/md-tooltip/MdTooltipComponent';
import * as Breakpointsmodule from '../../../Common/UiService/Breakpoints.module';
import MultiLegGameComponentSmall from './Templates/MultiLegGameComponentSmall';
import {PopOverModule} from '../../../Common/Popover/popover.module';
import {CommonServiceModule} from '../../../Common/commonservice.module';
import {CommonComponentModule} from '../../../Common/commoncomponent.module';

@NgModule({
    imports: [BrowserModule, PipesModule, Breakpointsmodule.BreakpointsModule, PopOverModule, CommonServiceModule, CommonComponentModule ],
    declarations: [
        ProductTimelineComponent,
        MultiLegGameComponent,
        SingleLegGameComponent,
        ProductTimelineComponentLarge,
        ProductTimelineComponentSmall,
        MdTooltipComponent,
        MultiLegGameComponentSmall,
        RouterLink, RouterOutlet
    ],
    providers: [],
    exports: [ProductTimelineComponent, MdTooltipComponent]
})
export default class ProductTimelineModule{}