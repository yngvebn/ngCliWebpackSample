import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as SubscribingComponent from '../../../../../../Common/BaseComponent/EventSubscribingComponent';
import * as ActiveRaceDay from '../../../../../Models/IActiveRaceDay';
import PurchaseConfirmationService from './PurchaseConfirmationService';
import ProgramService from '../../../Program/ProgramService';
import Program from '../../../../../Models/Program';
import ActiveRace from '../../../../../Models/ActiveRace';
import RaceInfoHub from '../../../../../../Common/Hubs/RaceInfoHub';
import * as Interfaces from '../../../../../../Common/Hubs/RaceInfoContracts/interfaces';
import * as _ from 'lodash';
import * as DataService from '../../../../../../Common/BetData/BetDataService';
import BetDataService = DataService.BetDataService;

@Component({
    templateUrl: 'PurchaseConfirmationComponent.tpl.html',
    selector: 'purchase-confirmation',
    viewProviders: [RouterLink]
})
export class PurchaseConfirmationComponent implements OnInit {
    
    @Input() betData: string;
    @Input() selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    @Input() programData: Program;
    @Input() customerSupportLinks: ICustomerSupportLink[];
    @Input() priceInfoForProduct: IPriceInfoForProduct[];
    @Input() firstRaceInProduct: ActiveRace;

    private betDataObj: DataService.IBetData;
    private betDataService: DataService.BetDataService;
    private purchaseConfirmationService: PurchaseConfirmationService;
    private programService: ProgramService;
    private summary: IPurchaseConfirmationSummary = {};
    private newScratches: IScratchedStart[] = [];
    private isPurchaseInProgress: boolean = false;

    
    @Output() public onPurchase = new EventEmitter();
    public raceToLegNumber: { [raceNumber: number]: number } = {};

    constructor(betDataService: BetDataService, purchaseConfirmationService: PurchaseConfirmationService, raceInfoHub: RaceInfoHub, programService: ProgramService) {

        this.betDataService = betDataService;
        this.purchaseConfirmationService = purchaseConfirmationService;
        this.programService = programService;
        

        raceInfoHub.onStartHasBeenScratched(this.onStartHasBeenScratched);
        raceInfoHub.onScratchedStartHasBeenReinstated(this.onScratchedStartHasBeenReinstated);
    }

    ngOnInit() {
        this.betDataObj = this.betDataService.parse(this.betData).data;

        this.programService.getScratchedStartsForGame(this.selectedRaceDay.raceDayKey, this.programData.product)
            .then((scratchedStartsByRace: IScratchedStart[]) => {
                this.newScratches = _.filter(scratchedStartsByRace, scratch => !this.programData.isScratched(scratch.raceNumber, scratch.startNumber) && this.isStartPartOfTicket(scratch.raceNumber, scratch.startNumber));

                this.programData.setScratches(scratchedStartsByRace);

                this.purchaseConfirmationService.buildSummary(this.betDataObj, this.priceInfoForProduct, this.summary, this.programData);
            });

        _.forEach(this.programData.races, race => this.raceToLegNumber[race.raceNumber] = race.legNumber);
    }


    public purchase() {
        this.isPurchaseInProgress = true;
        this.onPurchase.next();
    }

    private isStartPartOfTicket(raceNumber: number, startNumber: number) {
        let legNumber = this.raceToLegNumber[raceNumber];

        if (!legNumber)
            return false;

        return _.includes(this.betDataObj.marks[legNumber], startNumber);
    }

    private onStartHasBeenScratched = (event: any, data: Interfaces.IStart) => {
        if (this.selectedRaceDay.raceDayKey !== data.raceDay)
            return;

        if (!this.isStartPartOfTicket(data.raceNumber, data.startNumber))
            return;

        this.purchaseConfirmationService.updateRaceChangesOnScratchedStart(this.newScratches, this.programData, data);
        this.purchaseConfirmationService.buildRaceSummary(this.betDataObj, this.programData, this.summary);
    }

    private onScratchedStartHasBeenReinstated = (event: any, data: Interfaces.IStart) => {
        if (this.selectedRaceDay.raceDayKey !== data.raceDay)
            return;

        this.purchaseConfirmationService.updateRaceChangesOnReinstatedStart(this.newScratches, data);
        this.purchaseConfirmationService.buildRaceSummary(this.betDataObj, this.programData, this.summary);
    }
}