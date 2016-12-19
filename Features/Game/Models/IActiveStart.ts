interface IActiveStart {
    startNumber: number;
    horseName: string;
    driver: string;
    extraDistance: number;
    mother: string;
    father: string;
    grandfather: string;
    trainer: string;
    owner: string;
    breeder: string;
    totalEarnings: number;
    age: number;
    sex: string;
    color: string;
    postPosition: number;
    recordVolt: string;
    recordAuto: string;
    winPercentage?: number;
    triplePercentage?: number;
    horseAnnualStatistics: IHorseAnnualStatistics;
}
