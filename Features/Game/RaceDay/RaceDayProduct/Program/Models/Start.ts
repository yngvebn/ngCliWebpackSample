import * as DriverChange from './IDriverChange';

export default class Start {
    public startNumber: number;
    public horseName: string;
    public driver: string;
    public extraDistance: number;
    public mother: string;
    public father: string;
    public grandfather: string;
    public trainer: string;
    public owner: string;
    public breeder: string;
    public totalEarnings: number;
    public age: number;
    public sex: string;
    public color: string;
    public postPosition: number;
    public recordVolt: string;
    public recordAuto: string;
    public winPercentage: number;
    public triplePercentage: number;
    public odds: any;
    public driverChanged: boolean;
    public newDriver: string;
    public investmentPercentage: number;
    public winOdds: number;
    public placeMinOdds: number;
    public placeMaxOdds: number;
    public scratched: boolean;
    public formRows: ITrotFormRow[];
    public showFormRows: boolean = false;
    public horseAnnualStatistics: IHorseAnnualStatistics = { total: null, currentYear: null, previousYear: null };

    constructor(start: IActiveStart, isScratched: boolean, startBetStatistics: IStartBetStatistics, driverChange: DriverChange.IDriverChange) {
        this.startNumber = start.startNumber;
        this.horseName = start.horseName;
        this.driver = start.driver;
        this.extraDistance = start.extraDistance;
        this.mother = start.mother;
        this.father = start.father;
        this.grandfather = start.grandfather;
        this.trainer = start.trainer;
        this.owner = start.owner;
        this.breeder = start.breeder;
        this.totalEarnings = start.totalEarnings;
        this.age = start.age;
        this.sex = start.sex;
        this.color = start.color;
        this.postPosition = start.postPosition;
        this.recordVolt = start.recordVolt;
        this.recordAuto = start.recordAuto;
        this.winPercentage = start.winPercentage;
        this.triplePercentage = start.triplePercentage;

        if (start.horseAnnualStatistics) {
            this.horseAnnualStatistics = {
                total: start.horseAnnualStatistics.total,
                currentYear: start.horseAnnualStatistics.currentYear,
                previousYear: start.horseAnnualStatistics.previousYear
            }
        }

        this.scratched = isScratched;

        if (driverChange != null) {
            this.driverChanged = true;
            this.newDriver = driverChange.newDriver;
        } else {
            this.driverChanged = false;
        }

        if (startBetStatistics != null) {
            this.winOdds = startBetStatistics.winOdds;
            this.placeMinOdds = startBetStatistics.placeMinOdds;
            this.placeMaxOdds = startBetStatistics.placeMaxOdds;
            this.investmentPercentage = startBetStatistics.investmentPercentage;
        }
    }

    public scratch() {
        this.scratched = true;
    }

    public reinstate() {
        this.scratched = false;
    }

    public changeDriver(newDriver: string) {
        this.newDriver = newDriver;
        this.driverChanged = true;
    }

    public addFormRows(formRows: ITrotFormRow[]) {
        this.formRows = formRows;
    }

    public toggleFormRows() {
        this.showFormRows = !this.showFormRows;
    }
}