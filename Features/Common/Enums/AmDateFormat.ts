import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: "amDateFormat" })
export class AmDateFormat implements PipeTransform {
    transform(value, format): string {
        return moment(value).format(format);
    }
}