import ProgressStatus from '../../Common/Enums/ProgressStatus';
import SportType from '../../Common/Enums/SportType';
import { IProductForRaceDay } from './IProductForRaceDay';

export interface IActivePoolsForRaceDay {
    raceDay: string,
    raceDayName: string;
    startTime: Date;
    progressStatus: ProgressStatus;
    trackCode: string;
    sportType: SportType;
    selected?: boolean;
    products: IProductForRaceDay[];
}