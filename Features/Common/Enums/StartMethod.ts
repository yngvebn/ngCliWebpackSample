import { Pipe, PipeTransform } from '@angular/core';

export default class StartMethod {
    static Unknown = 'Ukjent';
    static Auto = 'Autostart';
    static Volt = 'Voltestart';
    static Line = 'Linjestart';
}

@Pipe({ name: "presentStartMethodAsText" })
export class PresentStartMethodAsText implements PipeTransform {
    transform(value): string {
            if (value === "Unknown") {
                return "";
            }

        return StartMethod[value];
    }
}