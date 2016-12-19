import * as MultiLegProductForTimeline from './IMultiLegProductForTimeline';
import * as SingleLegProductForTimeline from './ISingleLegProductForTimeline';
import * as ActiveRace from './IActiveRace';

export interface IProductsForRaceDay {
    raceDayKey: string;
    races: ActiveRace.IActiveRace[];
    products: Array<MultiLegProductForTimeline.IMultiLegProductForRaceDay | SingleLegProductForTimeline.ISingleLegProductForRaceDay>;
}