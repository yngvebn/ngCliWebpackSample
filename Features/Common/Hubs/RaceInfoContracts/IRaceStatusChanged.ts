import BetTypeCode from '../../Enums/BetTypeCode';

export interface IRaceStatusChanged {
    raceDay: string;
    raceNumber: number;
    affectedMultiLegGames: BetTypeCode[];
}