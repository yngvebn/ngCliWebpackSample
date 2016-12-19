export default class BetMethod {
    static vanlig = 'Vanlig';
    static lynBanker = 'LynBanker';
    static lynToto = 'LynToto';
    static lynSystem = 'LynSystem';
    static system = 'System';
    static lynBundle = 'Lynbundle';
    static lynShare = 'LynShare';
    static eksperten = 'Eksperten';
    static multiDay = 'MultiDay';
    static paalag = 'PaaLag';

    private static Codes = {
        Vanlig: 0,
        LynBanker: 1,
        LynToto: 2,
        LynSystem: 3,
        System: 4,
        LynBundle: 5,
        LynShare: 6,
        Eksperten: 7,
        MultiDay: 8,
        PaaLag: 9
    }

    static Code(bm: string | BetMethod | number): number {
        if (typeof bm === "number") bm = this.Name(bm);
        return this.Codes[bm.toString()];
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