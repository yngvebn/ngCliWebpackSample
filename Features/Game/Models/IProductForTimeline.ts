import BetTypeCode from '../../Common/Enums/BetTypeCode';

export interface IProductForTimeline {
    product: BetTypeCode;
    isMultiLegGame: boolean;
    isSingleLegGame: boolean;
    earliestStart: Date;
}