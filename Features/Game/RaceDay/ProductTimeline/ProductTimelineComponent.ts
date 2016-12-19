import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as TimelineService from './ProductTimelineService';
import ProductsForRaceDay from './ProductsForRaceDay';
import ActiveRace from '../../Models/ActiveRace';
import * as MultiLegProductForTimeline from '../../Models/IMultiLegProductForTimeline';
import * as ProductForTimeline from '../../Models/IProductForTimeline';
import * as SingleLegProductForTimeline from '../../Models/ISingleLegProductForTimeline';

import * as _ from 'lodash';
import * as ActiveRaceDay from '../../Models/IActiveRaceDay';
import * as TotalInvestmentForPool from '../../Models/ITotalInvestmentForPool';

@Component({
    templateUrl: "./Templates/ProductTimeline.tpl.html",
    selector: 'product-timeline'
})
export default class ProductTimelineComponent implements OnInit {
    
    public raceDay: string;
    public selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    private productTimelineService: TimelineService.ProductTimelineService;
    public productsForRaceDay: ProductsForRaceDay;
  
    public expandedSingleLegGames: { [product: string]: boolean } = {};

    /* @ngInject */
    constructor(private route: ActivatedRoute, productTimelineService: TimelineService.ProductTimelineService) {
        this.productTimelineService = productTimelineService;
    }


    ngOnInit() {
        this.route.data
            .subscribe((data: { selectedRaceDay: ActiveRaceDay.IActiveRaceDay, totalInvestment: TotalInvestmentForPool.ITotalInvestmentForPool[], productsForRaceDay: ProductsForRaceDay }) => {
    
                this.selectedRaceDay = data.selectedRaceDay;
                this.productsForRaceDay = data.productsForRaceDay;
            });
    }
    
}