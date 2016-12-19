import { Component, Input, OnInit } from '@angular/core';
import { PrizeNotificationService } from './PrizeNotificationService';
import {NotificationPreference} from './Models/NotificationPreference';

@Component({
    templateUrl: 'PrizeNotification.tpl.html',
    selector: 'prize-notification'
})
export class PrizeNotificationComponent implements OnInit {

    prizeNotificationSettings: IPrizeNotificationSettings;
    notificationPreference: string;

    constructor(private prizeNotificationService: PrizeNotificationService) {
        
    }

    ngOnInit(): void {
        this.prizeNotificationService.getPrizeNotificationSettings()
            .then((result: IPrizeNotificationSettings) => {
                this.prizeNotificationSettings = result;
                this.notificationPreference = NotificationPreference.get(result.wantsEmail, result.wantsSms);
            });
    }
}