import ProgressStatus from '../../Common/Enums/ProgressStatus';
import { IProductForTimeline } from './IProductForTimeline';

export interface IMultiLegProductForRaceDay extends IProductForTimeline {
    races: number[];
    hasJackpot: boolean;
    hasBonus: boolean;
    isOpenForBet: boolean;
    sortIndex: number;
    isAbandoned: boolean;
    progressStatus: ProgressStatus;
    consecutiveLegs: IConsecutiveLegsForMultiLegGame[];
    totalInvestment: number;
}