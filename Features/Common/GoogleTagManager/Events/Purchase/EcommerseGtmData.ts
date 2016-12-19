import * as PurchaseReceipt from '../../../../Game/RaceDay/RaceDayProduct/Purchase/PurchaseService/Models/IPurchaseReceipt';
import * as ActiveRaceDay from '../../../../Game/Models/IActiveRaceDay';
import ActiveRace from '../../../../Game/Models/ActiveRace';
import SportType from '../../../Enums/SportType';
import BetTypeCode from '../../../Enums/BetTypeCode';
import * as moment from 'moment';
import * as DataService from '../../..//BetData/BetDataService';
import BetMethod from '../../..//Enums/BetMethod';
import {PurchaseGtmData} from './PurchaseGtmData';
import {ActionFieldGtmData} from './ActionFieldGtmData';
import {ProductsGtmData} from './ProductsGtmData';

export default class EcommerseGtmData {
    purchase: PurchaseGtmData;

    constructor(purchaseReceipt: PurchaseReceipt.IPurchaseReceipt, raceDay: ActiveRaceDay.IActiveRaceDay, race: ActiveRace, betData: DataService.IBetData) {
        this.purchase = new PurchaseGtmData();

        this.purchase.actionField = {
            id: purchaseReceipt.ticketSerialNumber,
            revenue: this.getFormattedAmount(purchaseReceipt.betCost + purchaseReceipt.sellFee),
            tax: this.getFormattedAmount(purchaseReceipt.sellFee)
        } as ActionFieldGtmData;

        let name = this.getProductName(betData.product.toString());
        let variant = this.getProductVariant(betData.product.toString());
        let category = this.getProductCategory(betData.betMethod.toString());

        this.purchase.products.push({
            id: this.getId(name, variant, category),
            price: this.getFormattedAmount(purchaseReceipt.betCost),
            name: name,
            variant: variant,
            category: category,
            brand: raceDay.raceDayName,
            quantity: 1,
            dimension10: SportType[raceDay.sportType.toString()],
            dimension11: 'Vanlig',
            dimension12: null,
            dimension13: moment(race.startTime).format('YYYY.MM.DD'),
            dimension14: '',
            dimension15: moment(race.startTime).format('HH:mm:ss'),
            //metric1: betData.getNumberOfRows().toString(),
            metric2: this.getFormattedAmount(betData.rowPrice),
            metric3: '0'

        } as ProductsGtmData);
    }

    private getFormattedAmount(amount: number) {
        return (amount / 100).toFixed(2);
    }

    private getId(name: string, variant: string, category: string) {
        return `${name}_${variant}_${category.replace("/", "_")}`;
    }

    private getProductName(product: string) {
        let normalizedName = BetTypeCode.Normalized[product];

        if (!normalizedName)
            return product;

        return normalizedName;
    }

    private getProductVariant(product: string, isFirstPrizeBetOnly: boolean = false) {
        switch (product) {
            case BetTypeCode.V5A:
            case BetTypeCode.V5B:
                return product;
            case BetTypeCode.V64:
            case BetTypeCode.V65:
            case BetTypeCode.V75:
            case BetTypeCode.V76:
                return isFirstPrizeBetOnly ? product.substr(0, 2) : product;
            default:
                return this.getProductName(product);
        }
    }

    private getProductCategory(bm: string, isFraction: boolean = false) {
        let capitalizedBm = this.capitalize(bm);
        switch (capitalizedBm) {
            case BetMethod.vanlig:
                return isFraction ? "Fraction" : "Egen";
            case BetMethod.lynBanker:
            case BetMethod.lynToto:
            case BetMethod.lynSystem:
            case BetMethod.lynBundle:
            case BetMethod.lynShare:
                return `Lyn/${capitalizedBm}`;
            default:
                return capitalizedBm;
        }
    }

    private capitalize(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}