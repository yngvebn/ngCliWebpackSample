import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'markings-button',
    templateUrl: 'MarkingsButtonComponent.tpl.html'
})
export default class MarkingsButtonComponent implements OnInit {
    @Input()
    text: string;

    @Output()
    onSelect = new EventEmitter<boolean>();

    @Input()
    isSelected: boolean;

    ngOnInit(): void {
    }
    mode: string;
    fixedClasses = [];

    markingButtonModes = {
        dynamic: 'dynamic',
        fixed: 'fixed'
    }

    getSelectableStatus() {
        return true;
    }

    toggle() {
        this.isSelected = !this.isSelected;
        this.onSelect.emit(this.isSelected);
    }
}