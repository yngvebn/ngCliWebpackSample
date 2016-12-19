import {Component, Input, OnInit } from '@angular/core';
import ActiveRace from '../../../Game/Models/ActiveRace';

@Component({
    templateUrl: 'RaceStart.tpl.html',
    selector: 'race-start'
})
export default class RaceStartComponent {

    @Input() public race: ActiveRace;

    @Input() public minutesToShowCountdown: number;
    
    public get minutes(): string {
        if (!this.race) {
            return '';
        }

        return this.addLeadingZero(Math.floor((this.race.secondsToStart / 60) % 60));
    }

    public get seconds(): string {
        if (!this.race) {
            return '';
        }

        return this.addLeadingZero(Math.floor(this.race.secondsToStart % 60));
    }

    public get showCountdown(): boolean {
        if (!this.race || !this.minutesToShowCountdown) {
            return false;
        }

        return this.race.secondsToStart <= this.minutesToShowCountdown * 60;
    }

    private addLeadingZero = (number: number) : string => {
        let prefix = number > 9 ? '' : '0';
        return prefix + number;
    }
}
