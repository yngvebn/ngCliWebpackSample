import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import UrlSettingsService from '../../../Settings/UrlSettings/UrlSettingsService';
import * as LoggedInUser from '../../Models/ILoggedInUser';
import {Modal, ModalContainer } from "../../../Common/Modal/ModalContainer";
import {AuthenticationService} from '../../AuthenticationService';

@Component({
    selector: 'login-dialog',
    templateUrl: 'LoginDialog.tpl.html'
})
@Modal()
export default class LoginDialogComponent extends ModalContainer {
    public error: string;
    public isBusyLoggingIn: boolean;
    public logonAttemptsExceeded: boolean;

    public forgotPasswordUrl: string;

    private authenticationService: AuthenticationService;

    public onLoggedInUser: Function;
    
    /* @ngInject */
    constructor(authenticationService: AuthenticationService, urlSettingsService: UrlSettingsService) {
        super();
        this.authenticationService = authenticationService;
        
        urlSettingsService.getForgotPasswordUrl()
            .then((url: string) => {
                this.forgotPasswordUrl = url;
            });
    }

    public close() {
        this.closeModal();
        //this.$scope.closeThisDialog('close');
    }

    public doLogin(form: NgForm) {
        let username = form.value['username'];
        let password = form.value['password'];

        this.error = null;
        this.logonAttemptsExceeded = false;

        if (!username) {
            this.error = 'Mangler brukernavn';
            return;
        }

        if (!password) {
            this.error = 'Mangler passord';
            return;
        }

        if (form.invalid)
            return;

        this.isBusyLoggingIn = true;

        this.authenticationService.login({
            username: username,
            password: password
        }).then((response: LoggedInUser.ILoggedInUser) => {
            this.onLoggedInUser(username);
            this.closeModal();
            //this.$scope.closeThisDialog({ username: username } as LoggedInUser.ILoggedInUser);
        }).catch((reason: string) => {
            if (reason === undefined)
                reason = 'ServiceError';

            switch (reason) {
                case 'InvalidCredentials':
                    this.error = 'Feil brukernavn eller passord';
                    break;
                case 'LogonAttemptsExceeded':
                    this.logonAttemptsExceeded = true;
                    break;
                case 'AccountLocked':
                    this.error = 'Brukeren er sperret';
                    break;
                default:
                    this.error = 'Kunne ikke logge på - vennligst prøv igjen senere';
                    break;
            }
            this.isBusyLoggingIn = false;
        });
    }
}



