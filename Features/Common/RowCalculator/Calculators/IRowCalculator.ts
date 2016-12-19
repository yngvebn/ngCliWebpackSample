export interface IRowCalculator {
    calculate(marks: { [leg: number]: number[] }, betMethod?: string): number;
}