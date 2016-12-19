import { IRaceStatusChanged, IRace, IGame, IPostponedRace, IStart, IDriverChanged, IUpdatedTotalInvestmentForPool } from './RaceInfoContracts/interfaces';

import { Injectable } from '@angular/core';
import { IRaceInfoHub } from './IRaceInfoHub';
import * as TotalInvestmentForPool from '../../Game/Models/ITotalInvestmentForPool';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ChannelService, ConnectionState, HubConnection, HubEvent } from '../Signalr/ChannelService';
import * as _ from 'lodash';

@Injectable()
export default class RaceInfoHub implements IRaceInfoHub {
    private hub: HubConnection;
    private $rootScope: any;

    private raceHasBeenPostponed = 'raceHasBeenPostponed';
    private raceHasClosedForSell = 'raceHasClosedForSell';
    private raceHasReopenedForSell = 'raceHasReopenedForSell';
    private raceHasBeenAbandoned = 'raceHasBeenAbandoned';
    private raceHasFinished = 'raceHasFinished';
    private raceDayHasBeenAbandoned = 'raceDayHasBeenAbandoned';
    private raceDayHasFinished = 'raceDayHasFinished';
    private multiLegGameHasBeenAbandoned = 'multiLegGameHasBeenAbandoned';
    private multiLegGameHasFinished = 'multiLegGameHasFinished';
    private totalInvestmentForPoolHasBeenUpdated = 'totalInvestmentForPoolHasBeenUpdated';
    private startHasBeenScratched = 'startHasBeenScratched';
    private scratchedStartHasBeenReinstated = 'scratchedStartHasBeenReinstated';
    private driverHasBeenChanged = 'driverHasBeenChanged';

    connectionState$: Observable<string>;
    events: { [name: string]: Subject<any> } = {}

    constructor(private channelService: ChannelService) {

        var listeners = {};

        listeners[this.raceHasClosedForSell] = (data: any) => this.broadcastEvent(this.raceHasClosedForSell, data);
        listeners[this.raceHasReopenedForSell] = (data: any) => this.broadcastEvent(this.raceHasReopenedForSell, data);
        listeners[this.raceHasBeenAbandoned] = (data: any) => this.broadcastEvent(this.raceHasBeenAbandoned, data);
        listeners[this.raceHasFinished] = (data: any) => this.broadcastEvent(this.raceHasFinished, data);
        listeners[this.raceDayHasBeenAbandoned] = (data: any) => this.broadcastEvent(this.raceDayHasBeenAbandoned, data);
        listeners[this.raceHasBeenPostponed] = (data: any) => this.broadcastEvent(this.raceHasBeenPostponed, data);
        listeners[this.multiLegGameHasBeenAbandoned] = (data: any) => this.broadcastEvent(this.multiLegGameHasBeenAbandoned, data);
        listeners[this.raceDayHasFinished] = (data: any) => this.broadcastEvent(this.raceDayHasFinished, data);
        listeners[this.multiLegGameHasFinished] = (data: any) => this.broadcastEvent(this.multiLegGameHasFinished, data);
        listeners[this.totalInvestmentForPoolHasBeenUpdated] = (data: any) => this.broadcastEvent(this.totalInvestmentForPoolHasBeenUpdated, data);
        listeners[this.startHasBeenScratched] = (data: any) => this.broadcastEvent(this.startHasBeenScratched, data);
        listeners[this.scratchedStartHasBeenReinstated] = (data: any) => this.broadcastEvent(this.scratchedStartHasBeenReinstated, data);
        listeners[this.driverHasBeenChanged] = (data: any) => this.broadcastEvent(this.driverHasBeenChanged, data);

        _.forEach(listeners, (callback, key) => {
            this.events[key] = new Subject<any>();
        });

        _.forEach(listeners, (callback, key) => {
            this.events[key].subscribe((data) => {
                console.log(key, data);
            });
        });

        

        this.hub = channelService.createHub('raceInfoHub', listeners);
        
        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.hub.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.hub.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error("errors$ error", error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.hub.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );

        this.hub.start();

    }

    private broadcastEvent(eventName: string, data: any) {
        this.events[eventName].next(data);

        //this.$rootScope.$broadcast(eventName, data);
        //this.$rootScope.$apply();
    }

    public onRaceHasClosedForSell(callback: (event: any, race: IRaceStatusChanged) => any) {
        return this.events[this.raceHasClosedForSell].subscribe((data) => callback(this.raceHasClosedForSell, data));
    }

    public onRaceHasReopenedForSell(callback: (event: any, race: IRaceStatusChanged) => any) {
        return this.events[this.raceHasReopenedForSell].subscribe((data) => callback(this.raceHasReopenedForSell, data));
    }

    public onRaceHasBeenAbandoned(callback: (event: any, race: IRace) => any) {
        return this.events[this.raceHasBeenAbandoned].subscribe((data) => callback(this.raceHasBeenAbandoned, data));
    }

    public onRaceHasFinished(callback: (event: any, race: IRace) => any) {
        return this.events[this.raceHasFinished].subscribe((data) => callback(this.raceHasFinished, data));
    }

    public onRaceDayHasBeenAbandoned(callback: (event: any, raceDay: string) => any) {
        return this.events[this.raceDayHasBeenAbandoned].subscribe((data) => callback(this.raceDayHasBeenAbandoned, data));
    }

    public onRaceHasBeenPostponed(callback: (event: any, postponedRace: IPostponedRace) => any) {
        return this.events[this.raceHasBeenPostponed].subscribe((data) => callback(this.raceHasBeenPostponed, data));
    }

    public onRaceDayHasFinished(callback: (event: any, raceDay: string) => any) {
        return this.events[this.raceDayHasFinished].subscribe((data) => callback(this.raceDayHasFinished, data));
    }

    public onMultiLegGameHasBeenAbandoned(callback: (event: any, postponedRace: IGame) => any) {
        return this.events[this.multiLegGameHasBeenAbandoned].subscribe((data) => callback(this.multiLegGameHasBeenAbandoned, data));
    }

    public onMultiLegGameHasFinished(callback: (event: any, game: IGame) => any) {
        return this.events[this.multiLegGameHasFinished].subscribe((data) => callback(this.multiLegGameHasFinished, data));
    }

    public onTotalInvestmentForPoolHasBeenUpdated(callback: (event: any, updatedTotalInvestmentForPool: TotalInvestmentForPool.ITotalInvestmentForPool) => any) {
        return this.events[this.totalInvestmentForPoolHasBeenUpdated].subscribe((data) => callback(this.totalInvestmentForPoolHasBeenUpdated, data));
    }

    public onStartHasBeenScratched(callback: (event: any, start: IStart) => any) {
        return this.events[this.startHasBeenScratched].subscribe((data) => callback(this.startHasBeenScratched, data));
    }

    public onScratchedStartHasBeenReinstated(callback: (event: any, start: IStart) => any) {
        return this.events[this.scratchedStartHasBeenReinstated].subscribe((data) => callback(this.scratchedStartHasBeenReinstated, data));
    }

    public onDriverHasBeenChanged(callback: (event: any, driverChange: IDriverChanged) => any) {
        return this.events[this.driverHasBeenChanged].subscribe((data) => callback(this.driverHasBeenChanged, data));
    }
}
