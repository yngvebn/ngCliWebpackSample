import { Injectable } from '@angular/core';
import * as PurchaseRequest from './Models/IPurchaseRequest';
import {GenericDataService} from '../../../../../Common/GenericDataService/GenericDataService';

@Injectable()
export default class PurchaseService {

    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public processPurchase(purchaseData: PurchaseRequest.IPurchaseData): Promise<any> {
        return this.genericDataService.post("/api/purchase", purchaseData);
    }
}