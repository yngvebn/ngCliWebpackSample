import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpModule } from '@angular/http';
import PurchaseComponent from './PurchaseComponent';
import { PurchaseDialogComponent } from './PurchaseDialog/PurchaseDialogComponent';
import { PurchaseConfirmationComponent } from './PurchaseDialog/PurchaseConfirmation/PurchaseConfirmationComponent';
import { PurchaseErrorComponent } from './PurchaseDialog/PurchaseError/PurchaseErrorComponent';
import { PurchaseReceiptComponent } from './PurchaseDialog/PurchaseReceipt/PurchaseReceiptComponent';
import PurchaseConfirmationService from './PurchaseDialog/PurchaseConfirmation/PurchaseConfirmationService';
import { PipesModule } from '../../../../Common/PipesModule';
import { PrizeNotificationComponent } from './PurchaseDialog/PrizeNotification/PrizeNotificationComponent';
import { PrizeNotificationService } from './PurchaseDialog/PrizeNotification/PrizeNotificationService';
import PurchaseService from './PurchaseService/PurchaseService';
import {GoogleTagManagerModule} from '../../../../Common/GoogleTagManager/googletagmanager.module';

@NgModule({
    entryComponents: [
        PurchaseDialogComponent,
        
    ],
    imports: [
        BrowserModule,
        HttpModule,
        PipesModule,
        GoogleTagManagerModule
    ],
    exports: [
        PurchaseComponent
    ],
    declarations: [
        PurchaseComponent,
        PurchaseDialogComponent,
        PurchaseConfirmationComponent,
        PurchaseErrorComponent,
        PurchaseReceiptComponent,
        PrizeNotificationComponent
    ],
    providers: [
        PurchaseConfirmationService,
        PrizeNotificationService,
        PurchaseService,
        RouterOutlet, RouterLink
    ]
})
export class PurchaseModule {
}