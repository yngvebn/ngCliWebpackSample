import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as MultiLegProductForTimeline from '../../../Models/IMultiLegProductForTimeline';
import Race from '../../../Models/Race';

import * as _ from 'lodash';
import Start from '../Program/Models/Start';

@Component({
    selector: 'ticket',
    templateUrl: 'TicketComponent.tpl.html'
})
export class TicketComponent implements OnInit {
    @Input() races: Race[];

    @Input() selectedRaceNumber: number;

    @Input() multiLegProduct: MultiLegProductForTimeline.IMultiLegProductForRaceDay;

    @Output() onSelectRace = new EventEmitter<number>();

    @Output() onMarkingsChange = new EventEmitter<{ [leg: number]: number[] }>();

    @Input()
    marks: { [leg: number]: number[] } = {};

    legs: any[];

    ngOnInit(): void {
        this.legs = _.map(this.races, (race) => this.createViewModelItem(race)).filter(leg => leg.legAvailable);
        this.legs.forEach(leg => {
            if (!this.marks[leg.legNumber]) this.marks[leg.legNumber] = [];
        });
    }

    isAllSelected(race: Race) {
        return _.every(race.starts, start => {
            return start.scratched || this.marks[race.legNumber].indexOf(start.startNumber) > -1;
        });
    }

    selectAll(race: Race) {
        var shouldSelect = !this.isAllSelected(race);
        if (!shouldSelect) {
            this.marks[race.legNumber] = [];
        } else {
            this.marks[race.legNumber] = _.filter(race.starts, start => !start.scratched).map(start => start.startNumber);
        }
        this.onMarkingsChange.emit(this.marks);
    }
    
    selectLeg(leg: Race) {
        this.onSelectRace.emit(leg.raceNumber);
    }

    select(item: { start: Start, legNumber: number }) {
        if (!this.marks[item.legNumber]) this.marks[item.legNumber] = [];
        if (this.marks[item.legNumber].indexOf(item.start.startNumber) > -1) {
            this.marks[item.legNumber] = _.without(this.marks[item.legNumber], item.start.startNumber);
        } else {
            this.marks[item.legNumber] = _.union(this.marks[item.legNumber], [item.start.startNumber]);
        }
        this.onMarkingsChange.emit(this.marks);
    }

    createViewModelItem(race: Race) {
        return {
            race: race,
            number: race.raceNumber,
            legAvailable: this.legAvailable(race),
            legNumber: this.multiLegProduct.races.indexOf(race.raceNumber) + 1,
            isSelected: race.raceNumber === this.selectedRaceNumber
        }
    }

    legAvailable(race: Race) {
        return this.multiLegProduct.races.indexOf(race.raceNumber) > -1;
    }

    validateAndSelectRace(race: Race) {
        if (this.legAvailable(race)) {
            this.onSelectRace.emit(race.raceNumber);
        }
    }

}