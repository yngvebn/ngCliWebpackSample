import { Injectable } from '@angular/core';
import { BreakPoints } from '../Enums/BreakPoints';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UiService {
    private _tracksToggled: boolean;
    public hasRaceDay: boolean;
    public hasProduct: boolean;
    public isMobile: boolean;
    public  stateName: string;
    private setUpWindowSizeObservable() {
        this.isMobile = this.getCurrentBreakpoint() <= BreakPoints.Medium;
        Observable.fromEvent(window, 'resize')
            .debounceTime(10)
            .subscribe(() => {
                this.isMobile = this.getCurrentBreakpoint() <= BreakPoints.Medium;
            });
    }

    public setStateName(state: string) {
        this.stateName = state;
    }

    public get tracksToggled(): boolean {
        if (!this.displayTrackList) {
            return false;
        }
        return this._tracksToggled;
    }

    public hideTracks() {
        this._tracksToggled = false;
    }

    public showTracks() {
        this._tracksToggled = true;
    }

    constructor() {
        this.setUpWindowSizeObservable();
        this._tracksToggled = this.displayTrackList;
    }

    public get displayTrackList(): boolean {
        // if track-list has been toggled, it should be shown
        // if we're on product-timeline or product it should not be shown
        if (this.stateName === 'product-timeline' && this.getCurrentBreakpoint() === BreakPoints.Small) return false;
        if (this.stateName === 'product') return false;

        return true;
    }

    public toggleTracks() {
        this._tracksToggled = !this._tracksToggled;
    }

    public isLargerThan(breakpoint: string) {
        return (this.getCurrentBreakpoint() > BreakPoints[breakpoint]);
    }

    getCurrentBreakpoint(): BreakPoints {
        var width = window.innerWidth;

        if (width < BreakPoints.Small) {
            return BreakPoints.Small;
        } else if (width < BreakPoints.Medium) {
            return BreakPoints.Medium;
        } else if (width < BreakPoints.Large) {
            return BreakPoints.Large;
        } else {
            return BreakPoints.Max;
        }
    }



    setRaceDayParams(raceDayKey: string, product: string) {
        this.hasProduct = !(!product);
        this.hasRaceDay = !(!raceDayKey);
    }
}