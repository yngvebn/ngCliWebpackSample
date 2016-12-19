console.assert('', "Uhoh, Something was not defined, likely part of a circular reference loop");

import * as _ from 'lodash';

import BetTypeCode from '../../../Common/Enums/BetTypeCode';

import ActiveRace from '../../Models/ActiveRace';
import ProgressStatus from '../../../Common/Enums/ProgressStatus';
import * as MultiLegProductForTimeline from '../../Models/IMultiLegProductForTimeline';
import * as SingleLegProductForTimeline from '../../Models/ISingleLegProductForTimeline';
import * as ProductForTimeline from '../../Models/IProductForTimeline';
import { IProductsForRaceDay } from '../../Models/IProductsForRaceDay';

export default class ProductsForRaceDay {
    public raceDayKey: string;
    public races: ActiveRace[];
    public products: (MultiLegProductForTimeline.IMultiLegProductForRaceDay | SingleLegProductForTimeline.ISingleLegProductForRaceDay)[];

    constructor(productsForRaceDay: IProductsForRaceDay) {
        this.raceDayKey = productsForRaceDay.raceDayKey;
        this.races = this.setStatusForMovedRaces(productsForRaceDay.races.map(race => new ActiveRace(race)));
        this.products = productsForRaceDay.products;
        this.combineWinPlaceForProductTimeline();
    }

    public setStatusForMovedRaces(races: ActiveRace[]): ActiveRace[] {
        _.forEach(races, race => {
            let hasRacesWithEarlierStartTime = _.chain(races)
                .takeRightWhile((otherRace: ActiveRace) => otherRace.raceNumber > race.raceNumber)
                .some((otherRace: ActiveRace) => {
                    return otherRace.startTime < race.startTime;
                })
                .value();
            race.hasBeenMoved = hasRacesWithEarlierStartTime;
        });
        return races;
    }

    public combineWinPlaceForProductTimeline() {
        let loDashExplicitArrayWrapper = _.chain(this.products)
            .filter((p: ProductForTimeline.IProductForTimeline) => p.product === BetTypeCode.V || p.product === BetTypeCode.P)
            .map((p: SingleLegProductForTimeline.ISingleLegProductForRaceDay) => _.map(p.races, (race: IRaceForSingleLegGame) => race.raceNumber));

        let lengthOfDifferentRaces = _.difference.apply(this, loDashExplicitArrayWrapper.value()).length;

        var winAndPlaceInSameRaces = lengthOfDifferentRaces === 0;

        if (!winAndPlaceInSameRaces) return;
        let win: SingleLegProductForTimeline.ISingleLegProductForRaceDay = <SingleLegProductForTimeline.ISingleLegProductForRaceDay>_.find(this.products, (product: SingleLegProductForTimeline.ISingleLegProductForRaceDay) => product.product === BetTypeCode.V);
        let place: SingleLegProductForTimeline.ISingleLegProductForRaceDay = <SingleLegProductForTimeline.ISingleLegProductForRaceDay>_.find(this.products, (product: SingleLegProductForTimeline.ISingleLegProductForRaceDay) => product.product === BetTypeCode.P);
        if (win) {
            win.product = 'VP'; // BetTypeCode is not really an enum, so we need to provide the code-string-value.
            this.products = _.without<MultiLegProductForTimeline.IMultiLegProductForRaceDay | SingleLegProductForTimeline.ISingleLegProductForRaceDay>(this.products, place);
        }
    }

    private updateStatusForMovedRaces() {
        this.races = this.setStatusForMovedRaces(this.races);
    }

    public getRace(raceNumber: number): ActiveRace {
        return _.find(this.races, r => r.raceNumber === raceNumber);
    }

    public postponeRace(raceNumber: number, newStartTime: Date) {
        this.getRace(raceNumber).postpone(newStartTime);
        this.updateStatusForMovedRaces();
    }

    public raceStatusChanged(raceNumber: number, newStatus: ProgressStatus) {
        this.getRace(raceNumber).progressStatus = newStatus;
        this.setStatusForSingleLegGameProducts();
    }


    private setStatusForSingleLegGameProducts() {
        _.chain(this.products)
            .filter((product: ProductForTimeline.IProductForTimeline) => product.isSingleLegGame)
            .forEach((singleLegProduct: SingleLegProductForTimeline.ISingleLegProductForRaceDay) => {
                let noMoreRacesAvailableForSell = _.every(singleLegProduct.races, race => {
                    let activeRace = this.getRace(race.raceNumber);
                    return activeRace.progressStatus !== ProgressStatus.Future;
                });

                singleLegProduct.progressStatus = noMoreRacesAvailableForSell ? ProgressStatus.Finished : ProgressStatus.Future;
            }).value();
    }
}