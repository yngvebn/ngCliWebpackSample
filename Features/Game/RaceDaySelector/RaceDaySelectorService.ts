import { Injectable } from '@angular/core';
import { GenericDataService, IHttpResult, IRestResult } from '../../Common/GenericDataService';import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import * as ActivePoolsForRaceDayGroupedByDate from '../Models/IActivePoolsForRaceDayGroupedByDate';
import * as ActivePoolsForRaceDay from '../Models/IActivePoolsForRaceDay';
import * as ProductForRaceDay from '../Models/IProductForRaceDay';
import BetTypeCode from '../../Common/Enums/BetTypeCode';
import ProgressStatus from '../../Common/Enums/ProgressStatus';
import { IGame, IRaceStatusChanged, IRace  } from '../../Common/Hubs/RaceInfoContracts/interfaces';

@Injectable()
export class RaceDaySelectorService {

    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public getActiveRaceDays(): Promise<ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[]> {
        return this.genericDataService.get<ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[]>("/api/game/racedays");
    }

    public setOpenForBet(raceDaysGroupedByDate: ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[], race: IRaceStatusChanged, isOpenForBet: boolean) {
        let affectedRaceDay: ActivePoolsForRaceDay.IActivePoolsForRaceDay = this.getRaceDay(raceDaysGroupedByDate, race.raceDay);

        if (!affectedRaceDay)
            return;

        _.forEach(affectedRaceDay.products, (p: ProductForRaceDay.IProductForRaceDay) => {
            if (p.raceNumber && !p.isAbandoned && p.raceNumber === race.raceNumber)
                p.isOpenForBet = isOpenForBet;

            if (_.some(race.affectedMultiLegGames, (affected: BetTypeCode) => (!p.isAbandoned && affected === p.product)))
                p.isOpenForBet = isOpenForBet;
        });
    }

    public setProductHasBeenAbandoned(raceDaysGroupedByDate: ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[], race: IRace) {
        let affectedRaceDay: ActivePoolsForRaceDay.IActivePoolsForRaceDay = this.getRaceDay(raceDaysGroupedByDate, race.raceDay);

        if (!affectedRaceDay)
            return;

        _.forEach(affectedRaceDay.products, (product: ProductForRaceDay.IProductForRaceDay) => {
            if (product.raceNumber && product.raceNumber === race.raceNumber) {
                product.isAbandoned = true;
                product.isOpenForBet = false;
            }
        });
    }

    public setMultiLegGameHasBeenAbandoned(raceDaysGroupedByDate: ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[], race: IGame) {
        let affectedRaceDay: ActivePoolsForRaceDay.IActivePoolsForRaceDay = this.getRaceDay(raceDaysGroupedByDate, race.raceDay);

        if (!affectedRaceDay)
            return;

        let affectedProduct: ProductForRaceDay.IProductForRaceDay = _.find(affectedRaceDay.products, product => (product.product === race.product));

        if (affectedProduct) {
            affectedProduct.isAbandoned = true;
            affectedProduct.isOpenForBet = false;
        }
    }

    public setRaceDayStatus(raceDaysGroupedByDate: ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[], raceDay: string, status: ProgressStatus) {
        let affectedRaceDay: ActivePoolsForRaceDay.IActivePoolsForRaceDay = this.getRaceDay(raceDaysGroupedByDate, raceDay);

        if (!affectedRaceDay || affectedRaceDay.progressStatus === ProgressStatus.Abandoned)
            return;

        affectedRaceDay.progressStatus = status;
    }

    public getRaceDay(raceDaysGroupedByDate: ActivePoolsForRaceDayGroupedByDate.IActivePoolsForRaceDayGroupedByDate[], raceDayToFind: string): ActivePoolsForRaceDay.IActivePoolsForRaceDay {
        return _.find(_.chain(raceDaysGroupedByDate).map('poolsForRaceDay').flatten().value() as ActivePoolsForRaceDay.IActivePoolsForRaceDay[], r => (r.raceDay === raceDayToFind));
    }
}