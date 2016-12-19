import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IActiveRace } from '../../../Models/IActiveRace';
import { IMultiLegProductForRaceDay } from '../../../Models/IMultiLegProductForTimeline';
import * as _ from 'lodash';

@Component({
    selector: 'leg-menu',
    templateUrl: 'LegMenuComponent.tpl.html'
})
export default class LegMenuComponent implements OnInit {
    @Input()
    races: IActiveRace[];

    @Input()
    multiLegProduct: IMultiLegProductForRaceDay;

    @Input()
    selectedRaceNumber: number;

    @Output()
    onSelectRace = new EventEmitter<number>();
    
    viewModel: { items: any[] } = { items: [] };

    constructor() {

    }

    ngOnInit(): void {
        this.viewModel.items = _.map(this.races, (race) => this.createViewModelItem(race));
    }

    createViewModelItem(race: IActiveRace) {
        return {
            race: race,
            number: race.raceNumber,
            legAvailable: this.legAvailable(race),
            legNumber: this.multiLegProduct.races.indexOf(race.raceNumber) + 1,
            isSelected: race.raceNumber === this.selectedRaceNumber
        }
    }

    legAvailable(race: IActiveRace) {
        return this.multiLegProduct.races.indexOf(race.raceNumber) > -1;
    }

    validateAndSelectRace(race: IActiveRace) {
        if (this.legAvailable(race)) {
            this.onSelectRace.emit(race.raceNumber);
        }
    }
}