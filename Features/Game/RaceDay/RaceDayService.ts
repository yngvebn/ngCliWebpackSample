import { Injectable } from '@angular/core';
import * as Index from '../../Common/index';
import * as ActiveRaceDay from '../Models/IActiveRaceDay';

@Injectable()
export class RaceDayService {

    private genericDataService: Index.GenericDataService;

    /* @ngInject */
    constructor(genericDataService: Index.GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public findActiveRaceDay(raceDayKey: string): Promise<ActiveRaceDay.IActiveRaceDay> {
        return this.genericDataService.get<ActiveRaceDay.IActiveRaceDay>(`/api/game/racedays/${raceDayKey}`);
    }
}