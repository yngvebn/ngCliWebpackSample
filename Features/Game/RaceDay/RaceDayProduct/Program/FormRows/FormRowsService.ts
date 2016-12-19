import { Injectable } from '@angular/core';
import { GenericDataService } from '../../../../../Common';
import { IRace } from '../../../../../Common/Hubs/RaceInfoContracts/interfaces';
import * as RowsService from './IFormRowsService';

@Injectable()
export default class FormRowsService implements RowsService.IFormRowsService {
    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    getTrotFormRowsForRace = (race: IRace): Promise<ITrotFormRowsForRace> => {
        return this.genericDataService.get<ITrotFormRowsForRace>(`/api/game/program/formrows/${race.raceDay}/${race.raceNumber}`);
    };
}