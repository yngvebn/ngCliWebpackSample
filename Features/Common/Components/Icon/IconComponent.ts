import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'icon',
    templateUrl: 'Icon.tpl.html'
})
export class IconComponent implements OnInit {
    @Input('icon-size') iconSize: string;
    @Input() icon: string;
    @Input() inverse: boolean;
    @Input('icon-color') iconColor: string;

    iconUrl: string;
    iconCustomSize: string;
    iconCustomColor: string;

    isReady: boolean;
    constructor() {
        this.isReady = false;
    }

    ngOnInit(): void {
        this.iconUrl = "/UI/Icons/svg-defs.svg#" + this.icon;
        this.iconCustomSize = "icon--" + (this.iconSize || 'icon__size__missing');
        this.iconCustomColor = "icon--" + (this.iconColor || 'custom__color__missing');
        this.isReady = true;
    }
}