import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import ProgramComponent from './ProgramComponent';
import Program from '../../../Models/Program';
import ActiveRace from '../../../Models/ActiveRace';

@Component({
    templateUrl: 'ProgramComponentLarge.tpl.html',
    selector: 'program-large'
})
export default class ProgramComponentLarge extends ProgramComponent implements OnInit{
    @Input() public programData: Program;

    @Input() public selectedRaceNumber: number;

    @Output() public onSelectRace = new EventEmitter<number>();

    @Output() onMarkingsChange = new EventEmitter<{ [leg: number]: number[] }>();

    @Input() public races: ActiveRace[];

    @Input() marks: { [leg: number]: number[] } = {};

    ngOnInit(): void {
        this.races.forEach((race, idx) => {
            if (!this.marks[idx + 1]) this.marks[idx + 1] = [];
        });
        this.setSort('startNumber');
    }
}