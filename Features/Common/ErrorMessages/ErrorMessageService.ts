import { Injectable } from '@angular/core';

@Injectable()
export default class ErrorMessageService {
    public getPurchaseErrorMessage(errorCode: string) {
        switch (errorCode) {
            case 'ClosedForBetting':
                return 'Det er stengt for spill';
            case 'ExceededDailyBetLimit':
            case 'ExceededWeeklyBetLimit':
            case 'ExceededMonthlyBetLimit':
            case 'DailyBetLimitWouldBeExceeded':
            case 'WeeklyBetLimitWouldBeExceeded':
            case 'MonthlyBetLimitExceeded':
                return 'Kjøpet kan ikke gjennomføres fordi det vil overskride spillegrensene';
            case 'CouldNotSetBetLimit':
                return 'Det har skjedd en feil ved oppdatering av spillegrensene';
            case 'LimitNotSet':
                return 'Spillegrensene dine må settes før du kan gjennomføre kjøpet';
            case 'ExternalPaymentError':
                return 'Det har skjedd en feil ved gjennomføringen av kjøpet';
            case 'InsufficientFunds':
            case 'NotEnoughFunds':
                return 'Du har ikke dekning til å gjennomføre kjøpet';
            case 'InvalidMarks':
                return 'Det er ugyldige markeringer';
            case 'TooFewMarks':
                return 'Det er ikke tilstrekkelig med markeringer';
            case 'UserCancelledExternalPayment':
            case 'AgentIsSuspended':
            case 'UnknownErrorWhenPlacingNormalBet':
            default:
                return 'Det har skjedd en feil. Vennligst prøv på nytt senere.';
        }
    }

    public getGameWindowErrorMessage(errorCode: string) {
        switch (errorCode) {
            case 'ExceedsBetLimit':
                return 'Beløpet overskrider dine oppsatte spillegrenser';
            case 'ExceedsMaxTotalCost':
                return 'Totalpris er for høy (maks {0})';
            case 'LimitNotSet':
                return 'Du må sette spillegrenser';
            default:
                return '';
        }
    }
}
