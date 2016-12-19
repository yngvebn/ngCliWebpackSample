import { Component, Input, OnInit } from '@angular/core';
import * as ActiveRaceDay from '../../../../Models/IActiveRaceDay';
import Program from '../../../../Models/Program';
import ActiveRace from '../../../../Models/ActiveRace';
import ProgramService from '../../Program/ProgramService';

import * as Broadcaster from '../../../../../Common/BroadcasterService/BroadcasterService';
import * as PurchaseReceipt from '../PurchaseService/Models/IPurchaseReceipt';
import * as PurchaseRequest from '../PurchaseService/Models/IPurchaseRequest';
import { BetDataService, IBetData } from '../../../../../Common/BetData/BetDataService';
import { Modal } from '../../../../../Common/Modal/ModalContainer';
import PurchaseService from '../PurchaseService/PurchaseService';

@Component({
    templateUrl: 'PurchaseDialogComponent.tpl.html'
})
@Modal()
export class PurchaseDialogComponent implements OnInit {
    @Input() betData: string;
    @Input() selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    @Input() programData: Program;
    @Input() customerSupportLinks: ICustomerSupportLink[];
    @Input() bettingSystemIsOpenForBet: boolean;
    @Input() firstRaceInProduct: ActiveRace;
    @Input() priceInfoForProduct: IPriceInfoForProduct[];

    betDataObj: IBetData;
   
    purchaseReceipt: PurchaseReceipt.IPurchaseReceipt;
    purchaseError: IPurchaseError;

    betDataService: BetDataService;
    programService: ProgramService;
    purchaseService: PurchaseService;
    broadcasterService: Broadcaster.BroadcasterService;

    showPurchaseConfirmation: boolean;
    showPurchaseReceipt: boolean;
    showPurchaseError: boolean;

    constructor(betDataService: BetDataService, programService: ProgramService, purchaseService: PurchaseService, broadcasterService: Broadcaster.BroadcasterService) {
        this.betDataService = betDataService;
        this.purchaseService = purchaseService;
        this.programService = programService;
        this.broadcasterService = broadcasterService;

    }
    ngOnInit(): void {
        this.betDataObj = this.betDataService.parse(this.betData).data;

        if (!this.bettingSystemIsOpenForBet) {
            this.purchaseError = <IPurchaseError>{
                errorCode: 'ClosedForBetting',
                raceDay: this.selectedRaceDay.raceDayKey,
                product: this.betDataObj.product.toString()
            };

            this.setShowPurchaseError();
        }
        this.showPurchaseError = false;
        this.showPurchaseReceipt = false;
        this.showPurchaseConfirmation = true;
    }
    public purchase() {
        let purchaseData: PurchaseRequest.IPurchaseData = {
            betData: this.betData
        };
        this.purchaseService.processPurchase(purchaseData)
            .then((purchaseReceipt: PurchaseReceipt.IPurchaseReceipt) => {
                this.purchaseReceipt = purchaseReceipt;
                this.setShowPurchaseReceipt();
                this.broadcasterService.onUserHarPurchasedTicket(purchaseReceipt);
            }).catch((errorCode: string) => {
                this.purchaseError = <IPurchaseError>{
                    errorCode: errorCode,
                    raceDay: this.selectedRaceDay.raceDayKey,
                    product: this.betDataObj.product.toString()
                };
                this.setShowPurchaseError();
            });
    }

    private setShowPurchaseReceipt() {
        this.showPurchaseConfirmation = false;
        this.showPurchaseError = false;
        this.showPurchaseReceipt = true;
    }

    private setShowPurchaseError() {
        this.showPurchaseConfirmation = false;
        this.showPurchaseReceipt = false;
        this.showPurchaseError = true;
    }


}