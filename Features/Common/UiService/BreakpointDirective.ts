import { Input, EventEmitter } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Enums from '../Enums';

export class BreakpointThreshold {
    lowerLimit?: Enums.BreakPoints;
    upperLimit?: Enums.BreakPoints;
    lowerInclude: boolean;
    upperInclude: boolean;

    constructor(upperInclude: boolean, lowerInclude: boolean, upperLimit?: Enums.BreakPoints, lowerLimit?: Enums.BreakPoints, ) {
        this.lowerInclude = lowerInclude;
        this.upperInclude = upperInclude;
        this.upperLimit = upperLimit || 100000;
        this.lowerLimit = lowerLimit || 0;
    }

    isWithinBounds(width: number): boolean {
        let isLargerThanLower: boolean = this.lowerInclude ? width >= this.lowerLimit : width > this.lowerLimit;
        let isSmallerThanUpper: boolean = this.upperInclude ? width <= this.upperLimit : width < this.upperLimit;
        return isLargerThanLower && isSmallerThanUpper;
    }
}

export class BreakpointDirective {
    onBreakpointThreshold = new EventEmitter<boolean>();
    isToggled?: boolean;
    constructor(private breakpointThreshold: BreakpointThreshold, public templateRef: TemplateRef<any>, public viewContainer: ViewContainerRef) {
        this.setUpWindowSizeObservable();
    }

    private setUpWindowSizeObservable() {
        var width = window.innerWidth;
        let isWithinBounds = this.breakpointThreshold.isWithinBounds(width);
        this.onBreakpointThreshold.emit(isWithinBounds);
        this.toggleElement(isWithinBounds);

        Observable.fromEvent(window, 'resize')
            .debounceTime(10)
            .subscribe(() => {
                var width = window.innerWidth;
                let isWithinBounds = this.breakpointThreshold.isWithinBounds(width);
                this.onBreakpointThreshold.emit(isWithinBounds);
                this.toggleElement(isWithinBounds);
            });
    }


    toggleElement(toggle) {
        if (toggle && !this.isToggled) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (!toggle && this.isToggled) {
            this.viewContainer.clear();
        }
        this.isToggled = toggle;
    }
}