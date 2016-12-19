import ProgressStatus from '../../Common/Enums/ProgressStatus';
import SportType from '../../Common/Enums/SportType';

export interface IActiveRaceDay {
    raceDayKey: string,
    raceDayName: string;
    startTime: Date;
    progressStatus: ProgressStatus;
    trackCode: string;
    sportType: SportType;
    selected?: boolean;
}