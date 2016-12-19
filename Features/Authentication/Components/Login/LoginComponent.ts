import { Component, Input, ViewContainerRef, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import * as Broadcaster from '../../../Common/BroadcasterService/BroadcasterService';
//import * as SubscribingComponent from '../../../Common/BaseComponent/EventSubscribingComponent';
import UrlSettingsService from '../../../Settings/UrlSettings/UrlSettingsService';
import { AuthenticationService } from '../../AuthenticationService';
import AccountService from '../../../Account/AccountService';
import * as LoggedInUser from '../../Models/ILoggedInUser';
import {IPurchaseReceipt as PurchaseReceipt} from '../../../Game/RaceDay/RaceDayProduct/Purchase/PurchaseService/Models/IPurchaseReceipt';
import { ModalService } from "../../../Common/Modal/ModalService";
import LoginDialogComponent from "./LoginDialogComponent";

@Component({
    templateUrl: 'Login.tpl.html',
    selector: 'login'

})
export default class LoginComponent {// extends SubscribingComponent.EventSubscribingComponent {

    public isLoggedIn: boolean = false;

    public credit: ICredit;
    public numberOfActiveGames: number;
    public user: LoggedInUser.ILoggedInUser;
    public error: boolean;
    public displayDetails: boolean = false;

    private hasLoadedUserData: boolean = false;
    private betLimitUrl: string;
    private depositUrl: string;
    private authenticationService: AuthenticationService;
    private accountService: AccountService;
    private urlSettingsService: UrlSettingsService;
    private broadcasterService: Broadcaster.BroadcasterService;
    private modalService: ModalService;
    private vcRef: ViewContainerRef;
    private registerUrl: string;
    private $window: any;
    private changeDetectorRef: ChangeDetectorRef;

    constructor(modalService: ModalService, vcRef: ViewContainerRef, urlSettingsService: UrlSettingsService, accountService: AccountService, authenticationService: AuthenticationService, broadCasterService: Broadcaster.BroadcasterService, changeDetectorRef: ChangeDetectorRef) {
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.urlSettingsService = urlSettingsService;
        this.accountService = accountService;
        this.authenticationService = authenticationService;
        this.broadcasterService = broadCasterService;
        this.changeDetectorRef = changeDetectorRef;
    }

    ngOnInit() {

        this.authenticationService.isLoggedIn()
            .then((response) => {
                if (response)
                    this.getLoggedInUser();
            });

        this.urlSettingsService.getBetLimitUrl()
            .then((result: string) => {
                this.betLimitUrl = result;
            });

        this.urlSettingsService.getDepositUrl()
            .then((result: string) => {
                this.depositUrl = result;
            });

        this.urlSettingsService.getRegisterUrl()
            .then((result: string) => {
                this.registerUrl = result;
            });
    }

    public logout() {
        this.authenticationService.logOut()
            .then(response => {
                this.isLoggedIn = false;
                this.credit = null;
                this.numberOfActiveGames = null;
                this.user = null;
                this.displayDetails = false;
                this.broadcasterService.onUserHasLoggedOut();
            });
    }

    public openLoginDialog() {
        let loginModal = this.modalService.createModal<LoginDialogComponent>(LoginDialogComponent, this.vcRef, {
            onLoggedInUser: (username) => {
                this.getLoggedInUser()
                    .then(() => {
                        this.error = false;
                    });
            }
        });
    }

    private getLoggedInUser() {
        return this.authenticationService.getLoggedInUser()
            .then((response: LoggedInUser.ILoggedInUser) => {
                this.user = response;
                this.isLoggedIn = true;
                this.broadcasterService.onUserHasLoggedIn(response);
            });
    }

    public redirectToRegistration() {
        let url = `${this.registerUrl}?returnurl=${this.$window.location.href}`;
        this.$window.location.replace(url);
    }

    private updateUserData() {
        this.updateCredit();
        this.updateNumberOfActiveGames();
        this.hasLoadedUserData = true;
    }

    private updateCredit(): void {
        this.accountService.getCredit()
            .then((credit: ICredit) => {
                this.credit = credit;
            })
            .catch((error: any) => {
                this.error = true;
            });
    }

    private updateNumberOfActiveGames(): void {
        this.accountService.getNumberOfActiveGames()
            .then((value: number) => {
                this.numberOfActiveGames = value;
            });
    }

    @HostListener(Broadcaster.events.userHasLoggedIn, ['user'])
    private userHasLoggedIn(user: LoggedInUser.ILoggedInUser) {
        if (this.isLoggedIn)
            return;

        this.isLoggedIn = true;
        this.user = user;
    }

    @HostListener(Broadcaster.events.userCreditHasChanged, ['credit'])
    private userCreditHasChanged(credit: ICredit) {
        console.log('handling userCreditHasChanged', credit);
        this.credit = credit;

        this.changeDetectorRef.detectChanges();
    }

    @HostListener(Broadcaster.events.userHasPurchasedTicket, ['purchaseReceipt'])
    private userHasPurchasedTicket(purchaseReceipt: PurchaseReceipt) {
        this.updateNumberOfActiveGames();
    }

    public toggleDetails(): void {
        this.displayDetails = !this.displayDetails;

        if (this.displayDetails && !this.hasLoadedUserData) {
            this.updateUserData();
        }
    }
}
