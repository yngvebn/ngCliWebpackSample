import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Start from '../../Program/Models/Start';
import StartButton from './StartButton';
import * as _ from 'lodash';

@Component({
    selector: 'leg-marks-row',
    templateUrl: 'LegMarksRowComponent.tpl.html'
})
export default class LegMarksRowComponent implements OnInit {
    ngOnInit(): void {
        this.markingButtons = [];

        for (var i = 0; i < this.maxNumberOfStarts; i++) {
            this.markingButtons.push(new StartButton(i + 1));
        }
        for (var j = 0; j < this.maxNumberOfStarts; j++) {
            var start = this.starts[j];
            if (start) {
                this.markingButtons[j].init(start, this.legNumber, this.canSelectNoStart, this.canSelectScratched, this.canDisable);
            }
        }

        if(!this.marks) this.marks = [];
    }

    @Input()
    starts: Start[];

    @Input()
    maxNumberOfStarts: number;

    @Input()
    legNumber: number;

    @Input()
    canSelectNoStart: boolean = true;

    @Input()
    canSelectScratched: boolean = true;

    @Input()
    canDisable: boolean = false;

    @Output()
    onSelect = new EventEmitter<{ isSelected: boolean, legNumber: number, start: Start | { startNumber: number, scratched: boolean } }>();

    @Input()
    marks: number[] = [];

    markingButtons: StartButton[] = [];
    canStartsBeDisabled = false;
    buttonStates = [];


    isDisabled(btn) {
        if (!this.canStartsBeDisabled) return false;
        return btn.isDisabled();
    }

    toggle(button: StartButton) {
        button.toggle();
        this.onSelect.emit({ isSelected: button.selected, legNumber: this.legNumber, start: button.start });
    }

}