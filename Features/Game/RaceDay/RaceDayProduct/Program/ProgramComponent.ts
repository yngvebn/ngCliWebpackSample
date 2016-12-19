import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import Program from '../../../Models/Program';
import ActiveRace from '../../../Models/ActiveRace';
import Start from './Models/Start';
import Race from '../../../Models/Race';

import * as _ from 'lodash';

@Component({
    template: `
        <program-large *large
                 [marks]="betData.marks" 
                 (onMarkingsChange)="updateMarkings($event)"
                 [programData]="programData" 
                 [races]="productsForRaceDay.races" 
                 [selectedRaceNumber]="selectedRaceNumber" 
                 (onSelectRace)="selectRace($event)"
                 ng-class="{'is-closed-for-bet': !ctrl.multiLegProduct.isOpenForBet || !ctrl.bettingSystemIsOpenForBet }"></program-large>
        
        <program-small
                *mediumDown
                 [marks]="betData.marks"
                 (onMarkingsChange)="updateMarkings($event)"
                 [programData]="programData"
                 [races]="productsForRaceDay.races"
                 [selectedRaceNumber]="selectedRaceNumber"
                 (onSelectRace)="selectRace($event)"
                 ng-class="{'is-closed-for-bet': !ctrl.multiLegProduct.isOpenForBet || !ctrl.bettingSystemIsOpenForBet }"></program-small>`,
    selector: 'program'
})
export default class ProgramComponent implements OnChanges, OnInit {
    @Input() public programData: Program;
    @Input() public selectedRaceNumber: number;
    @Input() public races: ActiveRace[];
    @Input() marks: { [leg: number]: number[] } = {};
    @Output() public onSelectRace = new EventEmitter<number>();
    @Output() onMarkingsChange = new EventEmitter<{ [leg: number]: number[] }>();

    sort: {
        predicateName: string;
        reverse: boolean;
    } = { predicateName: "", reverse: false };

    sortedStarts: Start[];
    
    ngOnInit() {
        this.selectedRaceNumber = this.programData.races[0].raceNumber;
        if (!this.marks[this.selectedRace.legNumber]) this.marks[this.selectedRace.legNumber] = [];

        this.setSort('startNumber');
    }

    ngOnChanges() {
        this.setSort();
    }

    public startTimeForRace(raceNumber: number): string {
        return _.find(this.races, race => race.raceNumber === raceNumber).displayStartTime;
    }

    get selectedRace(): Race {
        return this.programData.getRace(this.selectedRaceNumber);
    }

    public selectRace(race: Race) {
        this.selectedRaceNumber = race.raceNumber;
        if (!this.marks[this.selectedRace.legNumber]) this.marks[this.selectedRace.legNumber] = [];
        if (this.onSelectRace)
            this.onSelectRace.emit(race.raceNumber);
    };

    predicate(start: Start): any {
        if (this.sort.predicateName === 'winOdds') {
            var odds = start.winOdds;

            return (!odds || start.scratched) ? (1000000 + start.startNumber) * (this.sort.reverse ? -1 : 1) : odds;

        } else if (this.sort.predicateName === 'investmentPercentage') {
            var val = start.investmentPercentage;
            if (!val) {
                return (1000000 + start.startNumber) * (this.sort.reverse ? -1 : 1);
            }
            return val;
        }

        return _.get(start, this.sort.predicateName);
    }

    public setSort(predicateName?: string) {
        if (predicateName) {
            if (predicateName === this.sort.predicateName) {
                this.sort.reverse = !this.sort.reverse;
            } else {
                this.sort.predicateName = predicateName;
                this.sort.reverse = (predicateName === 'winPercentage' ||
                    predicateName === 'triplePercentage' ||
                    predicateName === 'investmentPercentage' ||
                    predicateName === 'totalEarnings');
            }
        }
        this.sortedStarts = _.orderBy(this.selectedRace.starts, (start) => this.predicate(start), this.sort.reverse ? ['desc'] : ['asc']);
    }

    public select(start: Start) {
        let legNumber = this.selectedRace.legNumber;
        if (!this.marks[legNumber]) this.marks[legNumber] = [];
        if (this.marks[legNumber].indexOf(start.startNumber) > -1) {
            this.marks[legNumber] = _.without(this.marks[legNumber], start.startNumber);
        } else {
            this.marks[legNumber] = _.union(this.marks[legNumber], [start.startNumber]);
        }
        this.onMarkingsChange.emit(this.marks);
    }

    public onSwipe(ev) {
        let currentIndex = this.programData.races.indexOf(this.selectedRace);

        let newIndex: number;

        switch (ev.type) {
            case 'swipeleft':
                newIndex = (currentIndex + 1) % this.programData.races.length;
                break;
            case 'swiperight':
                newIndex = currentIndex - 1;

                if (newIndex < 0) {
                    newIndex = this.programData.races.length - 1;
                }
                break;
            default:
                return;
        }

        this.selectRace(this.programData.races[newIndex]);
    }
}