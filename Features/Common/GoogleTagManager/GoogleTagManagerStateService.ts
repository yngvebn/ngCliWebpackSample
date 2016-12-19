import { Injectable, HostListener } from '@angular/core';
import { Router, ActivatedRouteSnapshot/*, NavigationEnd, NavigationStart */} from '@angular/router';
import GoogleTagManagerService from './GoogleTagManagerService';
import * as Broadcaster from '../BroadcasterService/BroadcasterService';
import {ILoggedInUser as LoggedInUser} from '../../Authentication/Models/ILoggedInUser';
import PageVirtualLoggedInUserEvent from './Events/PageVirtual/PageVirtualLoggedInUserEvent';
import PageVirtualEvent from './Events/PageVirtual/PageVirtualEvent';
import { ServiceHostListener } from '../ServiceHostListener/ServiceHostListener';
import {AuthenticationService} from '../../Authentication/AuthenticationService';

@Injectable()
export class GoogleTagManagerStateService {
    private googleTagManagerService: GoogleTagManagerService;
    private broadcasterService: Broadcaster.BroadcasterService;
    private $location: any; // angular.ILocationService;
    private currentUser: LoggedInUser;
    private $transitions: any;
    private router: Router;

    constructor(broadcasterService: Broadcaster.BroadcasterService, router: Router, /*$transitions: any, $location: angular.ILocationService, */googleTagManagerService: GoogleTagManagerService, authenticationService: AuthenticationService) {
        this.googleTagManagerService = googleTagManagerService;
        this.broadcasterService = broadcasterService;
        this.router = router;
        //this.$location = $location;
        //this.$transitions = $transitions;


        // Temnporary solution until we figure out a better way
        window.addEventListener(Broadcaster.events.userHasLoggedOut.replace('window:', ''), (event) => {
            this.userHasLoggedOut();
        });

        window.addEventListener(Broadcaster.events.userHasLoggedIn.replace('window:', ''), (event: CustomEvent) => {
            this.userHasLoggedIn(event.detail);
        });


        authenticationService.isLoggedIn()
            .then((isLoggedIn) => {
                if (!isLoggedIn)
                    return;

                authenticationService.getLoggedInUser()
                    .then((user: LoggedInUser) => {
                        this.currentUser = user;
                    });
            });

    }

    public start() {
        this.setupTransitionChangeHandler();
    }

    public userHasLoggedIn($event: LoggedInUser) {
        this.currentUser = $event;
    }

    public userHasLoggedOut() {
        this.currentUser = null;
    }

    setupTransitionChangeHandler() {
        // this.router.events.filter(ev => ev instanceof NavigationEnd)
        //     .subscribe((val: NavigationEnd) => {
        //         if (this.currentUser)
        //             this.googleTagManagerService.pushEvent(new PageVirtualLoggedInUserEvent(val.url, this.currentUser));
        //         else
        //             this.googleTagManagerService.pushEvent(new PageVirtualEvent(val.url));
        //     });

        //this.$transitions.onSuccess({}, () => {
        //    let path = this.$location.path();

        //    if (this.currentUser)
        //        this.googleTagManagerService.pushEvent(new PageVirtualLoggedInUserEvent(path, this.currentUser));
        //    else
        //        this.googleTagManagerService.pushEvent(new PageVirtualEvent(path));
        //});
    }
}