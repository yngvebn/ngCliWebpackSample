import { Injectable } from '@angular/core';
import {GenericDataService} from '../../../../Common/GenericDataService/index';

@Injectable()
export class DoubleOddsService {
    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    getDoubleOdds = (raceDay: string, page: number): Promise<IDoubleOddsPaged> => {
        return this.genericDataService.get<IDoubleOddsPaged>(`/api/game/${raceDay}/odds/dd/?page=${page}`);
    };
}