import {Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'form-rows-small',
        templateUrl: 'FormRowsComponentSmall.tpl.html'
    })
export default class FormRowsSmallComponent {
    @Input() public formRows: ITrotFormRow[];
}