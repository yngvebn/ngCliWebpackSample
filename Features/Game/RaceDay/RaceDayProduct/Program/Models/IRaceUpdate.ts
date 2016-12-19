import * as DriverChange from './IDriverChange';

export interface IRaceUpdate {
    raceNumber: number;
    scratchedStarts: number[];
    driverChanges: DriverChange.IDriverChange[];
}