import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as TimelineService from './ProductTimeline/ProductTimelineService';
import * as TotalInvestmentForPool from '../Models/ITotalInvestmentForPool';

@Injectable()
export class TotalInvestmentResolve implements Resolve<TotalInvestmentForPool.ITotalInvestmentForPool[]> {
    constructor(private productTimelineService: TimelineService.ProductTimelineService) { }

    resolve(route: ActivatedRouteSnapshot, state: Object) {
        let raceDayKey = route.params['raceDayKey'];

        return this.productTimelineService.getTotalInvestmentsForPools(raceDayKey);
    }
}