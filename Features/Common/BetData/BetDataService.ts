import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as Enums from '../Enums';
import * as _ from 'lodash';
import RowCalculatorFactory from '../RowCalculator/RowCalculatorFactory';
import { IRowCalculator } from '../RowCalculator/Calculators';
import BetDataHelper from './BetDataHelper';
import BetDataDefinition from './BetDataDefinition';
import BitMapper from './BitMapper';
import BetMethod from '../Enums/BetMethod';
import BetTypeCode from '../Enums/BetTypeCode';
import FractionValue from '../Enums/FractionValue';


export interface IBetData {
    marks?: { [leg: number]: number[] },
    product?: Enums.BetTypeCode,
    raceDate?: Date,
    track?: string,
    rowPrice?: number,
    betMethod?: any,
    maxPrice?: number,
    ownGames?: any,
    ean?: string,
    isAllIn?: boolean,
    raceNumber?: number,
    rowPriceStep?: any,
    fraction?: any,
    organization?: string,
    numberOfDays?: number,
}

@Injectable()
export class BetDataService {
    private rowCalculatorFactory: RowCalculatorFactory;

    constructor(rowCalculatorFactory: RowCalculatorFactory) {
        this.rowCalculatorFactory = rowCalculatorFactory;
    }

    data: IBetData;
    $dirty: boolean;

    public init(data: IBetData): BetDataService {
        this.data = data;

        this.data.marks = data.marks || {};
        this.data.product = data.product;
        this.data.raceDate = data.raceDate;
        this.data.track = data.track;
        this.data.rowPrice = data.rowPrice;
        this.data.betMethod = data.betMethod;
        this.data.maxPrice = data.maxPrice;
        this.data.ownGames = data.ownGames;
        this.data.ean = data.ean;
        this.data.isAllIn = data.isAllIn;
        this.data.raceNumber = data.raceNumber;
        this.data.rowPriceStep = data.rowPriceStep;

        if (this.data.product !== Enums.BetTypeCode.QPlus) {
            this.data.fraction = Enums.FractionValue.full;
        }
        else {
            this.data.fraction = typeof data.fraction === "string" || typeof data.fraction === "number" ? Enums.FractionValue[data.fraction] : data.fraction;
        }
        this.data.organization = data.organization;
        this.data.numberOfDays = data.numberOfDays;
        return this;
    }

    public parse(betDataString: string): BetDataService {
        return this.init(BetDataService.parse(betDataString));
    }

    private static parse(betDataString: string): IBetData {
        var betDataParts = betDataString.split('|');

        var bd = _.reduce(betDataParts, (memo, val: string) => {
            var keyValue = val.split(':');
            memo[keyValue[0]] = keyValue[1];
            return memo;
        }, {});
        let definition: IBetData = {};

        definition.marks = this.getMarks(bd);
        definition.product = Enums.BetTypeCode[bd[BetDataDefinition.KeyBetType]];
        definition.raceDate = bd[BetDataDefinition.KeyDate];
        definition.track = bd[BetDataDefinition.KeyTrack];
        definition.rowPrice = parseInt(bd[BetDataDefinition.KeyRowPrice], 10);
        definition.betMethod = BetMethod.Name(parseInt(bd[BetDataDefinition.KeySellType], 10));
        definition.maxPrice = parseInt(bd[BetDataDefinition.KeyMaxPrice], 10);
        definition.raceNumber = parseInt(bd[BetDataDefinition.KeyRaceNumber], 10);
        definition.ownGames = this.getOwnGames(bd[BetDataDefinition.KeyOwnGame]);
        definition.isAllIn = bd[BetDataDefinition.KeyFirstPriceOnlyBet] === '1';
        definition.fraction = Enums.FractionValue[parseInt(bd[BetDataDefinition.KeyFraction] || 100, 10)];
        definition.organization = bd[BetDataDefinition.KeyOrganization] || 'NR';
        definition.numberOfDays = parseInt(bd[BetDataDefinition.KeyNumberOfDays], 10);

        return definition;
    }

    private static getOwnGames(ownMarksBitMap) {
        return BitMapper.fromBitmap(ownMarksBitMap);
    };

    private static getMarks(bd): { [leg: number]: number[] } {
        let marks: { [leg: number]: number[] } = {};

        for (var legNumber = 1; legNumber <= 7; legNumber++) {
            var marksBitmapForLeg = bd['s' + legNumber];
            if (marksBitmapForLeg) {
                marks[legNumber] = BitMapper.fromBitmap(marksBitmapForLeg);
            }
        }

        return marks;
    };

    clean() {
        this.$dirty = false;
    }
    /**
    * @ngdoc method
    * @name allLegsHaveMarks
    * @methodOf rikstoto.clients.js.models.BetData:BetData
    *
    * @description
    * Indicates that at least one mark has been set for all legs for the current betType
    *
    * @returns {boolean} true/false
    */
    allLegsHaveMarks() {
        if (!this.data.product) return true;
        return Enums.BetTypeCode.getNumberOfSelectionfields(this.data.product) === _.toArray(this.data.marks).length;
    }
    /**
    * @ngdoc method
    * @name getNumberOfRows
    * @methodOf rikstoto.clients.js.models.BetData:BetData
    *
    * @description
    * Calculates the number of combinations for the given marks, betType and betMethod
    *
    * @returns {number} Number of rows/combinations
    */
    getNumberOfRows() {
        return this.rowCalculatorFactory.get(this.data.product).calculate(this.data.marks, this.data.betMethod);
    }

    /**
    * @ngdoc method
    * @name getEstimatedTotalPrice
    * @methodOf rikstoto.clients.js.models.BetData:BetData
    *
    * @description
    * MISSING DESCRIPTION
    *
    * @returns {object} Unknown returntype
    */
    getEstimatedTotalPrice() {
        var base = ((this.getNumberOfRows()) * (this.data.rowPrice || 100));
        if (this.data.fraction) {
            base = base * Enums.FractionValue.Code(this.data.fraction) / 100;
        }
        return base;
    }
    /**
    * @ngdoc method
    * @name serializeToBetDataString
    * @methodOf rikstoto.clients.js.models.BetData:BetData
    *
    * @description
    * MISSING DESCRIPTION
    *
    * @returns {object} Unknown returntype
    */
    serializeToBetDataString() {

        var bdObject = this.data;

        var betDataStringArray = [];

        betDataStringArray.push(BetDataHelper.getDateSection(bdObject.raceDate));
        betDataStringArray.push(BetDataHelper.getTrackSection(bdObject.track));
        betDataStringArray.push(BetDataHelper.getBetTypeSection(bdObject.product));
        if (bdObject.ownGames) {
            betDataStringArray.push(BetDataHelper.getOwnGameSection(bdObject.ownGames));
        }
        if (bdObject.organization) {
            betDataStringArray.push(BetDataHelper.getOrganizationSection(bdObject.organization));
        }
        if (bdObject.maxPrice) betDataStringArray.push(BetDataHelper.getMaxPriceSection(bdObject.maxPrice));
        if (bdObject.isAllIn) betDataStringArray.push(BetDataHelper.getFirstPriceOnlyBetSection(bdObject.isAllIn));
        if (bdObject.fraction) betDataStringArray.push(BetDataHelper.getFractionSection(bdObject.fraction));

        if (bdObject.rowPrice) betDataStringArray.push(BetDataHelper.getRowPriceSection(bdObject.rowPrice));


        if (bdObject.betMethod !== undefined) {
            betDataStringArray.push(BetDataHelper.getSellTypeSection(bdObject.betMethod));
        }

        if (bdObject.marks) {
            for (var leg in bdObject.marks) {
                if (parseInt(leg) === 0) {
                    if (bdObject.betMethod === Enums.BetMethod.lynBanker && bdObject.product === Enums.BetTypeCode.QPlus) {
                        betDataStringArray.push(BetDataHelper.getLegMarksSection((6), bdObject.marks[0]));
                    } else {
                        continue;
                    }
                } else {
                    betDataStringArray.push(BetDataHelper.getLegMarksSection((parseInt(leg)), bdObject.marks[leg]));
                }

            }
        }
        if (bdObject.ean) betDataStringArray.push(BetDataHelper.getEanSection(bdObject.ean));
        if (bdObject.raceNumber) betDataStringArray.push(BetDataHelper.getRaceNumberSection(bdObject.raceNumber));
        if (bdObject.numberOfDays) betDataStringArray.push(BetDataHelper.getNumberOfDaysSection(bdObject.numberOfDays));

        return betDataStringArray.join('|');
    }

    setRaceDayKey(raceDayKey: string): BetDataService {
        var pattern = /(.{2}?)_(.{2}?)_(\d{4}-\d{2}-\d{2})/;
        var groups = pattern.exec(raceDayKey);
        if (groups.length < 4) throw new Error("Invalid RaceDayKey");
        this.data.track = groups[1];
        this.data.organization = groups[2];
        this.data.raceDate = new Date(groups[3]);
        return this;
    }

    setProduct(betTypeCode: BetTypeCode) : BetDataService {
        this.data.product = BetTypeCode.Code(betTypeCode);
        return this;
    }

    setBetMethod(betMethod: BetMethod): BetDataService {
        this.data.betMethod = BetMethod.Code(betMethod);
        return this;
    }

    setFraction(fraction: FractionValue): BetDataService {
        this.data.fraction = FractionValue.Code(fraction);
        return this;

    }
}
