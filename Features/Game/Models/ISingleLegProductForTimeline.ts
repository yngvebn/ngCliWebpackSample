import ProgressStatus from '../../Common/Enums/ProgressStatus';
import { IProductForTimeline } from './IProductForTimeline';

export interface ISingleLegProductForRaceDay extends IProductForTimeline {
    races: IRaceForSingleLegGame[];
    progressStatus: ProgressStatus;
}