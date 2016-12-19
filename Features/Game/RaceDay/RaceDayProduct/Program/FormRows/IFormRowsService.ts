import { IRace } from '../../../../../Common/Hubs/RaceInfoContracts/interfaces';

export interface IFormRowsService {
    getTrotFormRowsForRace(race: IRace): Promise<ITrotFormRowsForRace>;
}