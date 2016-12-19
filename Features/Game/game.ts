import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, Input, OnInit } from '@angular/core';
import { GameModule } from './game.module';
import { enableProdMode } from '@angular/core';
import * as moment from 'moment';

//enableProdMode();

platformBrowserDynamic().bootstrapModule(GameModule);

moment.locale('nb');