import BetTypeCode from '../../../../../Common/Enums/BetTypeCode';
import * as RaceProgram from './IRaceProgram';

export interface IProgram {
    raceDay: string;
    product: BetTypeCode;
    races: RaceProgram.IRaceProgram[];
    numberOfStartsPerRace: number;
}