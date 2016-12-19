export class ProductsGtmData {
    id: string; // NAME_VARIANT_CATEGORY
    price: string; // Price ex. tax (fee)
    name: string; // Actual product name (e.g. V5, V6, V4, DD)
    variant: string; // Actual BetTypeCode (e.g. V5A, V64, V65 etc)
    category: string; // BetMethod (see spec. egen = vanlig)
    brand: string; // Track name
    quantity: number; // Number of tickets
    dimension10: string; // Sporttype (Trav, Galopp, Monte)
    dimension11: string; // BetMethod
    dimension12: string; // RaceDate
    dimension13: string; // CountryCode
    dimension14: string; // RaceTime
    dimension15: string; // Starttime for first race in product
    metric1: string; // Number of combinations/rows
    metric2: string; // Price Per combination/row
    metric3: string; //Number of shares
}