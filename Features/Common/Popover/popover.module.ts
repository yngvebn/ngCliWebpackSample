import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PopOverComponent } from './PopOverComponent';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopOverComponent
    ],
    exports: [
        PopOverComponent
    ],
    entryComponents: [
        PopOverComponent
    ]
})
export class PopOverModule {
}