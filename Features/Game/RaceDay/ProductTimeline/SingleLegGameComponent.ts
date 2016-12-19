import { Input, Component, OnInit } from '@angular/core';
import { ISingleLegProductForRaceDay } from '../../Models/ISingleLegProductForTimeline';
import BetTypeCode from '../../../Common/Enums/BetTypeCode';

import * as _ from 'lodash';
import * as ProductsForRaceDay from '../../Models/IProductsForRaceDay';

@Component({
    selector: 'single-leg-game',
    templateUrl: './Templates/SingleLegGameRow.tpl.html'
})
export default class SingleLegGameComponent implements OnInit {
    @Input()
    public productForTimeline: ISingleLegProductForRaceDay;

    @Input()
    selectedRaceDay: any;

    @Input()
    productsForRaceDay: ProductsForRaceDay.IProductsForRaceDay;

    singleLegGameRaces: { [raceNumber:string]: IRaceForSingleLegGame } =  {};

    
    ngOnInit(): void {
        this.productForTimeline.races.forEach(race => {
            this.singleLegGameRaces[race.raceNumber] = race;
        });
    }
    public getSingleLegGameRace(raceNumber: number, product: ISingleLegProductForRaceDay): IRaceForSingleLegGame {
        return _.find(product.races, r => r.raceNumber === raceNumber);
    }

    public hasSingleLegGame(raceNumber: number, product: ISingleLegProductForRaceDay): boolean {
        return _.some(product.races, r => r.raceNumber === raceNumber);
    }

    public getTotalInvestment(product: BetTypeCode) {
        if (this.productForTimeline.races[0].totalInvestment) return this.productForTimeline.races[0].totalInvestment[product.toString()];
    }

    
}