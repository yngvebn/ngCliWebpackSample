import { Injectable } from '@angular/core';
import { GenericDataService} from '../../../Common'
import ProductsForRaceDay from './ProductsForRaceDay';
import { IProductsForRaceDay } from '../../Models/IProductsForRaceDay';
import * as TotalInvestmentForPool from '../../Models/ITotalInvestmentForPool';

@Injectable()
export class ProductTimelineService {
    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    getProductsForTimeline(raceDayKey: string): Promise<ProductsForRaceDay> {
        return this.genericDataService.get<IProductsForRaceDay>(`/api/game/producttimeline/racedays/${raceDayKey}`)
            .then((productsForTimeline: IProductsForRaceDay) => {
                return new ProductsForRaceDay(productsForTimeline);
            });
    }

    getTotalInvestmentsForPools(raceDayKey: string): Promise<TotalInvestmentForPool.ITotalInvestmentForPool[]> {
        return this.genericDataService.get<TotalInvestmentForPool.ITotalInvestmentForPool[]>(`/api/game/producttimeline/racedays/${raceDayKey}/investment`);
    }
}