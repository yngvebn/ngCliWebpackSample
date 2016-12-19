import { IRaceStatusChanged, IRace, IGame, IPostponedRace, IStart, IDriverChanged, IUpdatedTotalInvestmentForPool } from './RaceInfoContracts/interfaces';


export interface IRaceInfoHub {
    onRaceHasClosedForSell(callback: (event: any, race: IRaceStatusChanged) => any);
    onRaceHasReopenedForSell(callback: (event: any, race: IRaceStatusChanged) => any);
    onRaceHasBeenAbandoned(callback: (event: any, race: IRace) => any);
    onRaceHasFinished(callback: (event: any, race: IRace) => any);
    onRaceDayHasBeenAbandoned(callback: (event: any, raceDay: string) => any);
    onRaceHasBeenPostponed(callback: (event: any, postponedRace: IPostponedRace) => any);
    onRaceDayHasFinished(callback: (event: any, raceDay: string) => any);
    onMultiLegGameHasBeenAbandoned(callback: (event: any, postponedRace: IGame) => any);
    onMultiLegGameHasFinished(callback: (event: any, game: IGame) => any);
    onTotalInvestmentForPoolHasBeenUpdated(callback: (event: any, updatedTotalInvestmentForPool: IUpdatedTotalInvestmentForPool) => any);
    onStartHasBeenScratched(callback :(event: any, start: IStart) => any);
    onScratchedStartHasBeenReinstated(callback :(event: any, start: IStart) => any);
    onDriverHasBeenChanged(callback :(event: any, driverChange: IDriverChanged) => any);
}