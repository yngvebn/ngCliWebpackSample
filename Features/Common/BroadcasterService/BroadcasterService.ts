import { Injectable } from '@angular/core';
import { IBroadcasterService } from './IBroadcasterService';

import { ILoggedInUser } from '../../Authentication/Models/ILoggedInUser';
import { IPurchaseReceipt } from '../../Game/Raceday/RaceDayProduct/Purchase/PurchaseService/Models/IPurchaseReceipt';


export const events = {
    userHasLoggedIn: 'window:userHasLoggedIn',
    userHasLoggedOut: 'window:userHasLoggedOut',
    userHasPurchasedTicket: 'window:userHasPurchasedTicket',
    userCreditHasChanged: 'window:userCreditHasChanged'
}

@Injectable()
export class BroadcasterService{
    constructor() {
    }

    public onUserHasLoggedIn(user: ILoggedInUser) {
        window.dispatchEvent(new CustomEvent(events.userHasLoggedIn.replace('window:', ''), { detail: user }));
    }

    public onUserHasLoggedOut() {
        window.dispatchEvent(new CustomEvent(events.userHasLoggedOut.replace('window:', '')));
    }

    public onUserHarPurchasedTicket(purchaseReceipt: IPurchaseReceipt) {
        window.dispatchEvent(new CustomEvent(events.userHasPurchasedTicket.replace('window:', ''), { detail: purchaseReceipt }));
    }

    public onUserCreditHasChanged(credit: ICredit) {
        console.log('dispatching userCreditHasChanged', credit);
        window.dispatchEvent(new CustomEvent(events.userCreditHasChanged.replace('window:', ''), { detail: credit }));
    }
}

export default BroadcasterService;