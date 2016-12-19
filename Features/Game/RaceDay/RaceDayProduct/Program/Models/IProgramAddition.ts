import BetTypeCode from '../../../../../Common/Enums/BetTypeCode';
import * as RaceUpdate from './IRaceUpdate';

export interface IProgramAddition {
    raceDay: string;
    product: BetTypeCode;
    raceUpdates: RaceUpdate.IRaceUpdate[];
    raceBetStatistics: IRaceBetStatistics[];
}