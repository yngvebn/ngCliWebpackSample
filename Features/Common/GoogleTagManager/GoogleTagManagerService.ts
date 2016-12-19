import { Injectable } from '@angular/core';
import * as LayerEvent from './Events/DataLayerEvent';

@Injectable()
export default class GoogleTagManagerService {
    $window: any;
    private get dataLayer(): any[] {
        return this.$window.dataLayer;
    }

    constructor() {
        this.$window = window;
    }

    public pushEvent(event: LayerEvent.DataLayerEvent) {
        if (this.dataLayer)
            this.dataLayer.push(event.toObject());
    }
}