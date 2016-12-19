import { Injectable } from '@angular/core';
import { GenericDataService } from '../../../../Common/GenericDataService';
import * as Service from './IProgramService';
import BetTypeCode from '../../../../Common/Enums/BetTypeCode';
import Program from '../../../Models/Program';

import { Observable } from 'rxjs/Rx';
import * as Program1 from './Models/IProgram';
import * as ProgramAddition from './Models/IProgramAddition';

@Injectable()
export default class ProgramService implements Service.IProgramService {
    private genericDataService: GenericDataService;

    /* @ngInject */
    constructor(genericDataService: GenericDataService) {
        this.genericDataService = genericDataService;
    }

    public getProgram(raceDayKey: string, product: BetTypeCode): Promise<Program> {
        return Observable.forkJoin(
            this.getProgramForGame(raceDayKey, product),
            this.getProgramAdditionForGame(raceDayKey, product),
        ).toPromise()
            .then((response: any) => {
                return new Program(<Program1.IProgram>response[0], <ProgramAddition.IProgramAddition>response[1]);
            });
    }

    public getProgramForGame(raceDayKey: string, product: BetTypeCode): Promise<Program1.IProgram> {
        return this.genericDataService.get<Program1.IProgram>(`/api/game/program/${raceDayKey}/${product}`);
    }

    public getProgramAdditionForGame(raceDayKey: string, product: BetTypeCode): Promise<ProgramAddition.IProgramAddition> {
        return this.genericDataService.get<ProgramAddition.IProgramAddition>(`/api/game/program/${raceDayKey}/${product}/addition`);
    }

    getScratchedStartsForGame(raceDayKey: string, product: BetTypeCode): Promise<IScratchedStart[]> {
        return this.genericDataService.get<IScratchedStart[]>(`/api/game/program/${raceDayKey}/${product}/scratchedstarts`);
    }
}