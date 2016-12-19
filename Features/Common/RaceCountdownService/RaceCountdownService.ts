import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import BetDateService from '../BetDate/BetDateService';
import ActiveRace from '../../Game/Models/ActiveRace';

import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export default class RaceCountdownService {
    private betDateService: BetDateService;
    private interval: Subscription;
    private clockOffset: number;
    private races: ActiveRace[];

    constructor(betDateService: BetDateService) {
        this.betDateService = betDateService;
    }

    public startCountdown(races: ActiveRace[]): void {
        this.races = races;

        this.stopCountdown();

        if (!this.clockOffset) {
            this.betDateService.getClockOffset()
                .then((offset: number) => {
                    this.clockOffset = offset;
                    this.tick();
                });
        }

        this.interval = Observable.interval(1000)
            .subscribe(this.tick);
    }

    public stopCountdown() {
        if (this.interval) {
            this.interval.unsubscribe();
            this.interval = null;
        }
    }

    private tick = () => {
        let now = moment().subtract(this.clockOffset, 'seconds');

        _.each(this.races, race => {
            let secondsLeft = moment(race.startTime).diff(now, 'seconds');

            secondsLeft = secondsLeft <= 0 ? 0 : secondsLeft;

            race.updateTimeToStart(secondsLeft);
        });
    }
}