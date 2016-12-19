import { NgModule, Directive } from '@angular/core';
import {MaxPriceDirective} from "./MaxPriceDirective";

export const CUSTOM_FORM_DIRECTIVES: Directive[] = [
    MaxPriceDirective
];

@NgModule({
    declarations: [
        CUSTOM_FORM_DIRECTIVES
    ],
    exports: [
        CUSTOM_FORM_DIRECTIVES
    ]
})
export class ValidationModule {}