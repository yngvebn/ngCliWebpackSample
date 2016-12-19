import {ViewChild, Component, Injector, ViewContainerRef} from '@angular/core';
import {ModalService} from "./ModalService";
import {Modal} from "./ModalContainer";

@Component({
    selector: 'modal',
    template: `<div class="ngdialog ngdialog-theme-default {{closeClass}}">
    <div class="ngdialog-overlay"></div>
    <div class="ngdialog-content">
    <div #modalcontent></div>
    <div class="ngdialog-close" (click)="closeModal()"></div>
    </div>
    </div>`
})
@Modal()
export class ModalComponent {
    @ViewChild('modalcontent', { read: ViewContainerRef }) viewContainerRef;
}