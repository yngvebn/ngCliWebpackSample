import { Input, Directive, forwardRef, OnChanges, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validators, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[maxprice]',
    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxPriceDirective), multi: true }]
})
export class MaxPriceDirective implements Validator, OnInit, OnChanges {
    @Input() maxprice: number;
    private valFn: ValidatorFn;

    ngOnInit() {
        this.valFn = this.performValidation(this.maxprice);
    }

    validate(c: AbstractControl): { [index: string]: any; } {
        return this.valFn(c);
    }

    ngOnChanges(changes: Object): void {
        const change = changes['maxprice'];
        if (change)
            this.valFn = this.performValidation(change.currentValue);
    }

    performValidation(maxPrice: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let value = control.value ? control.value : 0;
            return parseFloat(value) <= maxPrice ? null : { 'max-price': 'true' };
        }
    }
}