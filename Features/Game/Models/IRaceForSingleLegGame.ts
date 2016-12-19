interface IRaceForSingleLegGame {
    hasJackpot: boolean;
    hasBonus: boolean;
    isSuper: boolean;
    raceNumber: number;
    totalInvestment: { [product: string]: number };
}