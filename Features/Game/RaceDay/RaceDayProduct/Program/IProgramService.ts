import BetTypeCode from '../../../../Common/Enums/BetTypeCode';
import Program from '../../../Models/Program';
import * as Program1 from './Models/IProgram';
import * as ProgramAddition from './Models/IProgramAddition';

export interface IProgramService {
    getProgram(raceDayKey: string, product: BetTypeCode): Promise<Program>;
    getProgramForGame(raceDayKey: string, product: BetTypeCode): Promise<Program1.IProgram>;
    getProgramAdditionForGame(raceDayKey: string, product: BetTypeCode): Promise<ProgramAddition.IProgramAddition>;
    getScratchedStartsForGame(raceDayKey: string, product: BetTypeCode): Promise<IScratchedStart[]>;
}