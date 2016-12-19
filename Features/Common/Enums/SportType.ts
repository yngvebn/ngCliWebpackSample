import { Pipe, PipeTransform } from '@angular/core';

export default class SportType {
    public static T = "Trav";
    public static G = "Galopp";
    public static M = "Monté";
}

@Pipe({ name: "presentSportTypeAsText" })
export class PresentSportTypeAsText implements PipeTransform {
    transform(value): string {
        return SportType[value];
    }
}
