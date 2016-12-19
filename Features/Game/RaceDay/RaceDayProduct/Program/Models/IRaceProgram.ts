import StartMethod from '../../../../../Common/Enums/StartMethod';

export interface IRaceProgram {
    raceNumber: number;
    distance: number;
    startMethod: StartMethod;
    starts: IActiveStart[];
    raceName: string;
    propositions: string;
    isMonte: boolean;
}