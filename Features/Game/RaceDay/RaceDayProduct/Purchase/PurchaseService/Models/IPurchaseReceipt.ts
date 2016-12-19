export interface IPurchaseReceipt {
    ticketSerialNumber: string;
    raceDay:string;
    product: string;
    sellFee: number;
    betCost: number;
    purchaseTime: Date;
}