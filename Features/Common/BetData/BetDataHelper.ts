import * as moment from 'moment';
import BetDataDefinition from './BetDataDefinition';
import * as Enums from '../Enums';
import BitMapper from './BitMapper';
import BetTypeCode from "../Enums/BetTypeCode"

export default class BetDataHelper {
    public static getDateSection(date: any) {
        if (!moment.isMoment(date)) {
            date = moment(date);
        }
        var formattedDate = date.format(BetDataDefinition.DateTimeFormat);
        return `${BetDataDefinition.KeyDate}:${formattedDate}`;
    }

    public static getOrganizationSection(organization) {
        return `${BetDataDefinition.KeyOrganization}:${organization}`;
    }

    public static getTrackSection(trackCode) {
        return `${BetDataDefinition.KeyTrack}:${trackCode}`;
    }

    public static getBetTypeSection(betType) {
        if (typeof betType === "string") {
            betType = BetTypeCode.Code(betType);
        }
        return `${BetDataDefinition.KeyBetType}:${BetTypeCode.Name(betType)}`;
    }

    public static getRaceNumberSection(raceNumber) {
        return `${BetDataDefinition.KeyRaceNumber}:${raceNumber}`;
    }

    public static getLegMarksSection(legNumber, marks) {
        return `${BetDataDefinition.KeyLegNumber + legNumber}:${BitMapper.toBitmap(marks)}`;
    }

    public static getRowPriceSection(rowPrice) {
        return `${BetDataDefinition.KeyRowPrice}:${rowPrice}`;
    }

    public static getSellTypeSection(sellType) {
        if (Enums.BetMethod.Code(sellType) == undefined) throw new Error("Bad betMethod: '" + sellType + "', check casing?");
        if (typeof sellType === "string") {
            sellType = Enums.FractionValue.Code(sellType);
        }
        return `${BetDataDefinition.KeySellType}:${sellType}`;
    }

    public static getFirstPriceOnlyBetSection(isFirstPriceOnlyBet) {
        return `${BetDataDefinition.KeyFirstPriceOnlyBet}:${isFirstPriceOnlyBet ? '1' : '0'}`;
    }

    public static getFractionSection(fraction) {
        if (typeof fraction === "string") {
            fraction = Enums.FractionValue.Code(fraction);
        }
        return `${BetDataDefinition.KeyFraction}:${fraction}`;
    }

    public static  getMaxPriceSection(maxPrice) {
        return `${BetDataDefinition.KeyMaxPrice}:${maxPrice}`;
    }

    public static  getOwnGameSection(ownGame) {
        return `${BetDataDefinition.KeyOwnGame}:${BitMapper.toBitmap(ownGame)}`;
    }

    public static getEanSection(ean) {
        return `${BetDataDefinition.KeyEan}:${ean}`;
    }

    public static getNumberOfDaysSection(numberOfDays) {
        return `${BetDataDefinition.KeyNumberOfDays}:${numberOfDays}`;
    }

}
