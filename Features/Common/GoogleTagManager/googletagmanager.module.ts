import {NgModule} from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import GoogleTagManagerService from './GoogleTagManagerService';
import {GoogleTagManagerStateService} from './GoogleTagManagerStateService';

@NgModule({
    imports: [
        HttpModule,
        JsonpModule
    ],
    exports: [],
    declarations: [],
    providers: [
        GoogleTagManagerService,
        GoogleTagManagerStateService
    ]
})
export class GoogleTagManagerModule {
}