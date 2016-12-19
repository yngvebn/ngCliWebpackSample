import * as moment from 'moment';
import ProgressStatus from '../../Common/Enums/ProgressStatus';
import * as Race from './IActiveRace';

export default class ActiveRace {
    public raceNumber: number;
    public startTime: Date;
    public progressStatus: ProgressStatus;
    public hasBeenMoved: boolean;
    public secondsToStart: number;
    public displayStartTime: string;

    constructor(activeRace: Race.IActiveRace) {
        this.raceNumber = activeRace.raceNumber;
        this.startTime = activeRace.startTime;
        this.progressStatus = activeRace.progressStatus;
        this.hasBeenMoved = activeRace.hasBeenMoved;
        this.updateDisplayStartTime();
    }

    public postpone(newStartTime: Date) {
        this.startTime = newStartTime;
        this.updateDisplayStartTime();
    }

    private updateDisplayStartTime() {
        this.displayStartTime = moment(this.startTime).format('HH:mm');
    }

    public updateTimeToStart(secondsToStart: number) {
        this.secondsToStart = secondsToStart;
    }
}
