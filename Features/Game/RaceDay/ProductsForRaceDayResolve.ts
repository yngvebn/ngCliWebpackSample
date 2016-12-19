import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as TimelineService from './ProductTimeline/ProductTimelineService';
import ProductsForRaceDay from './ProductTimeline/ProductsForRaceDay';

@Injectable()
export class ProductsForRacedayResolve implements Resolve<ProductsForRaceDay> {
    constructor(private productTimelineService: TimelineService.ProductTimelineService) { }

    resolve(route: ActivatedRouteSnapshot, state: Object) {
        let raceDayKey = route.params['raceDayKey'];

        return this.productTimelineService.getProductsForTimeline(raceDayKey);
    }
}