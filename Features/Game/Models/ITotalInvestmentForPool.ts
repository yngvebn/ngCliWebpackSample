import BetTypeCode from '../../Common/Enums/BetTypeCode';

export interface ITotalInvestmentForPool {
    raceDay: string;
    product: BetTypeCode;
    raceNumber?: number;
    totalInvestment: number;
}