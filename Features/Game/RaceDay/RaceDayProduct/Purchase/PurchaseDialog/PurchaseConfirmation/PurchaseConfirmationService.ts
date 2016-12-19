import { Injectable } from '@angular/core';

import BettingInfoService from '../../../../../../BettingInfo/BettingInfoService';
import Program from '../../../../../Models/Program';
import Race from '../../../../../Models/Race';
import * as Interfaces from '../../../../../../Common/Hubs/RaceInfoContracts/interfaces';

 

import * as _ from 'lodash';
import * as BetData from '../../../../../../Common/BetData/BetDataService';

@Injectable()
export default class PurchaseConfirmationService {
    private bettingInfoService: BettingInfoService;
    private betDataService: BetData.BetDataService;

    constructor(betDataService: BetData.BetDataService, bettingInfoService: BettingInfoService) {
        this.bettingInfoService = bettingInfoService;
        this.betDataService = betDataService;
    }

    public buildSummary(betData: BetData.IBetData, priceInfoForProduct: IPriceInfoForProduct[], summary: IPurchaseConfirmationSummary, program: Program) {
        summary.races = [];
        summary.estimatedFee = this.getEstimatedFee(betData, priceInfoForProduct);
        let betDataService = this.betDataService.init(betData);
        summary.numberOfRows = betDataService.getNumberOfRows();
        summary.totalCost = betDataService.getEstimatedTotalPrice() + summary.estimatedFee;

        this.buildRaceSummary(betData, program, summary);
    }

    public buildRaceSummary(betData: BetData.IBetData, program: Program, summary: IPurchaseConfirmationSummary) {
        summary.races = _.map(program.races, (race) => {
            return {
                legNumber: race.legNumber,
                raceNumber: race.raceNumber,
                markCount: this.getMarkCountFor(race, betData),
                marks: this.getMarksFor(program, race, betData)
            }
        });
    }

    private getMarkCountFor(race: Race, betData: BetData.IBetData) {
        let marks = betData.marks[race.legNumber];
        if (!marks)
            return null;

        return marks.length;
    }

    private getMarksFor(program: Program, race: Race, betData: BetData.IBetData) {
        let marks = betData.marks[race.legNumber];
        if (!marks)
            return null;

        return this.getMarkDetailsFor(program, race.raceNumber, marks);
    }

    private getMarkDetailsFor(program: Program, raceNumber: number, marks: number[]): IMarkDetails[] {
        let currentRace = program.getRace(raceNumber);
        let summaryMarks: IMarkDetails[] = [];

        _.each(marks, (mark: number) => {
            let currentStart = currentRace.getStart(mark);
            summaryMarks.push({
                mark: mark,
                horseName: !currentStart ? '' : currentStart.horseName,
                scratched: !currentStart ? false : currentStart.scratched
            });
        });

        return summaryMarks;
    }

    private getTotalCost(betData: BetData.IBetData, priceInfoForProduct: IPriceInfoForProduct[]) {
        return this.betDataService.init(betData).getEstimatedTotalPrice() + this.getEstimatedFee(betData, priceInfoForProduct);
    }

    private getEstimatedFee(betData: BetData.IBetData, priceInfoForProduct: IPriceInfoForProduct[]) {
        let currentFeeInfo = _.find(priceInfoForProduct, (info) => info.betMethod === "Vanlig").feeInfo;
        let betCost = this.betDataService.init(betData).getEstimatedTotalPrice();

        var betFeeStep = Math.ceil(betCost / currentFeeInfo.stepAmount);
        var multiplier = Math.min(betFeeStep, currentFeeInfo.totalSteps);
        var betFee = multiplier * currentFeeInfo.stepFee;
        return betFee;
    }

    public updateRaceChangesOnScratchedStart(startChanges: IScratchedStart[], program: Program, data: Interfaces.IStart) {
        var alreadyRegistered = _.some(startChanges, (start) => { return start.startNumber === data.startNumber && start.raceNumber === data.raceNumber; });
        if (alreadyRegistered)
            return;

        startChanges.push({
            startNumber: data.startNumber,
            raceNumber: data.raceNumber,
        });
    }

    public updateRaceChangesOnReinstatedStart(startChanges: IScratchedStart[], data: Interfaces.IStart) {
        let startIndex = _.findIndex(startChanges, (scratch) => { return scratch.startNumber === data.startNumber && scratch.raceNumber === data.raceNumber });

        if (startIndex === -1)
            return;

        startChanges.splice(startIndex, 1);
    }
}