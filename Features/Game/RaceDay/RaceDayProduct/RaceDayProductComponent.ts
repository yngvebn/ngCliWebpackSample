import { Component, OnInit } from '@angular/core';
import ProductsForRaceDay from '../ProductTimeline/ProductsForRaceDay';

import { ActivatedRoute, Router } from '@angular/router';

import Program from '../../Models/Program';
console.assert(Program, "Uhoh, Something was not defined, likely part of a circular reference loop");


import * as MultiLegProductForTimeline from '../../Models/IMultiLegProductForTimeline';
import ActiveRace from '../../Models/ActiveRace';
import FormRowsService from './Program/FormRows/FormRowsService';
import BetTypeCode from '../../../Common/Enums/BetTypeCode';

import * as _ from 'lodash';
import { IStart, IRace, IDriverChanged } from '../../../Common/Hubs/RaceInfoContracts/interfaces';
import * as RowsService from './Program/FormRows/IFormRowsService';
import * as TotalInvestmentForPool from '../../Models/ITotalInvestmentForPool';
import * as LoggedInUser from '../../../Authentication/Models/ILoggedInUser';
import RaceInfoHub from '../../../Common/Hubs/RaceInfoHub';

import * as BetData from '../../../Common/BetData/BetDataService';
import Race from '../../Models/Race';
import * as Index from '../../../Common/index';
import KronerPipe from '../../../Common/Filters/Kroner';
import ErrorMessageService from '../../../Common/ErrorMessages/ErrorMessageService';
import * as PriceInfoDisplayItem from './BetCost/EditableSelect/IPriceInfoDisplayItem';
import BetMethod from '../../../Common/Enums/BetMethod';
import FractionValue from '../../../Common/Enums/FractionValue';
import { AuthenticationService } from '../../../Authentication/AuthenticationService';

@Component({
    templateUrl: "RaceDayProductComponent.tpl.html",
    selector: 'race-day-product',
    providers: [KronerPipe]
})
export class RaceDayProductComponent{// implements OnInit/*extends EventSubscribingComponent*/ {
    //private betMethod: any;
    //private betTypeCode: any;
    //private fractionValue: any;
    //private ticketValidator: any;
    //private ticketMapperService: TicketMapperService;
    private errorMessageService: ErrorMessageService;
    //private broadcasterService: BroadcasterService;
    private authenticationService: AuthenticationService;
    //private accountService: AccountService;
    private uiService: Index.UiService;
    //private $window: angular.IWindowService;
    //private RaceDay: any;
    private selectedRace: Race;
    private _selectedLeg;
    //private betDataString: string;
    //private priceInfoFactory: GameWindow.IPriceInfoFactory;
    //private betLimitExceeded: boolean;
    //private userIsLoggedIn: boolean;
    //private userCredit: ICredit;
    private kronerPipe: KronerPipe;

    public bettingSystemIsOpenForBet: boolean;
    public totalInvestment: TotalInvestmentForPool.ITotalInvestmentForPool[];
    public priceInfoForProduct: IPriceInfoForProduct[];
    public selectedPriceInfo: PriceInfoDisplayItem.IPriceInfoDisplayItem;
    public programData: Program;

    public selectedRaceNumber: number;
    public product: BetTypeCode;
    public raceDayKey: string;
    //public selectedRaceDay: IActiveRaceDay;
    public ticketVisible: boolean = true;
    public error: string;
    public productsForRaceDay: ProductsForRaceDay;

    private betDataService: BetData.BetDataService;
    public betData: BetData.IBetData = { marks: {} };

    public firstRaceInProduct: ActiveRace;
    public multiLegProduct: MultiLegProductForTimeline.IMultiLegProductForRaceDay;
    public maxNumberOfStartsForProduct: number;

    //public ticketSelections: { [id: number]: number[] } = {};

    //private gameSettings: any;
    //private totalPriceWatch: any;
    private formRowsService: RowsService.IFormRowsService;

    public estimatedTotalPrice: number;
    public numberOfRows: number;
    public maxAllowedCost = 9999900;
    public maxAllowedCostExceeded: boolean;


	public selectedTab = null;
    public isTabForOddsVisible: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, formRowsService: FormRowsService, uiService: Index.UiService, raceInfoHub: RaceInfoHub, betDataService: BetData.BetDataService, kronerPipe: KronerPipe, errorMessageService: ErrorMessageService, authenticationService: AuthenticationService) {
        /*PriceInfo: GameWindow.IPriceInfoFactory, BetData: any, betMethod: any, betTypeCode: any, ticketValidator: any, ticketMapperService: TicketMapperService, RaceDay: GameWindow.IRaceDayFactory, gameSettings: any, errorMessageService: ErrorMessageService, broadcasterService: BroadcasterService, authenticationService: AuthenticationService, accountService: AccountService*/
        //super();

        this.betDataService = betDataService;
        //this.betMethod = betMethod;
        //this.betTypeCode = betTypeCode;
        //this.fractionValue = fractionValue;
        //this.ticketValidator = ticketValidator;
        //this.ticketMapperService = ticketMapperService;
        this.errorMessageService = errorMessageService;
        //this.broadcasterService = broadcasterService;
        this.authenticationService = authenticationService;
        //this.accountService = accountService;
        this.uiService = uiService;

        //this.RaceDay = RaceDay;
        //this.priceInfoFactory = PriceInfo;
        this.formRowsService = formRowsService;
        this.kronerPipe = kronerPipe;

        //this.product = $stateParams.product;
        //this.raceDayKey = $stateParams.raceDayKey;
        //this.betDataString = $stateParams.betData;
        //this.gameSettings = gameSettings;

        //this.selectRace(this.programData.races[0].raceNumber);

        raceInfoHub.onStartHasBeenScratched(this.startHasBeenScratched);
        raceInfoHub.onScratchedStartHasBeenReinstated(this.scratchedStartHasBeenReinstated);
        raceInfoHub.onDriverHasBeenChanged(this.driverHasBeenChanged);
        //this.eventSubscriptions.push(broadcasterService.onUserCreditHasChanged(this.userCreditHasChanged));
        //this.eventSubscriptions.push(broadcasterService.onUserHasLoggedIn(this.userHasLoggedIn));
        //this.eventSubscriptions.push(broadcasterService.onUserHasLoggedOut(this.userHasLoggedOut));



    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { productsForRaceDay: ProductsForRaceDay, programData: Program, totalInvestment: TotalInvestmentForPool.ITotalInvestmentForPool[], priceInfoForProduct: IPriceInfoForProduct[], bettingSystemIsOpenForBet: boolean }) => {
                this.programData = data.programData;
                this.bettingSystemIsOpenForBet = data.bettingSystemIsOpenForBet;
                this.totalInvestment = data.totalInvestment;
                this.priceInfoForProduct = data.priceInfoForProduct;
                this.productsForRaceDay = data.productsForRaceDay;
		
		this.isTabForOddsVisible = this.programData.product === BetTypeCode.DD;
            });
        this.route.params
            .map(params => {
                return {
                    product: params['product'],
                    raceDayKey: params['raceDayKey']
                }
            })
            .subscribe((params) => {
                this.multiLegProduct = <MultiLegProductForTimeline.IMultiLegProductForRaceDay>_.find(this.productsForRaceDay.products, (p) => p.product === params.product);
                this.raceDayKey = params.raceDayKey;
                this.product = params.product;

                this.betData.product = this.product;
            });
        this.route.queryParams.subscribe((data: { betData?: string }) => {
            if (data.betData){
                this.betData = this.betDataService.parse(data.betData).data;
            }
        });
        this.authenticationService.isLoggedIn()
            .then((loggedIn: boolean) => {
                if (loggedIn) {
                    this.prepareForLoggedInUser();
                }
            });

    
        this.initializePrices();
        

        this.maxNumberOfStartsForProduct = _.max(_.map(this.programData.races, race => race.starts.length));
        this.firstRaceInProduct = _.find(this.productsForRaceDay.races, (race) => race.raceNumber === this.programData.races[0].raceNumber);
        this.selectRace(this.firstRaceInProduct.raceNumber);
    }

    public toggleTicketVisibility() {
        this.ticketVisible = !this.ticketVisible;
    }

    public updateMarkings(marks: { [leg: number]: number[] } = {}) {
        this.betData.marks = marks;
        let betDataService = this.betDataService.init(this.betData);
        this.estimatedTotalPrice = betDataService.getEstimatedTotalPrice();
        this.numberOfRows = betDataService.getNumberOfRows();
        this.validateMaxAllowedCost(this.estimatedTotalPrice);
    }
    

    public selectRace(raceNumber: number) {
        if (!raceNumber)
            return;

        this.selectedRaceNumber = raceNumber;

        let affectedRace = this.programData.getRace(raceNumber);
        this.selectedRace = affectedRace;
        if (!affectedRace.hasFormRows) {
            let race: IRace = { raceDay: this.raceDayKey, raceNumber: raceNumber };

            this.formRowsService.getTrotFormRowsForRace(race).then(result => {
                affectedRace.addFormRows(result.formRowsForStarts);
            });
        }

    }



    private prepareForLoggedInUser() {
        //this.userIsLoggedIn = true;

        //this.getCustomerCredit()
        //    .then(() => this.validateBetLimit(this.getCurrentBetData().getEstimatedTotalPrice()));
    }

    public get selectedLeg(): any {
        //if (this._selectedLeg && this._selectedLeg.raceNo === this.selectedRaceNumber && this._selectedLeg.betTypeCode === this.gameWindowOptions.betTypeCode)
        //    return this._selectedLeg;

        //this._selectedLeg = this.gameWindowOptions.raceDay.getLegFor(this.gameWindowOptions.betTypeCode, this.selectedRaceNumber);
        return this._selectedLeg;

    }

    public getCurrentBetData(): BetData.BetDataService {
        let betDataService = this.betDataService.init(this.betData);
        let betData = betDataService.setRaceDayKey(this.raceDayKey)
            .setProduct(this.product)
            .setBetMethod(BetMethod.vanlig)
            .setFraction(FractionValue.full);
        return betData;

        //if (!this.bettingSystemIsOpenForBet || !this.multiLegProduct.isOpenForBet) return null;

        //let marks = this.gameWindowOptions.raceDay.getMarksFor(this.gameWindowOptions.betTypeCode);
        //let ownGames = this.gameWindowOptions.raceDay.getOwnGamesFor(this.gameWindowOptions.betTypeCode);
        //let raceNumber = this.selectedRaceNumber;

        //let betData = this.betDataService.load({
        //    raceDate: this.gameWindowOptions.raceDay.raceDayKey.date,
        //    track: this.gameWindowOptions.raceDay.raceDayKey.trackCode,
        //    product: this.gameWindowOptions.betTypeCode,
        //    organization: this.gameWindowOptions.raceDay.raceDayKey.orgCode,
        //    marks: marks,
        //    raceNumber: raceNumber,
        //    ownGames: ownGames,
        //    rowPrice: this.gameWindowOptions.selectedPriceInfo.value,
        //    fraction: this.gameWindowOptions.selectedPriceInfo.fraction,
        //    betMethod: this.gameWindowOptions.betMethod,
        //    isAllIn: false
        //});

        //return betData;
    }
    
    public selectTab(tab: string): void {
        this.selectedTab = tab;
    }
    
    public onBetCostSelected(item: PriceInfoDisplayItem.IPriceInfoDisplayItem, maxPrice: number) {
        this.selectedPriceInfo = item;
        this.betData.rowPrice = item.value;
        let betDataService = this.betDataService.init(this.betData);
        this.estimatedTotalPrice = betDataService.getEstimatedTotalPrice();
        this.numberOfRows = betDataService.getNumberOfRows();
        this.validateMaxAllowedCost(this.estimatedTotalPrice);
    }

    private initializePrices() {
        //this.gameWindowOptions.priceInfo = this.priceInfoFactory.load(_.find(this.priceInfoForProduct, priceInfo => priceInfo.betMethod.toLowerCase() === this.gameWindowOptions.betMethod.name.toLowerCase()));

        //if (!this.gameWindowOptions.priceInfo.feeInfo)
        //    this.gameWindowOptions.priceInfo.feeInfo = { stepAmount: 0, stepFee: 0, totalSteps: 0 };

        //let selectedPriceInfoFromBetData;
        //if (this.betDataString) {
        //    let betData = this.betDataService.parse(this.betDataString);
        //    selectedPriceInfoFromBetData = _.find(this.gameWindowOptions.priceInfo.displayItems, item => item.value === betData.rowPrice);
        //}

        //this.gameWindowOptions.selectedPriceInfo = selectedPriceInfoFromBetData || this.gameWindowOptions.priceInfo.defaultSelection;
        //this.gameWindowOptions.priceInfo.defaultSelection = this.gameWindowOptions.selectedPriceInfo;
        //this.gameWindowOptions.priceInfo.defaultStep = this.gameWindowOptions.selectedPriceInfo;
    }

    private buildTicketOptions() {
        //this.gameWindowOptions.betTypeCode = this.betTypeCode[this.product.toString()];
        //this.gameWindowOptions.betMethod = this.betMethod[BetMethod.vanlig.toLowerCase()];
        //this.gameWindowOptions.raceDay = this.RaceDay.load(this.ticketMapperService.map(this.programData, this.productsForRaceDay));
        //this.gameSettings.TOTAL_NUMBER_OF_STARTS = this.programData.numberOfStartsPerRace;
    }

    private getCustomerCredit() {
        //return this.accountService.getCredit()
        //    .then(credit => {
        //        this.userCredit = credit;
        //    });
    }

    private setupWatchForTotalPrice(): () => void {
        //if (!this.bettingSystemIsOpenForBet || !this.multiLegProduct.isOpenForBet) return () => { };

        //if (this.totalPriceWatch)
        //    this.totalPriceWatch();

        //return this.$scope.$watch(() => {
        //    return this.getCurrentBetData().getEstimatedTotalPrice();
        //}, (amount) => {
        //    this.estimatedTotalPrice = amount;
        //    this.validateBetLimit(amount);
        //    this.validateMaxAllowedCost(amount);
        //});
        return () => { };
    }

    private validateBetLimit(amount: number) {
        //if (!this.userIsLoggedIn) {
        //    this.clearBetLimitError();
        //    return;
        //}

        /*if (this.userCredit.hasBetLimit) {
            if (amount > this.userCredit.remainingBetLimit) {
                this.betLimitExceeded = true;
                this.error = this.errorMessageService.getGameWindowErrorMessage('ExceedsBetLimit');
            }
            else
                this.clearBetLimitError();
        }*/

        //else if (!this.userCredit.hasBetLimit) {
        //    this.betLimitExceeded = true;
        //    this.error = this.errorMessageService.getGameWindowErrorMessage('LimitNotSet');
        //}
    }

    private clearBetLimitError() {
        //this.betLimitExceeded = false;
        //this.error = null;
    }

    private validateMaxAllowedCost(amount: number) {
        if (amount > this.maxAllowedCost) {
            this.maxAllowedCostExceeded = true;
            this.error = this.errorMessageService.getGameWindowErrorMessage('ExceedsMaxTotalCost').replace('{0}', this.kronerPipe.transform(this.maxAllowedCost, false, true, false).toString());
        } else {
            this.maxAllowedCostExceeded = false;
            this.error = null;
        }

    }

    public purchase() {
        var currentBetData = this.getCurrentBetData();
        this.router.navigate(['bekreft'], {
            queryParams:
            { betData: currentBetData.serializeToBetDataString() },
            relativeTo: this.route
        });

        //this.ticketValidator.validate(currentBetData, this.gameWindowOptions.raceDay.getRacesFor(currentBetData.product.toString(), true))
        //    .then((betData: any) => {
        //        this.error = null;
        //        this.$state.go(Routes.RaceDay.Purchase.stateName, { 'betData': currentBetData.serializeToBetDataString() });
        //    }, (error: string) => {
        //        this.error = error;
        //    });
    }

    public resetTicket(): void {
        _.forEach(this.betData.marks, (val, key) => {
            this.betData.marks[key] = [];
        });
        this.onBetCostSelected(null, null);
        //var priceInfo = angular.copy(this.gameWindowOptions.priceInfo);
        //this.gameWindowOptions.priceInfo = null;
        //this.gameWindowOptions.priceInfo = priceInfo;
    }

    private startHasBeenScratched = (event, start: IStart) => {
        if (this.programData.raceDay !== start.raceDay)
            return;

        this.programData.scratchStart(start.raceNumber, start.startNumber);
    }

    private scratchedStartHasBeenReinstated = (event, start: IStart) => {
        if (this.programData.raceDay !== start.raceDay)
            return;

        this.programData.reinstateStart(start.raceNumber, start.startNumber);
    }

    private driverHasBeenChanged = (event, driverChange: IDriverChanged) => {
        if (this.programData.raceDay !== driverChange.raceDay)
            return;

        this.programData.driverHasChanged(driverChange.raceNumber, driverChange.startNumber, driverChange.newDriver);
    }

    private userHasLoggedIn = (event, user: LoggedInUser.ILoggedInUser) => {
        //this.prepareForLoggedInUser();
    }

    private userHasLoggedOut = (event) => {
        //this.userIsLoggedIn = false;
        //this.userCredit = undefined;
        //this.clearBetLimitError();
    }

    private userCreditHasChanged = (event, credit: ICredit) => {
        //this.userCredit = credit;
        //let currentBetData = this.getCurrentBetData();
        //if (currentBetData) {
        //    this.validateBetLimit(currentBetData.getEstimatedTotalPrice());
        //}
    }
}
