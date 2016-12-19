import BetTypeCode from '../../Common/Enums/BetTypeCode';

export interface IProductForRaceDay {
    product: BetTypeCode;
    raceNumber?: number;
    isOpenForBet: boolean;
    isAbandoned: boolean;
    totalInvestment?: number;
    hasJackpot: boolean;
    hasBonus: boolean;
}