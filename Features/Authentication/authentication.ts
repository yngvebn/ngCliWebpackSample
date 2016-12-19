import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, Input, OnInit } from '@angular/core';
import { enableProdMode } from '@angular/core';
import * as moment from 'moment';
import {AuthenticationModule} from './authentication.module';

//enableProdMode();

platformBrowserDynamic().bootstrapModule(AuthenticationModule);

moment.locale('nb');