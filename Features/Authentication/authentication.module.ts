import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import LoginDialogComponent from './Components/Login/LoginDialogComponent';
import LoginComponent from './Components/Login/LoginComponent';
import UrlSettingsService from "../Settings/UrlSettings/UrlSettingsService";
import {ModalService} from "../Common/Modal/ModalService";
import {ModalModule} from "../Common/Modal/modal.module";
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {PipesModule} from "../Common/PipesModule";
import { GenericDataService } from '../Common/GenericDataService';
import AccountService from "../Account/AccountService";
import * as Broadcaster from '../Common/BroadcasterService/BroadcasterService';
import {AuthenticationService} from './AuthenticationService';

@NgModule({
    entryComponents: [LoginDialogComponent],
    imports: [
        BrowserModule,
        ModalModule,
        HttpModule,
        FormsModule,
        PipesModule
    ],
    declarations: [
        LoginDialogComponent,
        LoginComponent
    ],
    providers: [
        AuthenticationService,
        AccountService,
        UrlSettingsService,
        ModalService,
        GenericDataService,
        Broadcaster.BroadcasterService
    ],
    bootstrap: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule {}
