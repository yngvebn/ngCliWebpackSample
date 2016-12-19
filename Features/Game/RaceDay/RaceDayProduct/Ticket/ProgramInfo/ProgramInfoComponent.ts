import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import Start from '../../Program/Models/Start';
import * as _ from 'lodash';
import Race from '../../../../Models/Race';

@Component({
    selector: 'program-info',
    templateUrl: 'ProgramInfoComponent.tpl.html'
})
export default class ProgramInfoComponent implements OnInit, OnChanges {
    ngOnInit(): void {
        if (!this.marks[this.selectedRace.legNumber]) this.marks[this.selectedRace.legNumber] = [];
        this.setPredicate('startNumber');
    }

    ngOnChanges() {
        this.setPredicate();
    }

    @Input()
    selectedRace: Race;

    @Input()
    marks: { [leg: number]: number[] } = {};

    @Output() onMarkingsChange = new EventEmitter<{ [leg: number]: number[] }>();

    sortedStarts: Start[];

    sort: {
        predicateName: string;
        reverse: boolean;
    } = { predicateName: "", reverse: false };

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

    isToggled(leg) {
        return false;
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

    setPredicate(predicateName?: string) {
        if (predicateName) {
            if (predicateName === this.sort.predicateName) {
                this.sort.reverse = !this.sort.reverse;
            } else {
                this.sort.predicateName = predicateName;
                this.sort.reverse = false;
            }
        }
        this.sortedStarts = _.orderBy(this.selectedRace.starts, (start) => this.predicate(start), this.sort.reverse ? ['desc'] : ['asc']);
    }
}