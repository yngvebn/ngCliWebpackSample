import { Pipe, PipeTransform } from '@angular/core';

export default class BetTypeCode {
    public static VP = 'VP';
    public static V = 'V';
    public static P = 'P';
    public static DUO = 'DUO';
    public static T = 'T';
    public static DD = 'DD';
    public static V4 = 'V4';
    public static V5A = 'V5A';
    public static V5B = 'V5B';
    public static V64 = 'V64';
    public static V65 = 'V65';
    public static V75 = 'V75';
    public static V76 = 'V76';
    public static TV = 'TV';
    public static QPlus = 'QPlus';

    private static Codes = {
        VP: 1,
        V: 2,
        P: 3,
        DUO: 4,
        T: 5,
        DD: 6,
        V4: 7,
        V5A: 8,
        V5B: 9,
        V64: 10,
        V65: 11,
        V75: 12,
        V76: 13,
        TV: 14,
        QPlus: 15,
        '5+': 15
    }

    public static Normalized = {
        Undefined: "",
        VP: "VinnerPlass",
        V: "Vinner",
        P: "Plass",
        DUO: "Duo",
        T: "Trippel",
        DD: "DagensDobbel",
        V5A: "V5",
        V5B: "V5",
        TV: "Tvilling"
    }

    public static Code(btc: string | BetTypeCode): number {
        return this.Codes[btc.toString()];
    }

    public static Name(code: number): string {
        let name = '';

        for (let prop in this.Codes) {
            if (this.Codes[prop] === code) {
                name = prop;
            }
        }

        return name;
    }

    public static getNumberOfSelectionfields(bm: BetTypeCode): number {

        switch (bm) {
            case BetTypeCode.VP:
            case BetTypeCode.V:
            case BetTypeCode.P:
                return 1;
            case BetTypeCode.DUO:
            case BetTypeCode.DD:
            case BetTypeCode.TV:
                return 2;
            case BetTypeCode.T:
                return 3;
            case BetTypeCode.V4:
                return 4;
            case BetTypeCode.V5A:
            case BetTypeCode.V5B:
                return 5;
            case BetTypeCode.QPlus:
                return 6;
            case BetTypeCode.V64:
            case BetTypeCode.V65:
                return 6;
            case BetTypeCode.V75:
            case BetTypeCode.V76:
                return 7;
            default:
                return 0;
        }
    }
}

@Pipe({ name: "presentProductAsShortText" })
export class PresentProductAsShortText implements PipeTransform {
    transform(value): string {
        switch (value) {
            case BetTypeCode.VP: return 'V / P';
            case BetTypeCode.V: return 'V';
            case BetTypeCode.P: return 'P';
            case BetTypeCode.DUO: return 'DUO';
            case BetTypeCode.T: return 'T';
            case BetTypeCode.DD: return 'DD';
            case BetTypeCode.V4: return 'V4';
            case BetTypeCode.V5A: return 'V5A';
            case BetTypeCode.V5B: return 'V5B';
            case BetTypeCode.V64: return 'V64';
            case BetTypeCode.V65: return 'V65';
            case BetTypeCode.V75: return 'V75';
            case BetTypeCode.V76: return 'V76';
            case BetTypeCode.TV: return 'TV';
            case BetTypeCode.QPlus: return '5+';
            default: return BetTypeCode[value];
        }
    }
}

@Pipe({ name: "presentProductAsText" })
export class PresentProductAsText implements PipeTransform {
    transform(value): string {
        switch (value) {
            case BetTypeCode.VP: return 'Vinner / Plass';
            case BetTypeCode.V: return 'Vinner';
            case BetTypeCode.P: return 'Plass';
            case BetTypeCode.DUO: return 'DUO';
            case BetTypeCode.T: return 'Trippel';
            case BetTypeCode.DD: return 'Dagens Dobbel';
            case BetTypeCode.V4: return 'V4';
            case BetTypeCode.V5A: return 'V5A';
            case BetTypeCode.V5B: return 'V5B';
            case BetTypeCode.V64: return 'V64';
            case BetTypeCode.V65: return 'V65';
            case BetTypeCode.V75: return 'V75';
            case BetTypeCode.V76: return 'V76';
            case BetTypeCode.TV: return 'Tvilling';
            case BetTypeCode.QPlus: return '5+';
            default: return BetTypeCode[value];
        }

    }
}
