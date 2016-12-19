import * as ActivePoolsForRaceDay from './IActivePoolsForRaceDay';

export interface IActivePoolsForRaceDayGroupedByDate {
    date: Date;
    dateHeader:string;
    poolsForRaceDay: ActivePoolsForRaceDay.IActivePoolsForRaceDay[];
}