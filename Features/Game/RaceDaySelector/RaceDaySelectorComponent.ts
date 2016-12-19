import { Component, Input, OnInit } from '@angular/core';
import { EventSubscribingComponent } from '../../Common/BaseComponent/EventSubscribingComponent';
import { UiService } from '../../Common';
import { RaceDaySelectorService } from './RaceDaySelectorService';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BreakPoints } from '../../Common/Enums/BreakPoints';

import * as _ from 'lodash';
import * as moment from 'moment'

import { IActivePoolsForRaceDayGroupedByDate } from '../Models/IActivePoolsForRaceDayGroupedByDate';

import BetDateService from '../../Common/BetDate/BetDateService';
import * as RouteConfig from '../../Common/Routes/Routes';
import * as ProductForRaceDay from '../Models/IProductForRaceDay';
import * as ActivePoolsForRaceDay from '../Models/IActivePoolsForRaceDay';
import RaceInfoHub from '../../Common/Hubs/RaceInfoHub';
import ProgressStatus from '../../Common/Enums/ProgressStatus';
import { IRace, IGame, IRaceStatusChanged } from '../../Common/Hubs/RaceInfoContracts/interfaces';

@Component({
    selector: 'race-day-selector',
    templateUrl: 'RaceDaySelector.tpl.html'
})
export class RaceDaySelectorComponent implements OnInit {
    public uiService: UiService;
    private raceInfoHub: RaceInfoHub;
    public raceDaySelectorService: RaceDaySelectorService;

    private raceDayKey: string;

    public activeRaceDaysGroupedByDate: IActivePoolsForRaceDayGroupedByDate[];

    private betDateService: BetDateService;
    public isBusy: boolean;
    public activatedRoute: ActivatedRoute;
    private router: Router;
    public betDate;


    constructor(activatedRoute: ActivatedRoute, raceDaySelectorService: RaceDaySelectorService, betDateService: BetDateService, uiService: UiService, router: Router, raceInfoHub: RaceInfoHub) {
        // TODO: REIMPLEMENT


        //this.isBusy = true;
        this.uiService = uiService;
        this.raceInfoHub = raceInfoHub;
        this.raceDaySelectorService = raceDaySelectorService;

        this.betDateService = betDateService;
        this.activatedRoute = activatedRoute;

        this.router = router;

        this.raceInfoHub.onRaceDayHasFinished(this.raceDayHasFinished);
        this.raceInfoHub.onRaceDayHasBeenAbandoned(this.raceDayHasBeenAbandoned);
        this.raceInfoHub.onRaceHasBeenAbandoned(this.raceHasBeenAbandonedHandler);
        this.raceInfoHub.onRaceHasClosedForSell(this.raceHasClosedForSellHandler);
        this.raceInfoHub.onRaceHasReopenedForSell(this.raceHasReopenedForSell);
        this.raceInfoHub.onMultiLegGameHasBeenAbandoned(this.multiLegGameHasBeenAbandoned);
        //$transitions.onSuccess({ to: Routes.Game.stateName }, () => {
        //    this.ensureSelectedRaceday(this.activeRaceDaysGroupedByDate);
        //});

        //this.getBetDateToday()
        //    .then(this.getActiveRaceDays)
        //    .then(this.finishedProcessing);
    }

    ngOnInit() {
        this.getBetDateToday()
            .then(this.getActiveRaceDays)
            .then(this.finishedProcessing);

    }


    private finishedProcessing = () => {
        return this.isBusy = false;
    }

    private getBetDateToday = () => {
        return this.betDateService.getBetDateToday().then(betDate => {
            this.betDate = moment(betDate);
        });
    }

    public getFirstProductOrEmpty(raceDay: ActivePoolsForRaceDay.IActivePoolsForRaceDay) {
        return raceDay.products && raceDay.products.length > 0 ? raceDay.products[0].product : '';
    }

    private getActiveRaceDays = () => {
        this.raceDaySelectorService.getActiveRaceDays()
            .then((data: IActivePoolsForRaceDayGroupedByDate[]) => {
                data.forEach(raceDayForDate => {
                    raceDayForDate.dateHeader = this.getDateHeader(this.betDate, raceDayForDate.date);
                });

                this.activeRaceDaysGroupedByDate = data;
                return this.activeRaceDaysGroupedByDate;
            })
            .then(this.ensureSelectedRaceday);
    }


    private ensureSelectedRaceday = (raceDaysByDate: IActivePoolsForRaceDayGroupedByDate[]) => {
        if (!raceDaysByDate || !raceDaysByDate.length)
            return;

        if (this.uiService.getCurrentBreakpoint() === BreakPoints.Small) return;

        if (!this.uiService.hasRaceDay && !this.uiService.hasProduct) {
            this.router.navigate([this.findFirstRaceDayWithOpenProduct(raceDaysByDate)]);
        }
    }

    private findFirstRaceDayWithOpenProduct(raceDaysByDate: IActivePoolsForRaceDayGroupedByDate[]): string {
        let allPools = _.flatMap(raceDaysByDate, byDate => byDate.poolsForRaceDay);

        let pool = _.find(allPools, pool => _.some(pool.products, (product: ProductForRaceDay.IProductForRaceDay) => product.isOpenForBet));

        if (pool) {
            return pool.raceDay;
        } else {
            return raceDaysByDate[0].poolsForRaceDay[0].raceDay;
        }
    }

    private getDateHeader(today, date) {
        date = moment(date);

        if (date.diff(today, 'days') === 0)
            return 'I dag';

        if (date.diff(today, 'days') === 1)
            return 'I morgen';

        return date.format('dddd DD.MMM');
    }

    private raceHasReopenedForSell = (event, race: IRaceStatusChanged) => {
        this.raceDaySelectorService.setOpenForBet(this.activeRaceDaysGroupedByDate, race, true);
    }

    private raceHasClosedForSellHandler = (event, race: IRaceStatusChanged) => {
        this.raceDaySelectorService.setOpenForBet(this.activeRaceDaysGroupedByDate, race, false);
        this.raceDaySelectorService.setRaceDayStatus(this.activeRaceDaysGroupedByDate, race.raceDay, ProgressStatus.Ongoing);
    }

    private raceHasBeenAbandonedHandler = (event, race: IRace) => {
        this.raceDaySelectorService.setProductHasBeenAbandoned(this.activeRaceDaysGroupedByDate, race);
    }

    private multiLegGameHasBeenAbandoned = (event, race: IGame) => {
        this.raceDaySelectorService.setMultiLegGameHasBeenAbandoned(this.activeRaceDaysGroupedByDate, race);
    }

    private raceDayHasBeenAbandoned = (event, raceDay: string) => {
        this.raceDaySelectorService.setRaceDayStatus(this.activeRaceDaysGroupedByDate, raceDay, ProgressStatus.Abandoned);
    }

    private raceDayHasFinished = (event, raceDay: string) => {
        this.raceDaySelectorService.setRaceDayStatus(this.activeRaceDaysGroupedByDate, raceDay, ProgressStatus.Finished);
    }

    public toggleTracks() {
        this.uiService.toggleTracks();
    }
}