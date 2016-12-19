interface IPriceInfoForProduct {
    betMethod: string;
    betType: string;
    defaultRowPrice: number;
    defaultSuperRowPrice: number;
    feeInfo: IFeeInfo;
    isFixed: boolean;
    maxPrice: number;
    minPrice: number;
    multiDayPrices: any;
    predefinedPrices: number[];
    predefinedSuperPrices: number[];
    regularPriceStep: number;
    superMinPrice: number;
    superPriceStep: number;
}