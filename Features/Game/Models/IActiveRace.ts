import ProgressStatus from '../../Common/Enums/ProgressStatus';

export interface IActiveRace {
    raceNumber: number;
    startTime: Date;
    progressStatus: ProgressStatus;
    hasBeenMoved: boolean;
}