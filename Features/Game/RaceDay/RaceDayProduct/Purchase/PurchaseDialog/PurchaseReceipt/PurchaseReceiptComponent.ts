import {Component, Input, OnInit } from '@angular/core';
import {IPurchaseReceipt} from '../../PurchaseService/Models/IPurchaseReceipt';
import * as ActiveRaceDay from '../../../../../Models/IActiveRaceDay';
import ActiveRace from '../../../../../Models/ActiveRace';

import * as LoggedInUser from '../../../../../../Authentication/Models/ILoggedInUser';
import * as DataService from '../../../../../../Common/BetData/BetDataService';
import {AuthenticationService} from '../../../../../../Authentication/AuthenticationService';
import GoogleTagManagerService from '../../../../../../Common/GoogleTagManager/GoogleTagManagerService';
import PurchaseGtmEvent from '../../../../../../Common/GoogleTagManager/Events/Purchase/PurchaseGtmEvent';
import PageVirtualLoggedInUserEvent from '../../../../../../Common/GoogleTagManager/Events/PageVirtual/PageVirtualLoggedInUserEvent';

@Component({
    templateUrl: 'PurchaseReceipt.tpl.html',
    selector: 'purchase-receipt'
})
export class PurchaseReceiptComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private googleTagManagerService: GoogleTagManagerService;

    @Input() purchaseReceipt: IPurchaseReceipt;
    @Input() selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    @Input() firstRaceInProduct: ActiveRace;
    @Input() betDataObj: DataService.IBetData;

    constructor(googleTagManagerService: GoogleTagManagerService, authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
        this.googleTagManagerService = googleTagManagerService;
    }

    ngOnInit(): void {
        var pageVirtual = `/${this.selectedRaceDay.raceDayKey}/${this.purchaseReceipt.product}/kvittering`; // since the receipt isn't actually a route, we fake the URL for GTM

        let gtmEvent = new PurchaseGtmEvent(this.purchaseReceipt, this.selectedRaceDay, this.firstRaceInProduct, this.betDataObj, pageVirtual);
        this.googleTagManagerService.pushEvent(gtmEvent);

        // We manually send to gtm here, since receipt doesn't have its own URL. It doesn't matter that the URL sent to GTM is a non-existing URL
        // as it's only used for reporting and funnel-analysis
        this.authenticationService.getLoggedInUser().then((user: LoggedInUser.ILoggedInUser) => {
            this. googleTagManagerService.pushEvent(new PageVirtualLoggedInUserEvent(pageVirtual, user));
        });
    }
}