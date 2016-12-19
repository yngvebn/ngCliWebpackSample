import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IHttpResult, IGenericResponse } from './IHttpResult';
import { IRestResult } from './IRestResult';

@Injectable()
export class GenericDataService {

    constructor(public http: Http) { }

    public get<T>(url): Promise<T> {
        return this.http.get(url)
            .map(response => this.mapTo<T>(response))
            .toPromise()
            .then(getComplete)
            .catch(getFailed);

        function getComplete(response) {
            if (!response || !response.data.success) {
                return Promise.reject<T>(null);
            } else {
                return Promise.resolve<T>(response.data.result as T);
            }
        }

        function getFailed(error: any) {
            return Promise.reject(error);
        }
    }

    public post(url, data?): Promise<Response> {
        return this.http.post(url, data)
            .map(response => this.mapTo<any>(response))
            .toPromise()
            .then(saveComplete)
            .catch(saveFailed);

        function saveComplete(response: IHttpResult) {
            if (!response || !response.data.success) {
                return Promise.reject(response.data.errorCode);
            } else {
                return Promise.resolve(response.data.result);
            }
        }

        function saveFailed(error: Response | any) {
            if (error.status === 401) {
                return Promise.reject(error.headers.get('www-authenticate'));
            } else {
                return Promise.reject(null);
            }
        }
    }

    public put(url, data): Promise<Response> {
        return this.http.put(url, data)
            .map(response => this.mapTo<any>(response))
            .toPromise()
            .then(updateComplete)
            .catch(updateFailed);

        function updateComplete(response: IHttpResult) {
            if (!response || !response.data.success) {
                return Promise.reject(response.data.errorCode);
            } else {
                return Promise.resolve(response.data.result);
            }
        }

        function updateFailed(error) {
            return Promise.reject(error);
        }
    }

    mapTo<T0>(response: Response): IGenericResponse<T0> {
        let body = <T0>response.json();
        let genericResponse = <IGenericResponse<T0>>response;
        genericResponse.data = body;
        return genericResponse;
    }
}