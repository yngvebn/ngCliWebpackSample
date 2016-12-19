import { Injectable } from '@angular/core';
import { GenericDataService } from '../../Common';

@Injectable()
export default class EpiserverDataService {
    private genericDataService: GenericDataService;

    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    getCustomerSupportLinks() : Promise<ICustomerSupportLink[]> {
        return this.genericDataService.get<ICustomerSupportLink[]>('/api/episerver/customersupportlinks');
    }
}
