import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { EventSubscribingComponent } from '../../Common/BaseComponent/EventSubscribingComponent';
import BetTypeCode from '../../Common/Enums/BetTypeCode';
import { UiService } from '../../Common/UiService/UiService';

import * as _ from 'lodash'
import ProductsForRaceDay from './ProductTimeline/ProductsForRaceDay';
import * as ActiveRaceDay from '../Models/IActiveRaceDay';
import * as TotalInvestmentForPool from '../Models/ITotalInvestmentForPool';
import RaceInfoHub from '../../Common/Hubs/RaceInfoHub';
import ProgressStatus from '../../Common/Enums/ProgressStatus';
import * as SingleLegProductForTimeline from '../Models/ISingleLegProductForTimeline';
import * as MultiLegProductForTimeline from '../Models/IMultiLegProductForTimeline';
import ActiveRace from '../Models/ActiveRace';
import { IGame, IRace, IPostponedRace, IRaceStatusChanged } from '../../Common/Hubs/RaceInfoContracts/interfaces';
import RaceCountdownService from '../../Common/RaceCountdownService/RaceCountdownService';

@Component({
    selector: 'race-day',
    templateUrl: "RaceDayComponent.tpl.html"
    //bindings: {
    //    selectedRaceDay: '<',
    //    productsForRaceDay: '<',
    //    totalInvestment: '<'
    //}
})
export class RaceDayComponent implements OnInit /*extends EventSubscribingComponent*/ {
    public productsForRaceDay: ProductsForRaceDay;
    public selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    public uiService: UiService;
    //public showCountdown: boolean = false;

    private totalInvestment: TotalInvestmentForPool.ITotalInvestmentForPool[];
    //private productTimelineService: ProductTimelineService;
    public nextGameStartOnRace: { [product: string]: ActiveRace } = {};
    private raceCountdownService: RaceCountdownService;

    ngOnInit() {
        this.route.data
            .subscribe((data: { selectedRaceDay: ActiveRaceDay.IActiveRaceDay, totalInvestment: TotalInvestmentForPool.ITotalInvestmentForPool[], productsForRaceDay: ProductsForRaceDay }) => {
                this.selectedRaceDay = data.selectedRaceDay;
                this.productsForRaceDay = data.productsForRaceDay;
                this.totalInvestment = data.totalInvestment;

                this.setTotalInvestmentForAllProducts();
                this.populateUpcomingGames();
                this.raceCountdownService.startCountdown(this.productsForRaceDay.races);
            });

        
        this.route.params.subscribe((params: { raceDayKey: string, product: string }) => {
            this.uiService.setRaceDayParams(params.raceDayKey, params.product);
        });
    }

    constructor(private route: ActivatedRoute, uiService: UiService, raceInfoHub: RaceInfoHub, raceCountdownService: RaceCountdownService/*, productTimelineService: ProductTimelineService, raceCountdownService: RaceCountdownService*/) {
        raceInfoHub.onRaceDayHasBeenAbandoned(this.raceDayHasBeenAbandoned);
        raceInfoHub.onTotalInvestmentForPoolHasBeenUpdated(this.totalInvestmentForPoolHasBeenUpdated);
        raceInfoHub.onMultiLegGameHasBeenAbandoned(this.multiLegGameHasBeenAbandoned);
        raceInfoHub.onMultiLegGameHasFinished(this.multiLegGameHasFinished);
        raceInfoHub.onRaceHasFinished(this.raceHasFinished);
        raceInfoHub.onRaceHasBeenAbandoned(this.raceHasBeenAbandoned);
        raceInfoHub.onRaceHasBeenPostponed(this.raceHasBeenPostponed);
        raceInfoHub.onRaceHasClosedForSell(this.raceHasClosedForSell);
        raceInfoHub.onRaceHasReopenedForSell(this.raceHasReopenedForSell);
        this.uiService = uiService;
        this.raceCountdownService = raceCountdownService;
    }
    



    //protected $onDestroy(): void {
    //    super.$onDestroy();

    //    this.raceCountdownService.stopCountdown();
    //}


    private raceDayHasBeenAbandoned = (event, raceDayKey: string) => {
        if (this.selectedRaceDay.raceDayKey === raceDayKey)
            this.selectedRaceDay.progressStatus = ProgressStatus.Abandoned;
    }

    private setTotalInvestmentForAllProducts() {
        if (!this.productsForRaceDay || !this.productsForRaceDay.products)
            return;

        _.forEach(this.totalInvestment, investmentForProduct => {
            var productInTimeline = this.getGame(investmentForProduct.product);
            if (!productInTimeline) return;

            if (productInTimeline.isSingleLegGame) {
                let product = this.getSingleLegGameByBetTypeCode(investmentForProduct.raceNumber, investmentForProduct.product);
                if (product) {
                    product.totalInvestment = product.totalInvestment || {};
                    product.totalInvestment[investmentForProduct.product.toString()] = investmentForProduct.totalInvestment;
                }
            } else {
                (<MultiLegProductForTimeline.IMultiLegProductForRaceDay>productInTimeline).totalInvestment = investmentForProduct.totalInvestment;
            }
        });
    }

    public getSingleLegGameByBetTypeCode(raceNumber: number, product: BetTypeCode): IRaceForSingleLegGame {
        let singleLegProductForRaceDay = this.getSingleLegGame(product);
        return this.getSingleLegGameRace(raceNumber, singleLegProductForRaceDay);
    }


    public getSingleLegGameRace(raceNumber: number, product: SingleLegProductForTimeline.ISingleLegProductForRaceDay): IRaceForSingleLegGame {
        return _.find(product.races, r => r.raceNumber === raceNumber);
    }


    private getGame(product: BetTypeCode): MultiLegProductForTimeline.IMultiLegProductForRaceDay | SingleLegProductForTimeline.ISingleLegProductForRaceDay {
        if ((product === BetTypeCode.V || product === BetTypeCode.P) && this.hasSingleLegGameByBetTypeCode(BetTypeCode.VP)) {
            return <SingleLegProductForTimeline.ISingleLegProductForRaceDay>_.find(this.productsForRaceDay.products, game => game.product === BetTypeCode.VP);
        }

        return _.find(this.productsForRaceDay.products, game => game.product === product);
    }

    private getSingleLegGame(product: BetTypeCode): SingleLegProductForTimeline.ISingleLegProductForRaceDay {
        if ((product === BetTypeCode.V || product === BetTypeCode.P) && this.hasSingleLegGameByBetTypeCode(BetTypeCode.VP)) {
            return <SingleLegProductForTimeline.ISingleLegProductForRaceDay>_.find(this.productsForRaceDay.products, game => game.product === BetTypeCode.VP);
        }
        return <SingleLegProductForTimeline.ISingleLegProductForRaceDay>_.find(this.productsForRaceDay.products, game => game.product === product);
    }

    public hasSingleLegGameByBetTypeCode(product: BetTypeCode): boolean {
        return _.some(this.productsForRaceDay.products, p => p.product === product);
    }

    private totalInvestmentForPoolHasBeenUpdated = (event, updatedTotalInvestmentForPool: TotalInvestmentForPool.ITotalInvestmentForPool) => {
        if (this.selectedRaceDay.raceDayKey !== updatedTotalInvestmentForPool.raceDay)
            return;

        if (!updatedTotalInvestmentForPool.raceNumber) {
            this.getMultiLegGame(updatedTotalInvestmentForPool.product).totalInvestment = updatedTotalInvestmentForPool.totalInvestment;
        } else {
            let singleLegGameByBetTypeCode = this.getSingleLegGameByBetTypeCode(updatedTotalInvestmentForPool.raceNumber, updatedTotalInvestmentForPool.product);
            singleLegGameByBetTypeCode.totalInvestment = singleLegGameByBetTypeCode.totalInvestment || {};
            singleLegGameByBetTypeCode.totalInvestment[updatedTotalInvestmentForPool.product.toString()] = updatedTotalInvestmentForPool.totalInvestment;
        }
    }


    private populateUpcomingGames() {
        if (!this.productsForRaceDay || !this.productsForRaceDay.races)
            return;

        let futureRacesSortedByStartTime = _.sortBy(_.filter(this.productsForRaceDay.races, race => race.progressStatus === ProgressStatus.Future), race => race.startTime);

        _.forEach(this.productsForRaceDay.products, game => {
            if (game.isMultiLegGame)
                return;

            let raceWithNextGame = _.find(futureRacesSortedByStartTime, race => _.some(game.races, (r: IRaceForSingleLegGame) => r.raceNumber === race.raceNumber));

            this.nextGameStartOnRace[game.product.toString()] = raceWithNextGame;
        });
    }


    public getMultiLegGame(product: BetTypeCode): MultiLegProductForTimeline.IMultiLegProductForRaceDay {
        return <MultiLegProductForTimeline.IMultiLegProductForRaceDay>_.find(this.productsForRaceDay.products, (game: MultiLegProductForTimeline.IMultiLegProductForRaceDay) => game.product === product);
    }

    private multiLegGameHasBeenAbandoned = (event, game: IGame) => {
        if (this.selectedRaceDay.raceDayKey !== game.raceDay)
            return;

        let multiLegGame = this.getMultiLegGame(game.product);
        multiLegGame.isAbandoned = true;
        multiLegGame.progressStatus = ProgressStatus.Abandoned;
    }


    private raceHasFinished = (event, race: IRace) => {
        if (this.selectedRaceDay.raceDayKey !== race.raceDay)
            return;

        this.productsForRaceDay.raceStatusChanged(race.raceNumber, ProgressStatus.Finished);
    }

    private raceHasBeenAbandoned = (event, race: IRace) => {
        if (this.selectedRaceDay.raceDayKey !== race.raceDay)
            return;

        this.productsForRaceDay.raceStatusChanged(race.raceNumber, ProgressStatus.Abandoned);
        this.populateUpcomingGames();
    }


    private raceHasBeenPostponed = (event: any, postponedRace: IPostponedRace) => {
        if (this.selectedRaceDay.raceDayKey !== postponedRace.raceDay)
            return;

        this.productsForRaceDay.postponeRace(postponedRace.raceNumber, postponedRace.newStartTime);

        this.populateUpcomingGames();
    }

    private raceHasClosedForSell = (event, race: IRaceStatusChanged) => {
        if (this.selectedRaceDay.raceDayKey !== race.raceDay)
            return;

        this.productsForRaceDay.raceStatusChanged(race.raceNumber, ProgressStatus.Ongoing);
        this.setStatusForMultiLegGame(race.affectedMultiLegGames, ProgressStatus.Ongoing, false);
        this.populateUpcomingGames();
    }

    private raceHasReopenedForSell = (event, race: IRaceStatusChanged) => {
        if (this.selectedRaceDay.raceDayKey !== race.raceDay)
            return;

        this.productsForRaceDay.raceStatusChanged(race.raceNumber, ProgressStatus.Future);
        this.setStatusForMultiLegGame(race.affectedMultiLegGames, ProgressStatus.Future, true);
        this.populateUpcomingGames();
    }

    private setStatusForMultiLegGame(products: BetTypeCode[], progressStatus: any, isOpenForBet: boolean) {
        _.forEach(products, product => {
            let multiLegGame = this.getMultiLegGame(product);
            multiLegGame.progressStatus = progressStatus;
            multiLegGame.isOpenForBet = isOpenForBet;
        });
    }

    private multiLegGameHasFinished = (event, game: IGame) => {
        if (this.selectedRaceDay.raceDayKey !== game.raceDay)
            return;

        this.setStatusForMultiLegGame([game.product], ProgressStatus.Finished, false);
    }

}