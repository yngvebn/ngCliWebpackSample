import { Injectable } from '@angular/core';
import { GenericDataService } from '../Common/GenericDataService';
import BetTypeCode from '../Common/Enums/BetTypeCode';

import * as _ from 'lodash';

@Injectable()
export default class BettingInfoService {
    genericDataService: GenericDataService;
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public getPricesForProduct = _.memoize((product: BetTypeCode) => {
        return this.genericDataService.get<IPriceInfoForProduct[]>(`/api/bettinginfo/${product}/priceInfo`)
            .then((prices: IPriceInfoForProduct[]) => { return prices });
    });

    public getIsBettingSystemOpenForBet(): Promise<boolean> {
        return this.genericDataService.get<boolean>('/api/bettinginfo/isBettingSystemOpenForBet');
    }
}