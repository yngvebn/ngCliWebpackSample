import BetTypeCode from '../../Common/Enums/BetTypeCode';
import * as _ from 'lodash';
import Race from './Race';
import * as Program1 from '../RaceDay/RaceDayProduct/Program/Models/IProgram';
import * as ProgramAddition from '../RaceDay/RaceDayProduct/Program/Models/IProgramAddition';

export default class Program {
    raceDay: string;
    product: BetTypeCode;
    races: Race[];
    numberOfStartsPerRace: number;

    constructor(program: Program1.IProgram, programAddition: ProgramAddition.IProgramAddition) {
        if (program.raceDay !== programAddition.raceDay)
            throw new Error("static and dynamic program data is for different racedays");

        if (program.product !== programAddition.product)
            throw new Error("static and dynamic program data is for different products");

        this.raceDay = program.raceDay;
        this.product = program.product;
        this.races = <Race[]>[];
        this.numberOfStartsPerRace = program.numberOfStartsPerRace;
        let legNumber = 1;
        _.forEach(program.races, race => {
            let raceStatistics = _.find(programAddition.raceBetStatistics, stats => stats.raceNumber === race.raceNumber);
            let raceUpdate = _.find(programAddition.raceUpdates, update => update.raceNumber === race.raceNumber);
            this.races.push(new Race(race, raceStatistics, raceUpdate, legNumber++));
        });
    }

    public scratchStart(raceNumber: number, startNumber: number) {
        if (!this.hasRace(raceNumber)) return;

        this.getRace(raceNumber).scratchStart(startNumber);
    }

    public reinstateStart(raceNumber: number, startNumber: number) {
        if (!this.hasRace(raceNumber)) return;

        this.getRace(raceNumber).reinstateStart(startNumber);
    }

    public driverHasChanged(raceNumber: number, startNumber: number, newDriver: string) {
        if (!this.hasRace(raceNumber)) return;

        this.getRace(raceNumber).changeDriver(startNumber, newDriver);
    }

    public getRace(raceNumber: number): Race {
        return _.find(this.races, race => race.raceNumber === raceNumber);
    }

    public isScratched(raceNumber: number, startNumber: number): boolean {
        return this.getRace(raceNumber).isScratched(startNumber);
    }

    public setScratches(scratchedStarts: IScratchedStart[]) {
        _.forEach(this.races, race => race.clearScratches());

        _.forEach(scratchedStarts, scratchedStart => this.scratchStart(scratchedStart.raceNumber, scratchedStart.startNumber));
    }

    public hasRace(raceNumber: number) {
        return _.some(this.races, race => race.raceNumber === raceNumber);
    }
}