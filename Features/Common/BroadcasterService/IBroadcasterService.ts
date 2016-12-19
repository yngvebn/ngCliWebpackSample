import * as LoggedInUser from '../../Authentication/Models/ILoggedInUser';
import * as PurchaseReceipt from '../../Game/Raceday/RaceDayProduct/Purchase/PurchaseService/Models/IPurchaseReceipt';

export interface IBroadcasterService {
    broadcastEvent(eventName: string, data?: any);
    onUserHasLoggedIn(callback: (event: any, user: LoggedInUser.ILoggedInUser) => any);
    onUserHasLoggedOut(callback: (event: any) => any);
    onUserHarPurchasedTicket(callback: (event: any, purchaseReceipt: PurchaseReceipt.IPurchaseReceipt) => any);
    onUserCreditHasChanged(callback: (event: any, credit: ICredit) => any);
}