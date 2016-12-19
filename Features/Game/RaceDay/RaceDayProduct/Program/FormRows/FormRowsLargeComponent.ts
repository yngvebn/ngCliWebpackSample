import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'form-rows-large',
    templateUrl: 'FormRowsComponentLarge.tpl.html'
})
export default class FormRowsLargeComponent implements OnInit {
    @Input()
    public formRows: ITrotFormRow[];

    ngOnInit(): void {
    }
}