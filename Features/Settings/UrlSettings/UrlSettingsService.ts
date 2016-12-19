import { Injectable } from '@angular/core';
import { GenericDataService } from '../../Common';

import * as _ from 'lodash';

@Injectable()
export default class UrlSettingsService {
    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public getForgotPasswordUrl = _.once((): Promise<string> => {
        return this.genericDataService.get<string>('/api/settings/url/forgotpassword');
    });

    public getBetLimitUrl = _.once((): Promise<string> => {
        return this.genericDataService.get<string>('/api/settings/url/betlimit');
    });

    public getDepositUrl = _.once((): Promise<string> => {
        return this.genericDataService.get<string>('/api/settings/url/deposit');
    });

    public getRegisterUrl = _.once((): Promise<string> => {
        return this.genericDataService.get<string>('/api/settings/url/register');
    });
}