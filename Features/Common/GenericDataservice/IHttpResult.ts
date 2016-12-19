import { IRestResult } from './IRestResult';
import { Response } from '@angular/http';

export interface IHttpResult {
    data: IRestResult;
}

export interface IGenericResponse<T> extends Response {
    data: T
}