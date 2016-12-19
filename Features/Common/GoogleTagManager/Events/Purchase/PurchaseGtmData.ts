import {ActionFieldGtmData} from './ActionFieldGtmData';
import {ProductsGtmData} from './ProductsGtmData';

export class PurchaseGtmData {
    actionField: ActionFieldGtmData;
    products: ProductsGtmData[];

    constructor() {
        this.actionField = new ActionFieldGtmData();
        this.products = [];
    }
}