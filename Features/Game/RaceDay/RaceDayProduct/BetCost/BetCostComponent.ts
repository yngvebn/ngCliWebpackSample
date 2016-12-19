import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BetDataService, IBetData } from '../../../../Common/BetData/BetDataService';
import { IPriceInfoDisplayItem } from './EditableSelect/IPriceInfoDisplayItem';
import * as _ from 'lodash';
import KronerPipe from '../../../../Common/Filters/Kroner';

@Component({
    selector: 'bet-cost',
    templateUrl: 'BetCostComponent.tpl.html'
})
export default class BetCostComponent implements OnInit {
    private kroner: KronerPipe;
    private betDataService: BetDataService;
    
    @Input() priceInfo: IPriceInfoForProduct[];
    @Input() estimatedTotalPrice: number;
    @Input() numberOfRows: number;
    @Output() onSelect = new EventEmitter<IPriceInfoDisplayItem>();

    

    priceInfoForCurrentTicket: IPriceInfoForProduct;

    constructor(kroner: KronerPipe) {
        this.kroner = kroner;
    }

    priceViewModel: {
        defaultSelection: IPriceInfoDisplayItem;
        displayItems: IPriceInfoDisplayItem[];
    } = { defaultSelection: null, displayItems: null }

    public getEstimatedPrice() {
        let price = this.estimatedTotalPrice;
        return price + this.getEstimatedFee(price);
    }

    selectPrice(item: IPriceInfoDisplayItem) {
        this.onSelect.emit(item);
    }

    getEstimatedFee(betCost) {
        let currentFeeInfo = this.priceInfoForCurrentTicket.feeInfo;

        var betFeeStep = Math.ceil(betCost / currentFeeInfo.stepAmount);
        var multiplier = Math.min(betFeeStep, currentFeeInfo.totalSteps);
        var betFee = multiplier * currentFeeInfo.stepFee;
        return betFee;
    }

    ngOnInit(): void {
        this.priceInfoForCurrentTicket = _.find(this.priceInfo, (info) => info.betMethod === "Vanlig");
        let hasPricesFraction = _.some(this.priceInfoForCurrentTicket.predefinedPrices, (price) => price % 100 !== 0);
        this.priceViewModel.displayItems = _.map(this.priceInfoForCurrentTicket.predefinedPrices, (info) => {
            return <IPriceInfoDisplayItem>{
                value: info,
                name: this.kroner.transform(info, true, hasPricesFraction, false)
            }
        });
        this.priceViewModel.defaultSelection = _.find(this.priceViewModel.displayItems, (price) => price.value === this.priceInfoForCurrentTicket.defaultRowPrice);
        this.selectPrice(this.priceViewModel.defaultSelection);
    }
}