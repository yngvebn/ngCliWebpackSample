import { Component, Input, OnInit } from '@angular/core';
import {Modal, ModalContainer} from '../../../../../../Common/Modal/ModalContainer';

@Component({
selector: 'row-price-mobile',
templateUrl: 'RowPriceMobileComponent.tpl.html'
    
})
@Modal()
export default class RowPriceMobileComponent extends ModalContainer {
    @Input() selectedPriceInfo: GameWindow.IPriceInfoDisplayItem;
    @Input() stepItems: GameWindow.IPriceStepDisplayItem[];
    customRowPrice: number;
    onSelectRowPrice: Function;
    description: string;
    rowPriceRegex = '^[1-9][0-9]*$';

    ngOnInit() {
        let minimumRowPrice = this.stepItems[0].name;

        if (this.valueHasDecimals(this.stepItems[0].value * 0.01)) {
            this.description = `Velg eller skriv rekkepris, beløpet må være mellom ${minimumRowPrice} - 99999.`;
            this.rowPriceRegex = `^[0-9]+([\,\.][5]0?){0,3}$`;
        } else {
            this.description = `Velg eller skriv rekkepris, beløpet må være et heltall mellom ${minimumRowPrice} - 99999.`;
            this.rowPriceRegex = `^[${minimumRowPrice}-9][0-9]*$`;
        }
    }

    public selectRowPrice(step: GameWindow.IPriceStepDisplayItem) {
        this.onSelectRowPrice(step);
        this.closeModal();
    }

    public selectCustomRowPrice() {
        if (!this.customRowPrice) {
            this.onSelectRowPrice();
            this.closeModal();
            return;
        }

        let customRowPriceName = this.customRowPrice.toString();

        if (this.valueHasDecimals(this.customRowPrice))
            customRowPriceName = this.customRowPrice.toFixed(2).toString().replace('.', ',');

        let customRowPrice = { name: customRowPriceName, value: this.customRowPrice * 100, fraction: 100 } as GameWindow.IPriceStepDisplayItem;
        this.onSelectRowPrice(customRowPrice);
        this.closeModal();
    }

    public getStepValue(value: number) {
        let val = value * 0.01;

        if (this.valueHasDecimals(val))
            return val.toFixed(2).toString().replace('.', ',');

        return val.toString();
    }

    private valueHasDecimals(value: number) {
        return value % 1 !== 0;
    }
}