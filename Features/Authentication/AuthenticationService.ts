import { Injectable } from '@angular/core';
import { GenericDataService } from '../Common/GenericDataService/GenericDataService';
import * as LoggedInUser from './Models/ILoggedInUser';

@Injectable()
export class AuthenticationService {
    private genericDataService : GenericDataService;
    
    constructor(genericDataService : GenericDataService) {
        this.genericDataService = genericDataService;
    }

    login(credentials: ICredentials): Promise<any> {
        return this.genericDataService.post('/api/authentication/login', credentials);
    }

    logOut(): Promise<any> {
        return this.genericDataService.post('/api/authentication/logout');
    }    

    isLoggedIn(): Promise<boolean> {
        return this.genericDataService.get<boolean>('/api/authentication/isLoggedIn');
    }

    getLoggedInUser(): Promise<LoggedInUser.ILoggedInUser> {
        return this.genericDataService.get<LoggedInUser.ILoggedInUser>('/api/authentication/loggedInUser');
    }
}