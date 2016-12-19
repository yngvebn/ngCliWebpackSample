import { Directive, Input, EventEmitter} from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import * as Index from '../index';
import * as Enums from '../Enums';
import * as BreakpointBase from './BreakpointDirective';



@Directive({ selector: '[small]' })
export class SmallDirective extends BreakpointBase.BreakpointDirective {
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
        super(new BreakpointBase.BreakpointThreshold(false, true, Enums.BreakPoints.Small, null), templateRef, viewContainer);
    }
}

@Directive({ selector: '[medium]' })
export class MediumDirective extends BreakpointBase.BreakpointDirective {
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
        super(new BreakpointBase.BreakpointThreshold(true, true, null, Enums.BreakPoints.Small), templateRef, viewContainer);
    }
}

@Directive({ selector: '[mediumDown]' })
export class MediumDownDirective extends BreakpointBase.BreakpointDirective {
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
        super(new BreakpointBase.BreakpointThreshold(false, true, Enums.BreakPoints.Medium, null), templateRef, viewContainer);
    }
}

@Directive({ selector: '[large]' })
export class LargeDirective extends BreakpointBase.BreakpointDirective {
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
        super(new BreakpointBase.BreakpointThreshold(true, false, null, Enums.BreakPoints.Medium), templateRef, viewContainer);
    }
}


@Directive({ selector: '[largeDown]' })
export class LargeDownDirective extends BreakpointBase.BreakpointDirective {
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
        super(new BreakpointBase.BreakpointThreshold(true, false, Enums.BreakPoints.Large, null), templateRef, viewContainer);
    }
}

@Directive({ selector: '[mediumOnly]' })
export class MediumOnlyDirective extends BreakpointBase.BreakpointDirective {
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef) {
        super(new BreakpointBase.BreakpointThreshold(true, true, Enums.BreakPoints.Medium, Enums.BreakPoints.Small), templateRef, viewContainer);
    }
}

const ALL: any[] = [MediumDirective, MediumOnlyDirective, MediumDownDirective, LargeDirective, LargeDownDirective, SmallDirective];
export { ALL}