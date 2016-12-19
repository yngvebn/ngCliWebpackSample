import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl: 'btnComponent.tpl.html'
})
export default class btnComponent {
    @Input()
    btnSize: string;
    @Input()
    btnText: string;
    @Input()
    btnColor: string;
    @Input()
    btnSymbol: string;

    btnUrl: string;
    btnCustomSize: string;
    btnCustomColor: string;
    btnCustomSymbolUrl: string;
    iconCustomSize: string;
    constructor() {
        //this.buttonUrl = "/UI/Icons/svg-defs.svg#" + this.button;
        this.btnCustomSize = "btn--" + this.btnSize;
        this.btnCustomColor = "btn--" + this.btnColor;

        this.iconCustomSize = "icon--" + this.btnSize;
        this.btnCustomSymbolUrl = "/UI/Icons/svg-defs.svg#" + this.btnSymbol;
    }
}