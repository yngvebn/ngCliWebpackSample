import { Input, Component } from '@angular/core';
import { IMultiLegProductForRaceDay } from '../../../Models/IMultiLegProductForTimeline';
import * as Interfaces from '../../../../Common/Hubs/RaceInfoContracts/interfaces';
import * as MultiLegProductForTimeline from '../../../Models/IMultiLegProductForTimeline';
import { IProductForTimeline } from '../../../Models/IProductForTimeline';

import ProductsForRaceDay from '../ProductsForRaceDay';
import ActiveRace from '../../../Models/ActiveRace';

import * as _ from 'lodash';

@Component({
    selector: 'multi-leg-game-small',
    templateUrl: 'MultiLegGameRowSmall.tpl.html'
})
export default class MultiLegGameComponentSmall {
    @Input()
    public productForTimeline: IMultiLegProductForRaceDay;

    @Input() selectedRaceDay: any;

    @Input() productsForRaceDay: ProductsForRaceDay;


    private isRacePartOfGame(race: Interfaces.IRace, game: IMultiLegProductForRaceDay) {
        return _.some(game.races, r => r === race.raceNumber);
    }

    private getRace(raceNumber: number): ActiveRace {
        return _.find(this.productsForRaceDay.races, r => r.raceNumber === raceNumber);
    }

    public getMultiLegGameStartTime(product: MultiLegProductForTimeline.IMultiLegProductForRaceDay): Date {
        return this.getRace(product.races[0]).startTime;
    }
}