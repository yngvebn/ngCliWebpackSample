import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as TimelineService from '../ProductTimelineService';
import ProductsForRaceDay from '../ProductsForRaceDay';
import ActiveRace from '../../../Models/ActiveRace';

import * as MultiLegProductForTimeline from '../../../Models/IMultiLegProductForTimeline';
import * as ProductForTimeline from '../../../Models/IProductForTimeline';
import * as SingleLegProductForTimeline from '../../../Models/ISingleLegProductForTimeline';

import * as _ from 'lodash';
import * as ActiveRaceDay from '../../../Models/IActiveRaceDay';
import * as TotalInvestmentForPool from '../../../Models/ITotalInvestmentForPool';

@Component({
    templateUrl: "ProductTimelineSmall.tpl.html",
    selector: 'product-timeline-small'
})
export default class ProductTimelineComponentSmall implements OnInit{


    @Input() public selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    @Input() public productsForRaceDay: ProductsForRaceDay;

    public raceDay: string;

    public expandedSingleLegGames: { [product: string]: boolean } = {};

    public toggleExpandRaces(game: SingleLegProductForTimeline.ISingleLegProductForRaceDay) {
        if (game.races.length === 1)
            return;

        this.expandedSingleLegGames[game.product.toString()] = !this.expandedSingleLegGames[game.product.toString()];
    }


    public hasMultipleInvestments(race: IRaceForSingleLegGame): boolean {
        return Object.keys(race.totalInvestment).length > 1;
    }

    private getRace(raceNumber: number): ActiveRace {
        return _.find(this.productsForRaceDay.races, r => r.raceNumber === raceNumber);
    }

    public getMultiLegGameStartTime(product: MultiLegProductForTimeline.IMultiLegProductForRaceDay): Date {
        return this.getRace(product.races[0]).startTime;
    }

    ngOnInit(): void {
    }
}