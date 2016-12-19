import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Routes1 from '../../../../Common/Routes/Routes';
import EpiDataService from '../../../../Common/EpiserverDataService/EpiserverDataService';
import { AuthenticationService } from '../../../../Authentication/AuthenticationService';
import * as Broadcaster from '../../../../Common/BroadcasterService/BroadcasterService';
import * as ActiveRaceDay from '../../../Models/IActiveRaceDay';
import Program from '../../../Models/Program';
import ProductsForRaceDay from '../../ProductTimeline/ProductsForRaceDay';
import ActiveRace from '../../../Models/ActiveRace';
import { ModalService } from "../../../../Common/Modal/ModalService";


import * as _ from 'lodash';
import { PurchaseDialogComponent } from './PurchaseDialog/PurchaseDialogComponent';
import LoginDialogComponent from '../../../../Authentication/Components/Login/LoginDialogComponent';

@Component({
    template: ''
})
export default class PurchaseComponent implements OnInit {
    private vcRef: ViewContainerRef;

    authenticationService: AuthenticationService;
    broadcasterService: Broadcaster.BroadcasterService;
    ngDialog: any; //angular.dialog.IDialogService;
    $state: any; //angular.ui.IStateService;
    selectedRaceDay: ActiveRaceDay.IActiveRaceDay;
    programData: Program;
    customerSupportLinks: ICustomerSupportLink[];
    priceInfoForProduct: IPriceInfoForProduct[];
    betData: string;
    isLoggedIn: boolean;
    $scope: any; // angular.IScope;
    bettingSystemIsOpenForBet: boolean;
    productsForRaceDay: ProductsForRaceDay;
    firstRaceInProduct: ActiveRace;
    modalService: ModalService;


    constructor(private route: ActivatedRoute, modalService: ModalService, vcRef: ViewContainerRef, authenticationService: AuthenticationService, broadcasterService: Broadcaster.BroadcasterService) {
        this.vcRef = vcRef;
        this.modalService = modalService;
        this.authenticationService = authenticationService;
        this.broadcasterService = broadcasterService;

        this.authenticationService.isLoggedIn()
            .then((response: boolean) => {
                this.isLoggedIn = response;

                if (!this.isLoggedIn)
                    this.openLoginDialog();
                else
                    this.openConfirmDialog();
            });
    }

    ngOnInit(): void {
        this.route.parent.data
            .subscribe((data: { selectedRaceDay: ActiveRaceDay.IActiveRaceDay, programData: Program, productsForRaceDay: ProductsForRaceDay, priceInfoForProduct: IPriceInfoForProduct[], bettingSystemIsOpenForBet: boolean  }) => {
                this.selectedRaceDay = data.selectedRaceDay;
                this.programData = data.programData;
                this.productsForRaceDay = data.productsForRaceDay;
                this.firstRaceInProduct = _.find(this.productsForRaceDay.races, (race) => race.raceNumber === this.programData.races[0].raceNumber);
                this.priceInfoForProduct = data.priceInfoForProduct;
                this.bettingSystemIsOpenForBet = data.bettingSystemIsOpenForBet;

            });

        this.route.queryParams.subscribe(data => {
            this.betData = data['betData'];
        });
    }

    private openLoginDialog() {
        this.modalService.createModal<LoginDialogComponent>(LoginDialogComponent, this.vcRef, {
            onLoggedInUser: (response) => {
                this.isLoggedIn = true;
                this.openConfirmDialog();
            }
        });
    }

    private openConfirmDialog() {
        this.modalService.createModal<PurchaseDialogComponent>(PurchaseDialogComponent, this.vcRef, {
            betData: this.betData,
            selectedRaceDay: this.selectedRaceDay,
            programData: this.programData,
            bettingSystemIsOpenForBet: this.bettingSystemIsOpenForBet,
            firstRaceInProduct: this.firstRaceInProduct,
            customerSupportLinks: [],
            priceInfoForProduct: this.priceInfoForProduct

        });
    }
}
