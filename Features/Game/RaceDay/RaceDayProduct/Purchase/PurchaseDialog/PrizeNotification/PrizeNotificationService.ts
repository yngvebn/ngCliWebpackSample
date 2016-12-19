import { Injectable } from '@angular/core';
import {GenericDataService} from '../../../../../../Common/GenericDataService/GenericDataService';

@Injectable()
export class PrizeNotificationService {

    private genericDataService: GenericDataService;

    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public getPrizeNotificationSettings(): Promise<IPrizeNotificationSettings> {
        return this.genericDataService.get("/api/settings/prizenotification");
    }
}