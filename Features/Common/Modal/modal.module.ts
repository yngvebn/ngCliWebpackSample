import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ModalService} from "./ModalService";
import {ModalComponent} from "./ModalComponent";

@NgModule({
    entryComponents: [ModalComponent],
    declarations: [ModalComponent],
    exports: [ModalComponent],
    imports: [BrowserModule],
    providers: [ModalService]
})
export class ModalModule {}