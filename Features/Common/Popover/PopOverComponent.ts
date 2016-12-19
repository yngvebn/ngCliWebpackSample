import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
@Component({
    selector: 'pop-over',
    styles: [
        `.pop-over {
            position: absolute;
            
        }`
    ],
    template: `<div class="pop-over" #popOverHolder>
        <div #popOverContent class="pop-over-content" [ngClass]="contentClass"
             [class.shown]="visible$ | async">
            <ng-content *ngIf="visible$ | async"></ng-content>
        </div>
    </div>`
})
export class PopOverComponent implements OnInit, OnDestroy, AfterViewInit {
    private showOnSubscription: Subscription;
    private hideOnSubscription: Subscription;
    private originalParent: Node;
    private clickSubscription: Subscription;
    @Input('show-on') showOn: string;
    private set showOnFn(value: Observable<MouseEvent>) {
        this.showOnSubscription && this.showOnSubscription.unsubscribe();
        value && (this.showOnSubscription = value.subscribe(this.show.bind(this)));
    };
    @Input('hide-on') hideOn: string;
    private set hideOnFn(value: Observable<MouseEvent>) {
        this.hideOnSubscription && this.hideOnSubscription.unsubscribe();
        value && (this.hideOnSubscription = value.subscribe(this.hide.bind(this)));
    };
    @Input('keep-on-click-outside') keepOnClickOutside: boolean;
    @Input('anchor-to') anchorTo: boolean | Node = false;
    @Input() my: string;
    @Input() at: string;
    @Input('x-offset') xOffset: number = 0;
    @Input('y-offset') yOffset: number = 0;
    @Input('content-class') contentClass: string;
    @ViewChild('popOverHolder') holder: any;
    @ViewChild('popOverContent') content: any;
    visible$: Subject<boolean> = new BehaviorSubject<boolean>(false);
    visible: boolean;

    constructor(private elRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        this.setHideOn();
        this.setShowOn();
    }

    private setHideOn(): void {

        if (this.hideOn) {
            this.hideOnFn = Observable.merge(
                ...this.hideOn.split(',')
                    .map(eventType => eventType.trim())
                    .map((eventType: string): Observable<MouseEvent> => Observable.fromEvent<MouseEvent>(this.elRef.nativeElement.parentNode, eventType)));
        } else {
            this.hideOnFn = Observable.empty<MouseEvent>();
        }

    }

    private setShowOn(): void {
        if (this.showOn) {
            this.showOnFn = Observable.merge(
                ...this.showOn.split(',')
                    .map(eventType => eventType.trim())
                    .map((eventType: string): Observable<MouseEvent> => Observable.fromEvent<MouseEvent>(this.elRef.nativeElement.parentNode, eventType)));
        } else {
            this.showOnFn = Observable.empty<MouseEvent>();
        }
    }

    ngOnDestroy() {
        this.hideOnSubscription && this.hideOnSubscription.unsubscribe();
        this.showOnSubscription && this.showOnSubscription.unsubscribe();
    }

    ngAfterViewInit(): any {
        this.renderer.setElementClass(this.holder.nativeElement, 'show', false);
        this.renderer.setElementClass(this.content.nativeElement, 'show', false);
        return undefined;
    }

    private isPosition(parts: Array<string>, type: string): boolean {
        return parts.indexOf(type) >= 0;
    }

    private computeAtPosition(target: any, contentEl: any, position: string, xOffset: number = 0, yOffset: number = 0): [number, number] {
        let x: number;
        let y: number;

        let positionParts = (position || '').split(/\s+/);
        if (positionParts.length > 2) {
            console.warn('bad position: ', position);
        }

        let targetPosition = target.getBoundingClientRect();
        let contentPosition = contentEl.getBoundingClientRect();
        if (this.isPosition(positionParts, 'left')) {
            x = targetPosition.left - xOffset;
        } else if (this.isPosition(positionParts, 'right')) {
            x = targetPosition.right + xOffset;
        } else {
            x = (targetPosition.left + targetPosition.right) / 2;
        }

        if (this.isPosition(positionParts, 'top')) {
            y = targetPosition.top + targetPosition.height + contentPosition.height;

        } else if (this.isPosition(positionParts, 'bottom')) {
            y = targetPosition.bottom + yOffset;
        } else {
            y = (targetPosition.top + targetPosition.bottom) / 2;
        }

        return [x, y];
    }

    private computePosition(anchorEl: any, contentEl: any, event: MouseEvent): [number, number] {
        let baseX: number;
        let baseY: number;
        let boundryMargin: number = 5;
        let bodyPosition = anchorEl.ownerDocument.body.getClientRects()[0];

        [baseX, baseY] = this.computeAtPosition(anchorEl, contentEl, this.at);

        let [offsetX, offsetY] = this.computeAtPosition(anchorEl, contentEl,
            (this.my) || '', this.xOffset, this.yOffset);
        let elPosition = anchorEl.getBoundingClientRect();
        let pagePosition = anchorEl.ownerDocument.body.getBoundingClientRect();
        let documentElement = anchorEl.ownerDocument.documentElement;
        offsetX = offsetX - elPosition.left + pagePosition.left;
        offsetY = offsetY - elPosition.top + pagePosition.top;
        return [
            Math.max(boundryMargin - bodyPosition.left, Math.min(
                baseX - offsetX,
                documentElement.clientWidth - bodyPosition.left - elPosition.width - boundryMargin)),
            Math.max(boundryMargin - bodyPosition.top, Math.min(
                baseY - offsetY,
                documentElement.clientHeight - bodyPosition.top - elPosition.height - boundryMargin))
        ];
    }

    hide() {
        if (!this.visible)
            return;
        
        this.renderer.setElementClass(this.holder.nativeElement, 'show', false);
        this.renderer.setElementClass(this.content.nativeElement, 'show', false);
        this.visible$.next(false);
        this.originalParent && this.originalParent.appendChild(this.holder.nativeElement);
        this.visible = false;
    }

    show(event: MouseEvent) {
        event.stopPropagation();
        if (this.visible)
            return;
        
        this.clickSubscription && this.clickSubscription.unsubscribe();
        this.visible$.next(true);
        let el = this.elRef.nativeElement;
        let holderEl = this.holder.nativeElement;
        let contentEl = this.content.nativeElement;
        
        this.originalParent = el.parentNode;
        
        var [x, y] = this.computePosition(this.originalParent, holderEl, event);
        
        this.visible = true;

        setTimeout(() => {
            el.ownerDocument.body.appendChild(holderEl);
            let holderBounds = this.holder.nativeElement.getBoundingClientRect();
            let parentBounds = el.parentNode.getBoundingClientRect();
            this.renderer.setElementStyle(holderEl, 'top', (y - 5) + 'px');
            this.renderer.setElementStyle(holderEl, 'left', (x - (holderBounds.width / 2) + (parentBounds.width / 2)) + 'px');
            this.renderer.setElementClass(holderEl, 'show', true);
            this.renderer.setElementClass(contentEl, 'show-add', true);
        });

        setTimeout(() => {
            this.renderer.setElementClass(contentEl, 'show', true);
        },300);
    }

    toggle(event: MouseEvent) {
        this.visible$
            .take(1)
            .subscribe((visible: boolean) => (visible ? this.hide() : this.show(event)));
    }
}
