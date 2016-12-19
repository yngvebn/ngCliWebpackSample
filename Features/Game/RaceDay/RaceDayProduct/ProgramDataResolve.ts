import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import BettingInfoService from '../../../BettingInfo/BettingInfoService';
import Program from '../../Models/Program';
import ProgramService from './Program/ProgramService';

@Injectable()
export default class ProgramDataResolve implements Resolve<Program> {
    constructor(private programService: ProgramService) { }
    resolve(route: ActivatedRouteSnapshot, state: Object): Promise<Program> {
        return this.programService.getProgram(route.params['raceDayKey'], route.params['product']);
    }
}