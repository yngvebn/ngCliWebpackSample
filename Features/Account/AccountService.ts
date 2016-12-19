import { Injectable, HostListener } from '@angular/core';
import { GenericDataService } from '../Common';
import * as Broadcaster from '../Common/BroadcasterService/BroadcasterService';
import * as PurchaseReceipt from '../Game/RaceDay/RaceDayProduct/Purchase/PurchaseService/Models/IPurchaseReceipt';
import {ServiceHostListener} from '../Common/ServiceHostListener/ServiceHostListener';

@Injectable()
export default class AccountService {
    private genericDataService: GenericDataService;
    private broadcasterService: Broadcaster.BroadcasterService;
    private credit: ICredit;
    
    constructor(genericDataService: GenericDataService, broadcasterService: Broadcaster.BroadcasterService) {
        this.genericDataService = genericDataService;
        this.broadcasterService = broadcasterService;


        // Temnporary solution until we figure out a better way
        window.addEventListener(Broadcaster.events.userHasLoggedOut.replace('window:', ''), () => {
            this.userHasLoggedOut();
        });

        window.addEventListener(Broadcaster.events.userHasPurchasedTicket.replace('window:', ''), () => {
            this.userHasPurchasedTicket();
        });
    }

    public getNumberOfActiveGames(): Promise<number> {
        return this.genericDataService.get<number>('/api/account/numberOfActiveGames');
    }

    public getCredit(): Promise<ICredit> {
        return Promise.resolve(this.credit || this.getCreditFromServer());
    }

    private getCreditFromServer(): Promise<ICredit> {
        return this.genericDataService.get<ICredit>('/api/account/credit')
            .then((credit: ICredit) => {
                this.credit = credit;
                this.broadcasterService.onUserCreditHasChanged(credit);
                return credit;
            });
    }

    private userHasLoggedOut(){
        this.credit = undefined;
    }

    private userHasPurchasedTicket() {
        this.getCreditFromServer();
    }    
}