import { Injectable } from '@angular/core';
import { GenericDataService } from '../GenericDataService';

import * as _ from 'lodash';
import * as moment from 'moment'

@Injectable()
export default class BetDateService {
    public genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {        
        this.genericDataService = genericDataService;
    }

    public getBetDateToday(): Promise<string> {
        return this.genericDataService.get<string>('/api/betdate/today');
    }

    public getBetDateNow(): Promise<string> {
        return this.genericDataService.get<string>('/api/betdate/now');
    }

    public getClockOffset = _.once((): Promise<number> => {
        return this.getBetDateNow().then(now => moment().diff(moment(now), 'seconds'));
    });
        
}