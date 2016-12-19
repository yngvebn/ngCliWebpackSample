import { Component, Input, OnInit } from '@angular/core';
import ErrorMessageService from '../../../../../../Common/ErrorMessages/ErrorMessageService';

@Component({
    selector: 'purchase-error',
    templateUrl: 'PurchaseError.tpl.html'
})
export class PurchaseErrorComponent implements OnInit {
    private errorMessageService: ErrorMessageService;
    @Input() purchaseError: IPurchaseError;
    errorMessage: string;

    constructor(errorMessageService: ErrorMessageService) {
        this.errorMessageService = errorMessageService;
    }

    ngOnInit(): void {
        this.errorMessage = this.errorMessageService.getPurchaseErrorMessage(this.purchaseError.errorCode);
    }
}