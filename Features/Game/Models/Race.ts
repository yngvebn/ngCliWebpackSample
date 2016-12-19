import StartMethod from '../../Common/Enums/StartMethod';
import Start from '../RaceDay/RaceDayProduct/Program/Models/Start';

import * as _ from 'lodash';
import * as RaceProgram from '../RaceDay/RaceDayProduct/Program/Models/IRaceProgram';
import * as RaceUpdate from '../RaceDay/RaceDayProduct/Program/Models/IRaceUpdate';

export default class Race {
    public raceNumber: number;
    public legNumber: number;
    public distance: number;
    public startMethod: StartMethod;
    public starts: Start[];
    public raceName: string;
    public propositions: string;
    public isMonte: boolean;
    public hasFormRows: boolean = false;

    constructor(race: RaceProgram.IRaceProgram, raceStatistics: IRaceBetStatistics, raceUpdate: RaceUpdate.IRaceUpdate, legNumber: number) {
        this.raceName = race.raceName;
        this.legNumber = legNumber;
        this.raceNumber = race.raceNumber;
        this.distance = race.distance;
        this.startMethod = race.startMethod;
        this.propositions = race.propositions;
        this.starts = <Start[]>[];
        this.isMonte = race.isMonte;

        _.forEach(race.starts, start => {
            let startStatistics = _.find(raceStatistics.oddsAndInvestment, stats => stats.startNumber === start.startNumber);
            let isScratched = _.some(raceUpdate.scratchedStarts, startNumber => startNumber === start.startNumber);
            let driverChange = _.find(raceUpdate.driverChanges, change => change.startNumber === start.startNumber);

            this.starts.push(new Start(start, isScratched, startStatistics, driverChange));
        });
    }

    public scratchStart(startNumber: number) {
        this.getStart(startNumber).scratch();
    }

    public reinstateStart(startNumber: number) {
        this.getStart(startNumber).reinstate();
    }

    public changeDriver(startNumber: number, newDriver: string) {
        this.getStart(startNumber).changeDriver(newDriver);
    }

    public getStart(startNumber: number): Start {
        return _.find(this.starts, start => start.startNumber === startNumber);
    }

    public clearScratches() {
        _.forEach(this.starts, start => start.reinstate());
    }

    public isScratched(startNumber: number): boolean {
        return _.some(this.starts, start => start.startNumber === startNumber && start.scratched);
    }

    public addFormRows(formRowsForStarts: ITrotFormRowsForStart[]) {
        _.forEach(this.starts, start => {
            let formRowsForStart = _.find(formRowsForStarts, (fr: ITrotFormRowsForStart) => { return fr.startNumber === start.startNumber; });

            if (formRowsForStart)
                start.addFormRows(formRowsForStart.formRows);
        });
        this.hasFormRows = true;
    }
}