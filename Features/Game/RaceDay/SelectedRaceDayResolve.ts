import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RaceDayService } from './RaceDayService';
import * as ActiveRaceDay from '../Models/IActiveRaceDay';

@Injectable()
export class SelectedRaceDayResolve implements Resolve<ActiveRaceDay.IActiveRaceDay> {
    constructor(private raceDayService: RaceDayService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: Object): Promise<ActiveRaceDay.IActiveRaceDay> {
        let raceDayKey = route.params['raceDayKey'];

        return this.raceDayService.findActiveRaceDay(raceDayKey);
    }
}