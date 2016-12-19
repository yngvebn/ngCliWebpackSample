import BetTypeCode from '../../../Common/Enums/BetTypeCode';

export interface IRaceDayProductStateParams {
    product: BetTypeCode;
    raceDayKey: string;
    betData: string;
}