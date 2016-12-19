import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import BettingInfoService from '../../../BettingInfo/BettingInfoService';

@Injectable()
export default class BettingSystemIsOpenForBetResolve implements Resolve<boolean> {
    constructor(private bettingInfoService: BettingInfoService) {  }
    resolve(route: ActivatedRouteSnapshot, state: Object) {
        return this.bettingInfoService.getIsBettingSystemOpenForBet();
    }
}