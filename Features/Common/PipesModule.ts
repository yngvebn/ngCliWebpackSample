import { CurrencyPipe, DecimalPipe } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { PresentProductAsShortText, PresentProductAsText } from './Enums/BetTypeCode';
import { PresentSportTypeAsText } from './Enums/SportType';
import {AmDateFormat} from './Enums/AmDateFormat';
import KronerPipe from './Filters/Kroner';
import { PresentStartMethodAsText }from './Enums/StartMethod';
import Tall from './Filters/Tall';
import Prosent from './Filters/Prosent';

const allPipes: any[] = [
    PresentProductAsShortText,
    PresentProductAsText,
    PresentSportTypeAsText,
    AmDateFormat,
    KronerPipe,
    PresentStartMethodAsText,
    Tall,
    Prosent
];

@NgModule({
    imports: [],
    declarations: allPipes,
    providers: [CurrencyPipe, DecimalPipe],
    exports: allPipes
})
export class PipesModule {}