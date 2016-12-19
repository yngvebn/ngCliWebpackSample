import { Component, Input, Output, OnInit, ViewContainerRef, ComponentFactoryResolver, Type, Injector, EventEmitter } from '@angular/core';
import * as DataService from '../../../../../Common/BetData/BetDataService';

import * as _ from 'lodash';
import {GameModule} from "../../../../game.module";
import RowPriceMobileComponent from './RowPriceMobile/RowPriceMobileComponent';
import {ModalService} from '../../../../../Common/Modal/ModalService';

@Component({
    selector: 'bet-cost-mobile',
    templateUrl: 'BetCostMobileComponent.tpl.html'
})
export default class BetCostMobileComponent implements OnInit {
    private modalService: ModalService;
    private vcRef: ViewContainerRef;
    @Input() betData: DataService.IBetData;
    @Input() includeFee: boolean;
    @Input() priceInfo: IPriceInfoForProduct[];
    @Input() raceCount: number;
    @Input() estimatedTotalPrice: number;
    @Output() onSelect = new EventEmitter<GameWindow.IPriceInfoDisplayItem>();
    private rowPriceItems: GameWindow.IPriceInfoDisplayItem[];

    selectedPriceInfo: GameWindow.IPriceInfoDisplayItem = { value: 0, name: '', fraction: 100 };

    constructor(modalService: ModalService, vcRef: ViewContainerRef) {
        this.modalService = modalService;
        this.vcRef = vcRef;
    }

    ngOnInit(): void {
        let currentPriceInfo = _.find(this.priceInfo, (info) => info.betMethod === "Vanlig");
        this.selectedPriceInfo = {
            value: currentPriceInfo.defaultRowPrice,
            name: (currentPriceInfo.defaultRowPrice / 100).toString(),
            fraction: 100
        } as GameWindow.IPriceInfoDisplayItem;


        this.rowPriceItems = _.map(currentPriceInfo.predefinedPrices, (price) => {
            return {
                value: price,
                name: (price / 100).toString(),
                fraction: 100
            } as GameWindow.IPriceInfoDisplayItem;
        });
    }

    public getMarks() {
        let marks = this.betData.marks;
        let marksArray: number[] = [this.raceCount];

        for (var i = 1; i <= this.raceCount; i++) {
            marksArray[i - 1] = marks[i] === undefined ? 0 : marks[i].length;
        }

        return marksArray;
    }

    public getEstimatedPrice() {
        let price = this.estimatedTotalPrice;
        return price + (this.includeFee ? (this.getEstimatedFee(price)) : 0);
    }

    getEstimatedFee(betCost) {
        let priceInfo = _.find(this.priceInfo, (info) => info.betMethod === "Vanlig").feeInfo;
        var betFeeStep = Math.ceil(betCost / priceInfo.stepAmount);
        var multiplier = Math.min(betFeeStep, priceInfo.totalSteps);
        var betFee = multiplier * priceInfo.stepFee;
        return betFee;
    }

    public openRowPriceDialog() {
        this.modalService.createModal<RowPriceMobileComponent>(RowPriceMobileComponent, this.vcRef, {
            stepItems: this.rowPriceItems,
            selectedPriceInfo: this.selectedPriceInfo,
            onSelectRowPrice: this.onSelectRowPrice
        });
    }

    public onSelectRowPrice = (step: any) => {
        if (step) {
            this.onSelect.emit(step);
            this.selectedPriceInfo = step;
        }
    }
}
