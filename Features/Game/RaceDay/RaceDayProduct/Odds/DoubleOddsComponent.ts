import { Component, Input, OnInit } from '@angular/core';

import Program from '../../../Models/Program';
import Race from '../../../Models/Race';
import Start from '../Program/Models/Start';

import * as _ from 'lodash';
import { DoubleOddsService } from './DoubleOddsService';
import { IDoubleOddsCombinations } from './Models/IDoubleOddsCombinations';

@Component({
    templateUrl: 'DoubleOddsLarge.tpl.html',
    selector: 'double-odds-large'
})
export class DoubleOddsComponent /*implements OnInit*/ {
    @Input() public startTime: Date;
    @Input() private programData: Program;
    public doubleOdds: any;
    public hasMorePages: boolean;
    public isBusyLoadingMorePages: boolean = false;


    private doubleOddsService: DoubleOddsService;
    private page: number = 1;

    private raceForDd1: Race;
    private raceForDd2: Race;

    constructor(doubleOddsService: DoubleOddsService) {
        this.doubleOddsService = doubleOddsService;
    }


    ngOnInit(): void {

        // Races for DD
        this.raceForDd1 = this.programData.races[0];
        this.raceForDd2 = this.programData.races[1];

        // Get odds
        this.doubleOdds = [];
        this.getDoubleOdds(this.page);
    }

    public showMorePages() {
        if (!this.hasMorePages)
            return;

        this.isBusyLoadingMorePages = true;
        this.getDoubleOdds(this.page + 1);
    }

    private getDoubleOdds(pageToRetrieve: number) {
        this.doubleOddsService.getDoubleOdds(this.programData.raceDay, pageToRetrieve)
            .then((data: IDoubleOddsPaged) => {
                this.hasMorePages = data.hasMorePages;
                this.processDoubleOdds(data.doubleOdds as IDoubleOdds[]);
                this.page = pageToRetrieve;
            })
            .then(() => {
                this.isBusyLoadingMorePages = false;
            })
            .catch(() => {
                this.isBusyLoadingMorePages = false;
            });
    }

    private processDoubleOdds(doubleOdds: IDoubleOdds[]) {
        doubleOdds.forEach((combination: IDoubleOdds) => {
            let combo: IDoubleOddsCombinations = {
                start1: this.getDoubleOddsStart(this.raceForDd1, combination.startNumber1),
                start2: this.getDoubleOddsStart(this.raceForDd2, combination.startNumber2),
                odds: combination.odds
            };
            this.doubleOdds.push(combo);
        });
    }

    private getDoubleOddsStart(race: Race, startNumber: number): Start {
        return race.getStart(startNumber);
    }

}
