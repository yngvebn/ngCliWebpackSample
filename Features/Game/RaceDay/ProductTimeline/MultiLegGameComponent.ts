import { Input, Component } from '@angular/core';
import { IMultiLegProductForRaceDay } from '../../Models/IMultiLegProductForTimeline';
import * as ProductsForRaceDay from '../../Models/IProductsForRaceDay';
import * as Interfaces from '../../../Common/Hubs/RaceInfoContracts/interfaces';

import * as _ from 'lodash';

@Component({
    selector: 'multi-leg-game',
    templateUrl: './Templates/MultiLegGameRow.tpl.html'
})
export default class MultiLegGameComponent {
    @Input()
    public productForTimeline: IMultiLegProductForRaceDay;

    @Input()
    selectedRaceDay: any;

    @Input()
    productsForRaceDay: ProductsForRaceDay.IProductsForRaceDay;


    private isRacePartOfGame(race: Interfaces.IRace, game: IMultiLegProductForRaceDay) {
        return _.some(game.races, r => r === race.raceNumber);
    }

}