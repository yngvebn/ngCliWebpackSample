export default class FractionValue {
    public static full = 100;
    public static half = 50;
    public static quarter = 25;


    private static Codes = {
        full: 100,
        half: 50,
        quarter: 25
    }

    public static Normalized = {
        full: '20kr',
        half: '50%',
        quarter: '25%'
    }

    public static Code(btc: string | number | FractionValue): number {
        if (typeof btc === "number") {
            return this.Codes[this.Name(btc)];
        } else {
            return this.Codes[btc.toString()];
        }
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
}