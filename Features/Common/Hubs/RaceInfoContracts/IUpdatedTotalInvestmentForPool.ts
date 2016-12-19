import BetTypeCode from '../../Enums/BetTypeCode';

export interface IUpdatedTotalInvestmentForPool {
    raceDay: string;
    raceNumber?: number;
    product: BetTypeCode;
    totalInvestment: number;
}