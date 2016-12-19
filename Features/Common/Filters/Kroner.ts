import { CurrencyPipe, DecimalPipe } from '@angular/common'; 
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "kroner" })
export default class KronerPipe implements PipeTransform {
    constructor(private currencyPipe: CurrencyPipe, private decimalPipe: DecimalPipe){}
    transform(value: number, hideKronerPrefix: boolean, withDecimals: boolean | number, trailingDashIfNoOere: boolean): string {
        if (!value && value !== 0) return '-';

        let hasOere = value % 100 !== 0;

        let krAmount = Number((value / 100).toFixed(2));

        let numberOfDecimals: number;

        if (hasOere)
            numberOfDecimals = 2;
        else if (withDecimals && !trailingDashIfNoOere)
            numberOfDecimals = 2;
        else
            numberOfDecimals = 0;
        return (hideKronerPrefix ? "" : "kr ") + this.format(krAmount, numberOfDecimals) + (trailingDashIfNoOere && numberOfDecimals === 0 ? ',-' : '');
    }

    format(number: number, numberOfDecimals) {
        let thousandSeparator = ' ';
        let decimalSeparator = ',';
        var re = '\\d(?=(\\d{' + (3) + '})+' + (numberOfDecimals > 0 ? '\\D' : '$') + ')',
            num = number.toFixed(Math.max(0, ~~numberOfDecimals));

        return num.replace('.', decimalSeparator).replace(new RegExp(re, 'g'), '$&' + thousandSeparator);
    };
}