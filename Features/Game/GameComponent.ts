import { Component, OnInit } from '@angular/core';
import {LocationChangeListener } from '@angular/common';
import { Router, ActivatedRouteSnapshot, ActivatedRoute /*, NavigationEnd, NavigationStart */} from '@angular/router';
import { UiService } from '../Common/UiService/UiService';
import * as Index from '../Common/Enums/index';
import * as _ from 'lodash';
@Component({
    selector: 'game',
    templateUrl: "GameComponent.tpl.html",
    providers: [UiService]
})
export class GameComponent implements OnInit {
    public uiService: UiService;

    constructor(uiService: UiService, private router: Router, private route: ActivatedRoute/*, $transitions: any, $stateParams: IProductTimelineStateParams*/) {
        this.uiService = uiService;
    }

    ngOnInit(): void {
       
        // this.router.events.filter(ev => ev instanceof NavigationEnd).subscribe((val:NavigationEnd) => {
        //     let collection = val.url.split('/');
        //     let length = _.filter(collection, segment => !(!segment)).length;
        //     if (length === 1) {
        //         this.uiService.setStateName('timeline');
        //     }
        //     else if (length >= 2) {
        //         this.uiService.setStateName('product');
        //     } else {
        //         this.uiService.setStateName('game');
        //     }
        //     this.uiService.setRaceDayParams(collection[0], collection[1]);
        // });
   }
}
