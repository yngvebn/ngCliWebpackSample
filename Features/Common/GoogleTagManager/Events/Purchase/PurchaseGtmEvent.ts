import * as LayerEvent from '../DataLayerEvent';
import * as PurchaseReceipt from '../../../../Game/RaceDay/RaceDayProduct/Purchase/PurchaseService/Models/IPurchaseReceipt';
import * as ActiveRaceDay from '../../../../Game/Models/IActiveRaceDay';
import ActiveRace from '../../../../Game/Models/ActiveRace';
import DataLayerEventType from '../DataLayerEventType';
import * as moment from 'moment';
import EcommerseGtmData from './EcommerseGtmData';
import * as DataService from '../../../BetData/BetDataService';
import {PaymentMethod} from '../../Model/PaymentMethod';

export default class PurchaseGtmEvent extends LayerEvent.DataLayerEvent {
    public purchaseDate: string; // date of purchase (YYYY.MM.DD)
    public purchaseTime: string; // time of purchase (HH:mm:ss)
    public commission: string; // agentKey
    public commissionType: string; // agentType (e.g. eKom)
    public moduleTip: string; // ekommisjonær module - we don't have any modules for beta site yet
    public ecommerce: EcommerseGtmData;
    public paymentMethod: PaymentMethod; 
    

    constructor(purchaseReceipt: PurchaseReceipt.IPurchaseReceipt, raceDay: ActiveRaceDay.IActiveRaceDay, race: ActiveRace, betData: DataService.IBetData, pageVirtual?: string) {
        super(DataLayerEventType.purchase);

        this.purchaseDate = moment(purchaseReceipt.purchaseTime).format("YYYY.MM.DD");
        this.purchaseTime = moment(purchaseReceipt.purchaseTime).format("HH:mm:ss");
        this.paymentMethod = PaymentMethod.Spillkonto;
        this.pageVirtual = pageVirtual;
        this.commission = "00801";
        this.commissionType = "eKom";
        this.ecommerce = new EcommerseGtmData(purchaseReceipt, raceDay, race, betData);
    }
}
